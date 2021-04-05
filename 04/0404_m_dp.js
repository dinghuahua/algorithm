/**
 * 714. 买卖股票的最佳时机含手续费
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfitError = function (prices, fee) {
  const len = prices.length
  // 第i天的 0没有股票/1有股票利润最大值
  let dp = new Array(len + 1).fill(0).map((_) => new Array(2).fill(0))

  for (let i = 1; i <= len; i++) {
    // 当天不买也不卖 取前一天的没有股票
    // 当天卖掉股票
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i - 1] - fee)
    // 当天不买也不卖 取前一天的有股票
    // 当天买进
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i - 1])
  }
  // console.log(dp)
  return dp[len][0]
}
// 题解
var maxProfit = function (prices, fee) {
  const len = prices.length
  // 第i天的 0没有股票/1有股票利润最大值
  let dp = new Array(len + 1).fill(0).map((_) => new Array(2).fill(0))

  dp[0][0] = 0
  // ？？？？为什么 初始化
  dp[0][1] = -prices[0]
  for (let i = 1; i <= len; i++) {
    // 当天不买也不卖 取前一天的没有股票
    // 当天卖掉股票
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i - 1] - fee)
    // 当天不买也不卖 取前一天的有股票
    // 当天买进
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i - 1])
  }
  return dp[len][0]
}

/**
 * 剑指 Offer 47. 礼物的最大价值
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function (grid) {
  const m = grid.length,
    n = grid[0].length
  let dp = new Array(m).fill(0).map((_) => new Array(n).fill(0))

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dp[i][j] =
        Math.max(dp?.[i - 1]?.[j] ?? 0, dp[i]?.[j - 1] ?? 0) + grid[i][j]
    }
  }
  // console.log(dp)
  return dp[m - 1][n - 1]
}

/**
 * 96. 不同的二叉搜索树
 * @param {number} n
 * @return {number}
 */
// 木有想法
var numTreesError = function (n) {
  // 第i个数字时有几种不同结构的二叉搜宿树
  let dp = new Array(n + 1).fill(0)
  dp[1] = 1
  dp[2] = 2
  for (let i = 3; i <= n; i++) {}
}
// 题解 看不懂
var numTrees2 = function (n) {
  const G = new Array(n + 1).fill(0)
  G[0] = 1
  G[1] = 1

  for (let i = 2; i <= n; ++i) {
    for (let j = 1; j <= i; ++j) {
      G[i] += G[j - 1] * G[i - j]
    }
  }
  return G[n]
}

var numTrees3 = function (n) {
  let C = 1
  for (let i = 0; i < n; ++i) {
    C = (C * 2 * (2 * i + 1)) / (i + 2)
  }
  return C
}

/**
 * 131. 分割回文串
 * @param {string} s
 * @return {string[][]}
 */
var partitionError = function (s) {
  const is = (str) => {
    for (let i = 0, j = str.length - 1; i <= j; i++, j--) {
      if (str[i] !== str[j]) return false
    }
    return true
  }
  let stack = [{ pre: '', next: s }],
    res = []
  while (stack.length) {
    const { pre, next } = stack.shift()
    console.log(pre, next)
    if (is(pre)) res.push(pre)
    if (!next.length) continue

    // 枚举不了所有的情况 因为可以多次分割
    for (let i = 0; i < next.length; i++) {
      stack.unshift({
        pre: `${pre}${next[i]}`,
        next: `${next.slice(i + 1)}`,
      })
    }
  }
  console.log(res)
  return res
}
// 题解 看不懂
var partition = function (s) {
  const dfs = (i) => {
    if (i === n) {
      ret.push(ans.slice())
      return
    }
    for (let j = i; j < n; ++j) {
      if (f[i][j]) {
        ans.push(s.slice(i, j + 1))
        dfs(j + 1)
        ans.pop()
      }
    }
  }

  const n = s.length
  const f = new Array(n).fill(0).map(() => new Array(n).fill(true))
  let ret = [],
    ans = []

  for (let i = n - 1; i >= 0; --i) {
    for (let j = i + 1; j < n; ++j) {
      f[i][j] = s[i] === s[j] && f[i + 1][j - 1]
    }
  }
  dfs(0)
  return ret
}
partition('aab')
