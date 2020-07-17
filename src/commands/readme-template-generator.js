module.exports = {
  name: 'readme-template-generator',
  run: async toolbox => {
    const {
      question,
      message,
      generateFile,
      removeFiles
    } = toolbox
    require('dotenv/config')
    const { readFile, writeFile } = require('fs')
    const { asBlob: convertToDocx } = require('html-docx-js')

    const days = {}

    for (let countDays = 0; countDays <= 5; countDays++) {
      message({
        type: 'warning',
        content: `Dia: ${countDays + 1}`
      })

      const day = await question({
        type: 'input',
        message: 'Data:'
      })

      const discipline1 = await question({
        type: 'input',
        message: 'Disciplina 1:'
      })

      const discipline2 = await question({
        type: 'input',
        message: 'Disciplina 2:'
      })

      const content1 = await question({
        type: 'input',
        message: 'Conteúdo 1:'
      })

      const content2 = await question({
        type: 'input',
        message: 'Conteúdo 2:'
      })

      const activity1 = await question({
        type: 'input',
        message: 'Atividade 1:'
      })

      const activity2 = await question({
        type: 'input',
        message: 'Atividade 2:'
      })

      days[countDays] = {
        day,
        disciplines: [discipline1, discipline2],
        contents: [content1, content2],
        activities: [activity1, activity2]
      }
    }

    await generateFile({
      template: 'table.html.ejs',
      target: 'table-cache.html',
      props: { days }
    })

    readFile('table-cache.html', 'utf8', (_err, contents) => {
      const convertedAsDocx = convertToDocx(contents)

      writeFile(process.env.DIR_TARGET || 'tabela.docx', convertedAsDocx, (err) => (
        err ? console.log(err) : null
      ))
    })

    removeFiles(['table-cache.html'])

    message({
      type: 'success',
      content: 'A tabela foi gerada com sucesso na pasta Documentos'
    })

    await question({
      type: 'input',
      message: 'Pressione enter para sair...'
    })
  }
}
