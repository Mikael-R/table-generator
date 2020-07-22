module.exports = {
  name: 'readme-template-generator',
  run: async toolbox => {
    const {
      question,
      message,
      generateFile,
      removeFiles,
      replaceAll
    } = toolbox
    require('dotenv/config')
    const { readFile, writeFile } = require('fs')
    const { asBlob: convertToDocx } = require('html-docx-js')

    const days = require('../model/days')

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

      const content1 = await question({
        type: 'input',
        message: 'Conteúdo 1:'
      })

      const activity1 = await question({
        type: 'input',
        message: 'Atividade 1:'
      })

      const discipline2 = await question({
        type: 'input',
        message: 'Disciplina 2:'
      })

      const content2 = await question({
        type: 'input',
        message: 'Conteúdo 2:'
      })

      const activity2 = await question({
        type: 'input',
        message: 'Atividade 2:'
      })

      if (countDays === 3) {
        const discipline3 = await question({
          type: 'input',
          message: 'Disciplina 3:'
        })

        const content3 = await question({
          type: 'input',
          message: 'Conteúdo 3:'
        })

        const activity3 = await question({
          type: 'input',
          message: 'Atividade 3:'
        })

        days[countDays].disciplines.push(discipline3)
        days[countDays].contents.push(content3)
        days[countDays].activities.push(activity3)
      }

      days[countDays].day = day
      days[countDays].disciplines.push(discipline1, discipline2)
      days[countDays].contents.push(content1, content2)
      days[countDays].activities.push(activity1, activity2)
    }

    await generateFile({
      template: 'table.html.ejs',
      target: 'table-cache.html',
      props: { days }
    })

    readFile('table-cache.html', 'utf8', (_err, contents) => {
      const convertedAsDocx = convertToDocx(contents)
      const target = replaceAll((process.env.DIR_TARGET || '') + `tabela_${days[0].day}_${days[5].day}.docx`, ['/'], '-')

      writeFile(target, convertedAsDocx, (err) => {
        err ? console.log(err) : removeFiles(['table-cache.html'])
      })
    })

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
