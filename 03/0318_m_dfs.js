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
  let max = 0
  const dfs = (i, j) => {
    if (i < 0 || i > grid.length - 1 || j < 0 || j > grid[0].length - 1) {
      return 0
    }
    let cur = grid[i][j]
    if (cur) {
      grid[i][j] = 0
      return 1 + dfs(i - 1, j) + dfs(i + 1, j) + dfs(i, j + 1) + dfs(i, j - 1)
    }
  }

  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      const cur = grid[i][j]
      if (cur) {
        max = Math.max(max, dfs(i, j, 0))
      }
    }
  }
  return max
};


/**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */

/**
 * 690. 员工的重要性
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */
var GetImportance = function (employees, id) {
  var map = new Map(), sum = 0
  const dfs = (id) => {
    const cur = map.get(id)
    if (!cur) return
    sum += cur[0]
    const ids = cur[1]
    for (var i = 0; i < ids.length; i++) {
      dfs(ids[i])
    }
  }
  for (var i = 0; i < employees.length; i++) {
    const e = employees[i]
    map.set(e.id, [e.importance, e.subordinates])
  }
  dfs(id)
  return sum
};

var GetImportance2 = function (employees, id) {
  var map = new Map()
  const dfs = (id) => {
    const cur = map.get(id)
    if (!cur) return
    const ids = cur[1]
    return cur[0] + ids.reduce((pre, item) => {
      pre + dfs(item)
    },0)

  }
  for (var i = 0; i < employees.length; i++) {
    const e = employees[i]
    map.set(e.id, [e.importance, e.subordinates])
  }
  return dfs(id)
}
