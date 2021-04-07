/**
 * 数组去重
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var unique = function (arr = [1, '1', 1]) {
  let obj = {}

  for (let i = arr.length - 1; i >= 0; i--) {
    const key = (typeof arr[i]) + arr[i]
    if (obj[key]) {
      arr.splice(i, 1)
    } else {
      obj[key] = true
    }
  }
  return arr
}
console.log(unique())
