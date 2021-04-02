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
