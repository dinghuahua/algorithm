/**
 * 0/1 背包问题
 * @param {*} arr  重量 价值
 * @param {*} n    n件物品
 * @param {*} m    背包的最大承受重量
 * 求满足条件时的最大价值，每一件物品只能拿一个
 */
// 二维dp：容量从前往后遍历，但是都需要写j<wi的判断 所以在使用二维dp时，判断条件无区别
const fun = (arr = [[3, 5], [1, 2], [2, 3], [1, 5], [2, 1]], n = 6, m = 7) => {
  // 在第i件物品时可用重量为j的最大价值
  let dp = new Array(n + 1).fill('').map(item => new Array(m + 1).fill(0))
  const l = arr.length
  // i 第i件物品 从1开始
  for (let i = 1; i <= n; i++) {
    if (i > l) { dp[i] = dp[i - 1]; continue }
    let cur = arr[i - 1], wi = cur[0], vi = cur[1]
    // j背包剩余(可用)的重量 从1开始 从前往后遍历
    for (let j = 1; j <= m; j++) {
      if (j < wi) {
        // 背包剩余的重量 小于 当前物品的重量  则当前dp 使用前一个物品的价值数据
        dp[i][j] = dp[i - 1][j]
      } else {
        // 背包剩余的重量 大于 当前物品的重量  
        // 则需要考虑是否把当前物品拿到背包中
        // 不拿当前物品：使用前一个物品的价值数据
        // 拿当前物品：利用取上一个物品时可用重量为 (当前背包剩余的重量 - 当前物品的重量)价值的最优解 + 当前物品的价值
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - wi] + vi)
      }
    }
  }
  // console.log(dp)
  return dp[n][m]
}
// 二维dp：容量从后往前遍历时，也需要写j<wi的判断
const fun2 = (arr = [[3, 5], [1, 2], [2, 3], [1, 5], [2, 1]], n = 6, m = 7) => {
  // 在第i件物品时可用重量为j的最大价值
  let dp = new Array(n + 1).fill('').map(item => new Array(m + 1).fill(0))
  const l = arr.length
  // i 第i件物品 从1开始
  for (let i = 1; i <= n; i++) {
    if (i > l) { dp[i] = dp[i - 1]; continue }
    let cur = arr[i - 1], wi = cur[0], vi = cur[1]
    // j背包剩余(可用)的重量 从1开始 从后往前遍历 不能到wi为止，不然当j<wi时使用前一个数据的价值时，木有赋值，否则都是初始数据0！！！！！！！
    // 所以二维dp：从前往后遍历和从后往前遍历是一样的 
    for (let j = m; j >= 1; j--) {
      if (j < wi) {
        // 背包剩余的重量 小于 当前物品的重量  则当前dp 使用前一个物品的价值数据
        dp[i][j] = dp[i - 1][j]
      } else {
        // 因为要使用前一个物品的数据，所以需要从后往前遍历，从而避免在还没有使用数据时就被覆盖
        // 不拿当前物品：使用前一个物品的价值数据
        // 拿当前物品：利用取上一个物品时可用重量为 (当前背包剩余的重量 - 当前物品的重量)价值的最优解 + 当前物品的价值
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - wi] + vi)
      }
    }
  }
  // console.log(dp)
  return dp[n][m]
}
//一维dp：当二维dp压缩为一维dp时，容量只能从后往前遍历，因为需要使用历史数据，避免在还没有使用历史数据时就被覆盖
const fun3 = (arr = [[3, 5], [1, 2], [2, 3], [1, 5], [2, 1]], n = 6, m = 7) => {
  // 在第i件物品时可用重量为j的最大价值
  let dp = new Array(m + 1).fill(0)
  const l = arr.length
  // i 第i件物品 从1开始
  for (let i = 1; i <= n; i++) {
    if (i > l) break
    let cur = arr[i - 1], wi = cur[0], vi = cur[1]
    // j背包剩余(可用)的重量 从1开始 从后往前遍历 到wi为止，当j<wi时使用前一个数据的价值，因为之前的dp历史数据正好保存的是上一个数据的价值
    for (let j = m; j >= wi; j--) {
      // 因为要使用前一个物品的数据，所以需要从后往前遍历，从而避免在还没有使用数据时就被覆盖
      // 不拿当前物品：使用前一个物品的价值数据
      // 拿当前物品：利用取上一个物品时可用重量为 (当前背包剩余的重量 - 当前物品的重量)价值的最优解 + 当前物品的价值
      dp[j] = Math.max(dp[j], dp[j - wi] + vi)
    }
  }
  // console.log(dp)
  return dp[m]
}

// console.log(fun(), fun2(), fun3())

/**
 * 完全背包问题
 * @param {*} arr  重量 价值
 * @param {*} n    n件物品
 * @param {*} m    背包的最大承受重量
 * 每一件物品可以拿多个(无限件)， 求满足条件时的最大价值
 */
