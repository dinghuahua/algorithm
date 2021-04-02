/**
 * 1314. 矩阵区域和
 * @param {number[][]} mat
 * @param {number} K
 * @return {number[][]}
 */
var matrixBlockSumError = function (
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
  console.log(dp)
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const minI = i - K < 0 ? 0 : i - K,
        maxI = i + K >= m ? m - 1 : i + K,
        minJ = j - K < 0 ? 0 : j - K,
        maxJ = j + K >= n ? n - 1 : j + K
      console.log(
        dp[maxI][maxJ] -
          (dp[maxI]?.[minJ - 1] ?? 0) -
          (dp?.[minI - 1]?.[maxJ] ?? 0) +
          (dp?.[minI - 1]?.[minJ - 1] ?? 0)
      )
      answer[i][j] =
        dp[maxI][maxJ] -
        (dp[maxI]?.[minJ - 1] ?? 0) -
        (dp?.[minI - 1]?.[maxJ] ?? 0) +
        (dp?.[minI - 1]?.[minJ - 1] ?? 0)
    }
  }
  console.log(answer)
  return answer
}
matrixBlockSum()
