/**
 * 1578. 避免重复字母的最小删除成本
 * @param {string} s
 * @param {number[]} cost
 * @return {number}
 */
var minCost = function (s, cost) {
  let min = 0
  for (let i = 0; i < s.length;) {
    // 找最长相邻相同字母
    let j
    for (j = i + 1; j < s.length; j++) {
      if (s[j] !== s[i]) break
    }
    if (i + 1 !== j) {
      let temp = cost.slice(i, j).sort((a, b) => a - b)
      temp.pop()
      min = temp.reduce((pre, i) => pre + i, min)
    }
    i = j
  }
  return min
}

var minCost2 = function (s, cost) {
  let min = 0
  for (let i = 0; i < s.length;) {
    // 找最长相邻相同字母
    let j
    for (j = i + 1; j < s.length; j++) {
      if (s[j] !== s[i]) break
    }
    if (i + 1 !== j) {
      let max = Math.max(...cost.slice(i, j))
      min = temp.reduce((pre, i) => pre + i, min) - 2 * max
    }
    i = j
  }
  return min
}
