/**
 * 695. 岛屿的最大面积
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  let max = 0
  const dfs = (i, j, count) => {
    if (i < 0 || i > grid.length - 1 || j < 0 || j > grid[0].length - 1) {
      return count
    }
    let cur = grid[i][j]
    if (cur) {
      ++count
      grid[i][j] = 0
      count = dfs(i - 1, j, count)
      count = dfs(i + 1, j, count)
      count = dfs(i, j + 1, count)
      count = dfs(i, j - 1, count)
    }
    return count
  }

  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      const cur = grid[i][j]
      if (cur) {
        const count = dfs(i, j, 0)
        max = Math.max(max, count)
      }
    }
  }
  return max
};

var maxAreaOfIsland2 = function (grid) {
  let max = 0, count = 0
  const dfs = (i, j) => {
    if (i < 0 || i > grid.length - 1 || j < 0 || j > grid[0].length - 1) {
      return 0
    }
    let cur = grid[i][j]
    if (cur) {
      grid[i][j] = 0
      ++count
      return 1 + dfs(i - 1, j) + dfs(i + 1, j) + dfs(i, j + 1) + dfs(i, j - 1)
    }
  }

  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      const cur = grid[i][j]
      if (cur) {
        count = 0
        dfs(i, j, 0)
        max = Math.max(max, count)
      }
    }
  }
  return max
};