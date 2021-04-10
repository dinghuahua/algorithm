/**
 * 1769. 移动所有球到每个盒子所需的最小操作数
 * @param {string} boxes
 * @return {number[]}
 */
var minOperations = function (boxes) {
  const len = boxes.length
  let res = new Array(len)
  for (let i = 0; i < len; i++) {
    let num = 0
    for (let j = 0; j < len; j++) {
      if (j === i) continue
      if (boxes[j] === '1') {
        num += Math.abs(j - i)
      }
    }
    res[i] = num
  }
  return res
}
var minOperations2 = function (boxes) {
  const len = boxes.length
  let res = new Array(len).fill(0)
  let left = boxes[0] === 1 ? 1 : 0
  let right = 0
  for (let i = 1; i < len; i++) {
    if (boxes[i] === '1') {
      res[0] += i
      right++
    }
  }
  for (let i = 1; i < len; i++) {
    res[i] = res[i - 1] + left - right
    if (boxes[i] === '1') {
      right--
      left++
    }
  }
  return res
}
/**
 * 921. 使括号有效的最少添加
 * @param {string} S
 * @return {number}
 */
var minAddToMakeValid = function (S) {
  let len = S.length,
    num = 0
  stack = []

  for (let i = 0; i < len; i++) {
    if (S[i] === '(') stack.push('(')
    else {
      stack.length ? stack.pop() : ++num
    }
  }
  return num + stack.length
}

/**
 * 1605. 给定行和列的和求可行矩阵
 * @param {number[]} rowSum
 * @param {number[]} colSum
 * @return {number[][]}
 */
// 题解
var restoreMatrix = function (rowSum, colSum) {
  let m = rowSum.length,
    n = colSum.length,
    arr = new Array(m).fill('').map((_) => new Array(n)),
    x = 0,
    y = 0

  while (x < m && y < n) {
    let min = Math.min(rowSum[x], colSum[y])
    arr[x][y] = min

    if (min === rowSum[x]) {
      // 最小值为行和时，说明当前行的剩余列为0
      for (let j = y + 1; j < n; j++) {
        arr[x][j] = 0
      }
      rowSum[x] -= min
      colSum[y] -= min
      // 进行遍历下一行
      x++
    } else {
      // 最小值为列和时，说明当前列的剩余行为0
      for (let i = x + 1; i < m; i++) {
        arr[i][y] = 0
      }
      rowSum[x] -= min
      colSum[y] -= min

      // 进行遍历下一列
      y++
    }
  }
  return arr
}

// 题解
var restoreMatrix2 = function (rowSum, colSum) {
  let m = rowSum.length,
    n = colSum.length,
    arr = new Array(m).fill('').map((_) => new Array(n))

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      arr[i][j] = Math.min(rowSum[i], colSum[j])
      rowSum[i] -= arr[i][j]
      colSum[j] -= arr[i][j]
    }
  }
  return arr
}
