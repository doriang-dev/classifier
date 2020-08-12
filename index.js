const path = require('path')
const fs = require('fs').promises
const { program } = require('commander')
const chalk = require('chalk')

const Classifier = require('./components/Classfier')
const { csvToJson, getCoordinates } = require('./utils/utils')

// TODO: validation des données et ajout dans le fichier .json
// FIXME: Classifier.js:61 -> Bad prediction

program
  .option('-p, --predict <dataName>, give prediction')
  .option('-d, --debug, enable debugger')
  .option('-c, --csv <csvFile>, convert csv file into json')

program.parse(process.argv)

if (program.predict) {
  fs.readFile(path.resolve('./data/', program.predict + '.json'))
    .then(data => {
      data = JSON.parse(data)
      const classifier = new Classifier(data)

      getCoordinates(classifier.getProps(), coords => {
        const prediction = classifier.predict(coords, program.debug)

        program.debug ? console.log(prediction) : console.log(prediction.dataType + ':', chalk.bgYellow.black(prediction.prediction))
      })
    })
}

if (program.csv) {
  const csvPath = path.resolve('./data/csv/', program.csv)
  csvToJson(csvPath)
    .then(name => {
      console.log(chalk.bgBlue('Success: ' + name + '.csv is converted'))
    })
}

// TODO: transformer en application web avec expressJS
