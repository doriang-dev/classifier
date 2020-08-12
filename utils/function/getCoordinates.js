const prompt = require('prompt')

/**
 * Function to get coordinates of the that will be predict
 * @param {Array<String>} props properties of each coordinates
 * @param {Function} callback callback function
 */
function getCoordinates (props, callback) {
  prompt.start()
  prompt.get(props, (err, result) => {
    if (err) throw err

    const coords = Object.entries(result).map(value => value.pop()).map(value => value * 1)

    callback(coords)
  })
}

module.exports = getCoordinates