// 二维dp 三重for循环包含k个的循环
const completeFun = (arr = [[3, 5], [1, 2], [2, 3], [1, 5], [2, 1]], n = 5, m = 15) => {
  let dp = new Array(n + 1).fill('').map(item => new Array(m + 1).fill(0))
  const l = arr.length
  for (let i = 1; i <= n; i++) {
    if (i > l) { dp[i] = dp[i - 1]; continue }
    let cur = arr[i - 1], wi = cur[0], vi = cur[1]
    for (let j = 1; j <= m; j++) {
      if (j < wi) {
        dp[i][j] = dp[i - 1][j]
      } else {
        // 每件物品可以拿多个,最大值为j/wi
        for (let k = 0; k <= j / wi; k++)
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - k * wi] + k * vi)
      }
    }
  }
  return dp[n][m]
}
// 二维dp 两重for循环
const completeFun2 = (arr = [[3, 5], [1, 2], [2, 3], [1, 5], [2, 1]], n = 5, m = 15) => {
  let dp = new Array(n + 1).fill('').map(item => new Array(m + 1).fill(0))
  const l = arr.length
  for (let i = 1; i <= n; i++) {
    if (i > l) { dp[i] = dp[i - 1]; continue }
    let cur = arr[i - 1], wi = cur[0], vi = cur[1]
    for (let j = 1; j <= m; j++) {
      if (j < wi) {
        dp[i][j] = dp[i - 1][j]
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - wi] + vi)
      }
    }
  }
  return dp[n][m]
}

// 一维dp 两重for循环 注意：完全背包问题和0/1背包问题，j的遍历顺序，
// 0/1背包：一维dp 从后往前遍历
// 完全背包：一维dp 从前往后遍历

// 一维dp 三重for循环
const completeFun3 = (arr = [[3, 5], [1, 2], [2, 3], [1, 5], [2, 1]], n = 5, m = 15) => {
  let dp = new Array(m + 1).fill(0)
  const l = arr.length

  for (let i = 1; i <= n; i++) {
    if (i > l) break
    let cur = arr[i - 1], wi = cur[0], vi = cur[1]
    for (let j = 1; j <= m; j++) {
      if (j < wi) {
        dp[j] = dp[j]
      } else {
        for (let k = 0; k <= j / wi; k++)
          dp[j] = Math.max(dp[j], dp[j - k * wi] + k * vi)
      }
    }
  }
  return dp[m]
}
// 一维dp 两重for循环
const completeFun4 = (arr = [[3, 5], [1, 2], [2, 3], [1, 5], [2, 1]], n = 5, m = 15) => {
  let dp = new Array(m + 1).fill(0)
  const l = arr.length
  for (let i = 1; i <= n; i++) {
    if (i > l) break
    let cur = arr[i - 1], wi = cur[0], vi = cur[1]
    for (let j = 1; j <= m; j++) {
      if (j < wi) {
        dp[j] = dp[j]
      } else {
        dp[j] = Math.max(dp[j], dp[j - wi] + vi)
      }
    }
  }
  return dp[m]
}
// 一维dp 两重for循环最优
const completeFun5 = (arr = [[3, 5], [1, 2], [2, 3], [1, 5], [2, 1]], n = 5, m = 15) => {
  let dp = new Array(m + 1).fill(0)
  const l = arr.length
  for (let i = 1; i <= n; i++) {
    if (i > l) break
    let cur = arr[i - 1], wi = cur[0], vi = cur[1]
    for (let j = wi; j <= m; j++) {
      // 已经压缩过了，直接利用上一行的数据
      dp[j] = Math.max(dp[j], dp[j - wi] + vi)
    }
  }
  return dp[m]
}

// console.log(completeFun(), completeFun2(), completeFun3(), completeFun4(), completeFun5())

/**
 * 多重背包问题
 * @param {*} arr  重量 价值
 * @param {*} n    n件物品
 * @param {*} m    背包的最大承受重量
 * 每一件物品有s个(有限件)， 求满足条件时的最大价值
 */
const multipleFun = (arr = [[3, 5, 3], [1, 2, 4], [2, 3, 3], [1, 5, 1], [2, 1, 3]], n = 5, m = 15) => {
  let dp = new Array(m + 1).fill(0)
  const l = arr.length
  for (let i = 1; i <= n; i++) {
    if (i > l) break
    let cur = arr[i - 1], wi = cur[0], vi = cur[1], si = cur[2]
    // 注意从后往前遍历
    for (let j = m; j >= 1; j--) {
      // 已经压缩过了，直接利用上一行的数据,所以j需要从后往前遍历
      for (let k = 0; k <= si && k <= j / wi; k++) {
        dp[j] = Math.max(dp[j], dp[j - k * wi] + k * vi)
      }
    }
  }
  return dp[m]
}
console.log(multipleFun())
// 思考si 非常大时 如何优化，二进制优化？？？？
/**
* 二维费用背包问题
 * @param {*} arr  重量 价值
 * @param {*} n    n件物品
 * @param {*} m    背包的最大承受重量
*/