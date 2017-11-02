export default obj => {
  let result = {}
  for (var k in obj) {
    if (!obj[k]) {
      result[k] = [0, 0]
    } else if (typeof obj[k] === 'number') {
      result[k] = [-1 * obj[k], obj[k]]
    }
  }
  return result
}
