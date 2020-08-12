class Point {
  /** @param {Array<Number>} coords Contains coordinates
   *  @param {Number} typeCode Code of the type of data */
  constructor (coords, typeCode) {
    this.coords = coords
    this.typeCode = typeCode * 1
  }

  /** @param {Point} point */
  distance (point) {
    let sum = 0
    point.coords.forEach((coord, index) => {
      sum += (this.coords[index] - coord) ** 2
    })

    return Math.sqrt(sum)
  }
}

module.exports = Point
