/**
 * 63. 不同路径 II
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  let m = obstacleGrid.length,
    n = obstacleGrid[0].length
  let dp = new Array(m + 1).fill(0).map((_) => new Array(n + 1).fill(0))
  if (obstacleGrid[m - 1][n - 1] || obstacleGrid[0][0]) return 0
  dp[1][1] = 1
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (i === 1 && j === 1) continue
      let v1 = (obstacleGrid[i - 2]?.[j - 1] ?? 1) === 1 ? 0 : dp[i - 1][j],
        v2 = (obstacleGrid[i - 1][j - 2] ?? 1) === 1 ? 0 : dp[i][j - 1]

      dp[i][j] = v1 + v2
    }
  }
  return dp[m][n]
}

var uniquePathsWithObstacles2 = function (obstacleGrid) {
  let m = obstacleGrid.length,
    n = obstacleGrid[0].length
  let dp = new Array(m + 1).fill(0).map((_) => new Array(n + 1).fill(0))
  if (obstacleGrid[m - 1][n - 1] || obstacleGrid[0][0]) return 0
  dp[1][1] = 1
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (i === 1 && j === 1) continue
      if (obstacleGrid[i - 1][j - 1]) dp[i][j] = 0
      else dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[m][n]
}

/**
 * 64. 最小路径和
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const m = grid.length,
    n = grid[0].length
  let dp = new Array(m + 1).fill(0).map((_) => new Array(n + 1).fill(Infinity))
  // 空行 初始值
  dp[1][1] = grid[0][0]
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (i === 1 && j === 1) continue
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i - 1][j - 1]
    }
  }
  return dp[m][n]
}

/**
 * 338. 比特位计数
 * @param {number} num
 * @return {number[]}
 */
var countBits = function (num) {
  var dp = new Array(num + 1).fill(0)

  for (let i = 1; i <= num; i++) {
    // 0  1  2   3   4    5    6     7     8       9    10     11    12      13    14   15    16
    // 0  1  10  11  100  101  110   111   1000   1001  1010  1011   1100   1101  1110  1111  10000
    // 0  1  1   2   1    2     2    3     1        2    2     3      2      3    3     4       1
    //toString(2) 转为 二进制字符串
    dp[i] = (i.toString(2).match(/1/g) ?? []).length
  }
  return dp
}
// 题解法
var countBits2 = function (num) {
  var dp = new Array(num + 1).fill(0)
  dp[0] = 0
  for (let i = 1; i <= num; i++) {
    if (i % 2 == 1) {
      // 奇数最后一位是1 那么相等于 前一个偶数除以2之后的二进制1的个数 + 1(就是奇数中1的个数)
      dp[i] = result[i - 1] + 1
    } else {
      // 偶数能除以2 说明最后一位是0 那么相等于 除以2之后的二进制1的个数
      dp[i] = result[i / 2]
    }
  }
  return dp
}
var countBits3 = function (num) {
  const bits = new Array(num + 1).fill(0)
  let highBit = 0
  for (let i = 1; i <= num; i++) {
    // 按位与 同位置的都是1才是1其他为0
    // 为了判断一个正整数是不是 22 的整数次幂，
    // 可以利用方法一中提到的按位与运算的性质。
    // 如果正整数 y 是 2 的整数次幂，
    // 则 y 的二进制表示中只有最高位是 1，其余都是 0，
    // 因此 y&(y - 1)=0。由此可见，
    // 正整数 y 是 2 的整数次幂，当且仅当 y & (y−1)=0

    if ((i & (i - 1)) == 0) {
      highBit = i
    }
    bits[i] = bits[i - highBit] + 1
  }
  return bits
}

/**
 * 1277. 统计全为 1 的正方形子矩阵
 * @param {number[][]} matrix
 * @return {number}
 */
var countSquares = function (matrix) {
  const m = matrix.length,
    n = matrix[0].length
  // 相对于 00位置的前缀和
  let dp1 = new Array(m).fill(0).map(() => new Array(n).fill(0))
  // 边长为k 的正方形个数
  let dp2 = new Array(n).fill(0)

  dp1[0][0] = matrix[0][0]
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dp1[i][j] =
        (dp1?.[i - 1]?.[j] ?? 0) +
        (dp1[i]?.[j - 1] ?? 0) -
        (dp1?.[i - 1]?.[j - 1] ?? 0) +
        matrix[i][j]
      if (matrix[i][j]) ++dp2[0]
    }
  }
  const getSum = (i, j) => {
    if (i < 0 || j < 0) return 0
    return dp1[Math.min(i, m - 1)][Math.min(n - 1, j)]
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 不用 越界判断
      // for (let k = 1; k < Math.min(m - i, n - j); k++) {
      for (let k = 1; k < n; k++) {
        // 判断当前位置的正方形的和 是否为正方形的面积 也就是元素和 全为1的情况
        if (
          getSum(i + k, j + k) +
            getSum(i - 1, j - 1) -
            getSum(i + k, j - 1) -
            getSum(i - 1, j + k) ===
          (k + 1) * (k + 1)
        ) {
          ++dp2[k]
        }
      }
    }
  }
  console.log(dp2)
  return dp2.reduce((a, b) => a + b, 0)
}
// 如何优化？？

/**
 * 1043. 分隔数组以得到最大和
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
// 木有想法
var maxSumAfterPartitioning = function (arr, k) {
  // (arr = [1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3]), (k = 4)
  //         0  1  2  3  4  5  6  7  8  9  10
  // 1 4        8
  // 1 5  7     21
  // 3 6 1 9    36
  // 9 3        18
  // 29 + 54 =  83
}

// 首先由于本题具有最优子结构的性质，因此可以想到采用动态规划的思路进行解决。
// 动态规划需要定义状态：
// dp[i] 表示前i个元素进行合理分割能得到的最大值，
// 因此可以遍历从i开始数的前k个元素，由这些子问题的最优解得到更新的状态。
// 因此可以写出状态转移方程：
// dp[i] = Math.max(dp[i], dp[j] + (i-j) * maxof(dp[j..i]))
// 边界条件为j >= 0 && i - j <= k
// 其中注意每层内层循环都需要维护一个局部最大值max.
// 题解
var maxSumAfterPartitioning = function (arr, k) {
  let len = arr.length
  let dp = new Array(len + 1).fill(0)
  for (let i = 1; i <= len; i++) {
    let max = 0
    for (let j = i - 1; i - j <= k && j >= 0; j--) {
      max = Math.max(max, arr[j])
      // dp[j] + [j...i] * max  为什么忽略了arr[i]的值
      dp[i] = Math.max(dp[i], dp[j] + (i - j) * max)
    }
  }
  return dp[len]
}
