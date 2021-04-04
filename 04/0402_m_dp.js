/**
 * 1314. 矩阵区域和
 * @param {number[][]} mat
 * @param {number} K
 * @return {number[][]}
 */
var matrixBlockSum = function (
  mat = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  K = 1
) {
  const m = mat.length,
    n = mat[0].length
  let dp = new Array(m).fill(0).map((_) => new Array(n).fill(0))
  let answer = new Array(m).fill(0).map((_) => new Array(n).fill(0))
  // 从0，0开始到i，j位置矩形的和
  // dp[i][j] = 上一行当前位置 + 当前行前一个位置 - 对角线的位置
  dp[0][0] = mat[0][0]
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dp[i][j] =
        (dp?.[i - 1]?.[j] ?? 0) +
        (dp[i]?.[j - 1] ?? 0) -
        (dp?.[i - 1]?.[j - 1] ?? 0) +
        mat[i][j]
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const minI = i - K < 0 ? 0 : i - K,
        maxI = i + K >= m ? m - 1 : i + K,
        minJ = j - K < 0 ? 0 : j - K,
        maxJ = j + K >= n ? n - 1 : j + K 
      answer[i][j] =
        dp[maxI][maxJ] -
        (dp[maxI]?.[minJ - 1] ?? 0) -
        (dp?.[minI - 1]?.[maxJ] ?? 0) +
        (dp?.[minI - 1]?.[minJ - 1] ?? 0)
    }
  }
  return answer
}
var matrixBlockSum2 = function (mat, K) {
  const m = mat.length,
    n = mat[0].length
  let dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
  let answer = new Array(m).fill(0).map(() => new Array(n).fill(0))

  dp[0][0] = mat[0][0]
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dp[i][j] =
        (dp?.[i - 1]?.[j] ?? 0) +
        (dp[i]?.[j - 1] ?? 0) -
        (dp?.[i - 1]?.[j - 1] ?? 0) +
        mat[i][j]
    }
  }
  const getSum = (i, j) => {
    if (i < 0 || j < 0) return 0
    return dp[Math.min(i, m - 1)][Math.min(n - 1, j)]
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      answer[i][j] =
        getSum(i + K, j + K) +
        getSum(i - K - 1, j - K - 1) -
        getSum(i + K, j - K - 1) -
        getSum(i - K - 1, j + K)
    }
  }
  return answer
}
matrixBlockSum()
