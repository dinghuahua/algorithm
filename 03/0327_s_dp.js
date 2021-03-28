/**
 * 121. 买卖股票的最佳时机
 * @param {number[]} prices
 * @return {number}
 */
// 超时
var maxProfit = function (prices) {
  // 第i天买进的股票最大的利润
  const dp = new Array(prices.length).fill(0)

  for (let i = 1; i < prices.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      dp[j] = Math.max(prices[i] - prices[j], dp[j])
    }
  }
  return Math.max(...dp)
}

// 超时
var maxProfit = function (prices) {
  let max = 0

  for (let i = 0; i < prices.length; i++) {
    max = Math.max(0, max, prices[i] - Math.min(...prices.slice(0, i)))
  }
  return max
}

var maxProfit = function (prices) {
  let max = 0,
    min = Infinity

  for (let i = 0; i < prices.length; i++) {
    max = Math.max(max, prices[i] - min)
    min = Math.min(prices[i], min)
  }
  return max
}

/**
 * 746. 使用最小花费爬楼梯
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairsError = function (cost) {
  //  从0or1开始
  let [sum, i] = cost[0] > cost[1] ? [cost[1], 1] : [cost[0], 0]
  console.log(sum, i)
  for (; i < cost.length; ) {
    if (i === cost.length - 1) break
    if (cost[i + 1] > cost[i + 2]) {
      sum += cost[i + 2]
      i += 2
    } else {
      sum += cost[i + 1]
      i += 1
    }
    console.log(sum, i)
  }
  return sum
}
var minCostClimbingStairsError = function (cost) {
  let sum = 0

  for (let i = 0; i < cost.length; ) {
    // if (i === cost.length - 1) break
    // 当前走一步 预判下次走一步 or 走两步的
    // 当前走两步 预判下次走一步 or 走两步的
    // 四种情况取最小值,怎么保存步长变更i
    let [cur, step] = Math.min(
      cost?.[i + 1] ?? 0 + cost?.[i + 2] ?? 0,
      cost?.[i + 1] ?? 0 + cost?.[i + 3] ?? 0,
      cost?.[i + 2] ?? 0 + cost?.[i + 3] ?? 0,
      cost?.[i + 2] ?? 0 + cost?.[i + 4] ?? 0
    )
  }
  return sum
}
// 看题解之后
var minCostClimbingStairs = function (cost) {
  //到达i的最小花费
  let dp = new Array(cost.length).fill(0)

  for (let i = 2; i < cost.length; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
  }
  // 倒数第一层 倒数的二层
  return Math.min(
    dp[cost.length - 1] + cost[cost.length - 1],
    dp[cost.length - 2] + cost[cost.length - 2]
  )
}
var minCostClimbingStairs2 = function (cost) {
  const l = cost.length
  let dp = new Array(cost.length + 1).fill(0)
  dp[1] = cost[0]
  let i = 1
  while (i < l) {
    dp[i + 1] = Math.min(dp[i - 1], dp[i]) + cost[i]
    i++
  }
  return Math.min(dp[l - 1], dp[l])
}
var minCostClimbingStairs3 = function (cost) {
  const l = cost.length
  let dp = new Array(cost.length + 2).fill(0)
  dp[1] = cost[0]
  let i = 1
  while (i <= l) {
    dp[i + 1] = Math.min(dp[i - 1], dp[i]) + (cost[i] ?? 0)
    i++
  }
  return Math.min(dp[l + 1])
}
var minCostClimbingStairs4 = function (cost) {
  // 只需要记录到达i-2、i-1的最小花费
  let dp2 = 0,
    dp1 = 0

  for (let i = 2; i < cost.length + 2; i++) {
    const cost2 = cost?.[i - 2] ?? 0,
      cost1 = cost?.[i - 1] ?? 0
    const temp = dp1
    dp1 = Math.min(dp1 + cost1, dp2 + cost2)
    dp2 = temp
  }
  // 边界多走一层、多走二层
  return Math.min(dp1, dp2)
}
var minCostClimbingStairs5 = function (cost) {
  const l = cost.length
  let v1 = cost[0]
  let v2 = cost[1]
  let i = 2
  while (i < l) {
    ;[v1, v2] = [v2, cost[i] + Math.min(v1, v2)]
    i++
  }
  return Math.min(v1, v2)
}
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
// 注意：给定 n 是一个正整数。

/**
 * 70. 爬楼梯
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let dp = new Array(n).fill(1)
  dp[1] = 2
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n - 1]
}
var climbStairs2 = function (n) {
  let dp2 = 1,
    dp1 = 2
  if (n === 1) return dp2
  for (let i = 2; i < n; i++) {
    const temp = dp1
    dp1 = dp1 + dp2
    dp2 = temp
  }
  return dp1
}

/**
 * 面试题 17.16. 按摩师 是否可以优化
 * @param {number[]} nums
 * @return {number}
 */
var massage = function (nums) {
  if (!nums.length) return 0
  let dp = new Array(nums.length).fill(nums[0])
  dp[1] = nums?.[1] || 0
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(...dp.slice(0, i - 1)) + nums[i]
  }
  return Math.max(...dp)
}

var massageError = function (nums) {
  let dp2 = nums?.[0] || 0
  dp1 = nums?.[1] || 0
  if (nums.length <= 2) {
    return Math.max(dp1, dp2)
  } else {
    dp2 = nums[0]
    //  不可以直接赋值 需要进行对比后赋值
    dp1 = nums[1]
  }
  for (let i = 2; i < nums.length; i++) {
    const temp = dp1
    dp1 = Math.max(dp2 + nums[i], dp1)
    dp2 = temp
  }
  return Math.max(dp2, dp1)
}
var massage2 = function (nums) {
  let dp2 = nums?.[0] || 0
  dp1 = nums?.[1] || 0
  if (nums.length <= 2) {
    return Math.max(dp1, dp2)
  } else {
    dp2 = nums[0]
    // 也需要通过比较计算 不能直接赋值为nums[1]
    dp1 = Math.max(nums[1], dp2)
  }
  for (let i = 2; i < nums.length; i++) {
    const temp = dp1
    dp1 = Math.max(dp2 + nums[i], dp1)
    dp2 = temp
  }
  return Math.max(dp2, dp1)
}
var massage3 = function (nums) {
  const l = nums.length
  if (!l) return 0
  let v1 = nums[0]
  let v2 = 0
  let i = 1
  while (i < l) {
    ;[v1, v2] = [Math.max(v2 + nums[i], v1), v1]
    i++
  }
  return v1
}
