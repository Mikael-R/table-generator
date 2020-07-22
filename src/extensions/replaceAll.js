module.exports = (toolbox) => {
  const replaceAll = (str, searchValues, replaceValue) => {
    for (const i in searchValues) {
      const searchRegex = new RegExp(searchValues[i])

      str = str
        .split('')
        .map(char => char.replace(searchRegex, replaceValue))
        .join('')
    }

    return str
  }

  toolbox.replaceAll = replaceAll
}
