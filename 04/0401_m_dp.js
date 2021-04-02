/**
 * 787. K 站中转内最便宜的航班
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} K
 * @return {number}
 */
// 题解
var findCheapestPrice = function (n, flights, src, dst, K) {
  // 某一个目的地 k次中转 的最低价格
  let dp = new Array(n).fill(0).map((_) => new Array(K + 1).fill(Infinity))
  K = Math.min(K, n - 2)
  // 出发站是src的 end 直达价格最低
  dp[src][0] = 0
  // console.log(dp)
  for (const flight of flights) {
    const start = flight[0],
      end = flight[1],
      price = flight[2]
    if (start == src) {
      // 初始化出发地为src 目的地为end 的直达最低价格
      dp[end][0] = Math.min(dp[end][0], price)
    }
  }
  // console.log(dp)
  // k站中转次数，0站不需要中转直接直达，可以直接用dp的结果
  for (let k = 1; k <= K; k++) {
    for (const flight of flights) {
      const start = flight[0],
        end = flight[1],
        price = flight[2]
      // 为什么可以取dp[end][k - 1] 这样的话中转次数就不满足条件啊？？？？
      // dp[end][k] 之前可能会有重复的数据，所以要取dp[end][k]数据
      // dp[start][k - 1] + price 当前航线的出发地k-1次中间 + 当前航班的中转价格 = k次中转
      // 为什么这里不判断 if (start == src) ？？？ 不是很能想通
      dp[end][k] = Math.min(
        dp[end][k - 1],
        dp[end][k],
        dp[start][k - 1] + price
      )
      // dp[end][k] = Math.min(dp[end][k], dp[start][k - 1] + price);
    }
  }
  // console.log(dp)
  return dp[dst][K] === Infinity ? -1 : dp[dst][K]
}
// 题解一维
var findCheapestPrice2 = function (n, flights, src, dst, K) {
  let dist = new Array(n).fill(Infinity)
  // Initialize direct flight value
  dist[src] = 0
  for (const f of flights) {
    if (f[0] == src) {
      dist[f[1]] = f[2]
    }
  }

  for (let i = 0; i < K; i++) {
    for (const f of flights) {
      const u = f[0],
        v = f[1],
        w = f[2]
      if (dist[u] !== Infinity && dist[u] + w < dp[v]) {
        dp[v] = dist[u] + w
      }
    }
    dist = dp
  }

  return dist[dst] === Infinity ? -1 : dist[dst]
}
var findCheapestPrice = function (n, flights, src, dst, K) {
  const map = new Map()
  for (const [start, end, price] of flights) {
    if (!map.has(start)) {
      map.set(start, new Map())
    }
    map.get(start).set(end, price)
  }
  //  5   1->3->5  10
  //  5   1->2->5 15 //'asdasd'  /s\d+f/g
  const dis = new Array(n).fill('').map(() => new Array(K + 2).fill(Infinity))
  //dis[i][j] 经历j条路线到达i点时的最小花费
  const dfs = (start, v = 0, price = 0) => {
    if (v >= K + 1) return
    if (start === dst) return
    const target = map.get(start)
    if (!target.size) return
    for (const [next, pri] of target.entries()) {
      if (dis[next][v + 1] <= price + pri) continue
      dis[next][v + 1] = price + pri
      dfs(next, price + pri)
    }
  }
  dfs(src)
  const res = Math.min(...dis[dst])
  return res === Infinity ? -1 : res
}
