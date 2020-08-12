const fs = require('fs').promises
const path = require('path')
const parse = require('csv-parse')
const prompt = require('prompt')

/**
 * Convert csv file into json file
 * @param {String} csvFilePath Path of the csv file
 */
function csvToJson (csvFilePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(csvFilePath, { encoding: 'utf-8' })
      .then(content => {
        parse(content, (error, output) => {
          if (error) console.error(error)
          const data = {}

          data.headers = output.shift()
          data.data = output

          // Récupération des correspondance
          prompt.start()
          prompt.get(['correspondance'], (error, result) => {
            if (error) reject(error)

            data.correspondance = JSON.parse(result.correspondance)

            const jsonName = path.parse(csvFilePath).name
            const jsonPath = path.resolve(csvFilePath, '../..') + '\\' + jsonName + '.json'

            data.dataName = jsonName.replace(jsonName[0], jsonName[0].toUpperCase())
            const dataString = JSON.stringify(data)

            fs.writeFile(jsonPath, dataString)
              .then(resolve(jsonName))
              .catch(reject(error))
          })
        })
      })
      .catch(error => {
        reject(error)
      })
  })
}

module.exports = csvToJson
