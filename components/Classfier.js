const Point = require('./Point')
const { counter } = require('../utils/utils')

class Classifier {
  /**
   * Create new Classifier
   * @param {Object} data data object
   */
  constructor (data) {
    this.dataRaw = data.data
    this.correspondance = data.correspondance
    this.props = data.headers
    this.name = data.dataName
    this.properties = this.props.slice(0, this.props.length - 1)
    this.type = this.correspondance.length
    this.k = Math.sqrt(this.dataRaw.length / this.type)

    this.data = []

    this.init()
  }

  /**
   * Function which initialize the data property
   */
  init () {
    const data = this.dataRaw
    data.forEach(point => {
      const typeCode = point.pop()
      this.data.push(new Point(point, typeCode))
    })
  }

  /**
   * Function which give a prediction based on data
   * @param {Array<Number>} coords Coordinates of the point that will be predict
   * @param {Boolean} debug Enable debugger
   */
  predict (coords, debug) {
    const point = new Point(coords)
    const returnValue = {}

    const distances = []
    this.data.forEach(dataPoint => {
      const distance = point.distance(dataPoint)
      distances.push([distance, dataPoint.typeCode])
    })

    distances.sort((a, b) => a[0] - b[0])

    const knn = distances.slice(0, this.k)
    const count = counter(knn)
    if (debug) returnValue.counter = count

    // FIXME: Selection de l'index finale (DataClients (25; 1; 5; 120))
    const counterArray = Object.entries(count).map(value => [value[0] * 1, value[1]].reverse())
    if (debug) returnValue.counterArray = counterArray

    const sortedArray = counterArray.sort((a, b) => a + b).reverse()
    if (debug) returnValue.sortedArray = sortedArray

    const typeIndex = sortedArray[0][1]
    if (debug) returnValue.index = typeIndex

    returnValue.correspondance = this.correspondance
    returnValue.dataType = this.props[this.props.length - 1]
    returnValue.prediction = this.correspondance[typeIndex]

    return returnValue
  }

  // TODO: change function to getter
  getDimensions () {
    return this.properties.length
  }

  getProps () {
    return this.properties
  }

  getName () {
    return this.name
  }
}

module.exports = Classifier
