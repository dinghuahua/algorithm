/**
 * 62. 不同路径
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  let arr = new Array(m).fill(0).map((a) => new Array(n).fill(0))
  arr[0][0] = 1
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) continue
      arr[i][j] = arr[i - 1]?.[j] ?? 0 + arr[i][j - 1] ?? 0
    }
  }
  return arr[m - 1][n - 1]
}
var uniquePaths1 = function (m, n) {
  let arr = new Array(n).fill(1)
  for (let i = 1; i < m; i++) {
    arr[0] = 1
    for (let j = 1; j < n; j++) {
      arr[j] = arr[j - 1] + arr[j]
    }
  }
  return arr[n - 1]
}

var uniquePaths1 = function (m, n) {
  let first = 1, second = 0
  
  for (let i = 1; i < m; i++) {
    first = 1
    for (let j = 1; j < n; j++) {
      second = first + second
    }
  }
  return arr[n - 1]
}
