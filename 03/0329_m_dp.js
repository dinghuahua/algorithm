/**
 * 474. 一和零
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

const countzeroesones = (s) => {
  var c = [0, 0]
  for (let i = 0; i < s.length; i++) {
    c[+s[i]]++
  }
  return c
}
// 三维数组 dp
var findMaxForm = function (
  strs = ['10', '0001', '111001', '1', '0'],
  m = 5,
  n = 3
) {
  const l = strs.length
  // 遍历到第i个字符串时可用空间为j个0、k个1的最多存放字符串数量
  let dp = new Array(l + 1)
    .fill('')
    .map((_) => new Array(m + 1).fill(0).map((_) => new Array(n + 1).fill(0)))

  for (let i = 1; i <= l; i++) {
    const count = countzeroesones(strs[i - 1]),
      v0 = count[0],
      v1 = count[1]
    for (let j = 0; j <= m; j++) {
      for (let k = 0; k <= n; k++) {
        if (j < v0 || k < v1) {
          //  当前字符串放不进去，直接使用上一行数据
          dp[i][j][k] = dp[i - 1][j][k]
        } else {
          //  当前字符串可以放进去，放与不放进行取最大值
          dp[i][j][k] = Math.max(dp[i - 1][j][k], 1 + dp[i - 1][j - v0][k - v1])
        }
      }
    }
  }
  console.log(dp)
  return dp[l][m][n]
}
//压缩为二维数组 dp
var findMaxForm1 = function (
  strs = ['10', '0001', '111001', '1', '0'],
  m = 5,
  n = 3
) {
  const l = strs.length
  // 遍历到第i个字符串时可用空间为j个0、k个1的最多存放字符串数量
  let dp = new Array(m + 1).fill('').map((_) => new Array(n + 1).fill(0))

  for (let i = 1; i <= l; i++) {
    const count = countzeroesones(strs[i - 1]),
      v0 = count[0],
      v1 = count[1]
    for (let j = m; j >= v0; j--) {
      for (let k = n; k >= v1; k--) {
        //  当前字符串可以放进去，放与不放进行取最大值
        dp[j][k] = Math.max(dp[j][k], 1 + dp[j - v0][k - v1])
      }
    }
  }
  return dp[m][n]
}
console.log(findMaxForm(), findMaxForm1())
