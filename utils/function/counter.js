/**
 * Count how many occurences of data type in an array
 * @param {Array<Array<Number>>} arr
 */
function counter (arr) {
  arr.forEach(value => {
    value.shift()
  })
  const flatArr = arr.flat()

  const counter = {}
  flatArr.forEach(code => {
    typeof counter[code] === 'undefined' ? counter[code] = 1 : counter[code]++
  })

  return counter
}

module.exports = counter
