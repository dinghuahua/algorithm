/**
 * 5726. 数组元素积的符号
 * @param {number[]} nums
 * @return {number}
 */
var arraySign = function (nums) {
  let l = nums.length
  let v = false
  for (let i = 0; i < l; i++) {
    if (nums[i] < 0) v = !v
    if (nums[i] === 0) return 0
  }
  return v ? -1 : 1
}

/**
 * 5727. 找出游戏的获胜者
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findTheWinner = function (n, k) {
  //0 1 2
  const createNode = function (val) {
    this.val = val
    this.next = null
  }
  let head = { next: null },
    pre = head
  for (let i = 1; i <= n; i++) {
    let cur = new createNode(i)
    pre.next = cur
    pre = cur
  }
  pre.next = head.next

  let node = head.next,
    num = 1

  while (node.next !== node) {
    if (num === k) {
      node.val = node.next.val
      node.next = node.next.next
      // 重置
      num = 0
    } else {
      node = node.next
    }
    num++
  }
  return node.val
}

/**
 * 5728. 最少侧跳次数
 * @param {number[]} obstacles
 * @return {number}
 */
var minSideJumpsError = function (obstacles) {
  let num = 0,
    l = obstacles.length,
    // 下标位置对应跑道最少侧跳次数
    dp = new Array(l).fill(0).map(_=>new Array(3).fill(0))
 
  for (let i = 1; i < l; i++) {
    for (let j = 0; j < 3; j++) {
      if (obstacles[i][j]) {
        dp[i][j] = Infinity
      } else {
        dp[i][j] = dp[i][j]
      }
    }
  }
}
var minSideJumps2Error = function (obstacles) {
  let num = 0,
    l = obstacles.length,
    // 下标位置最少侧跳次数
    dp = new Array(l).fill(0)

  let way = 1
  for (let i = l-1; i >=0; i--) {
    // for (let j = 0; j < 3; j++) {
    //   if (obstacles[i][j]) {
    //     dp[i][j] = Infinity
    //   } else {
    //   }
    // }
    if (obstacles[i][way]) {
      
    } dp[i] = dp[i - 1][j]
  }
}
var minSideJumps = function (obstacles) {
  const l = obstacles.length
  //res[0,1,2]表示对应赛道到达某个点时的横跳次数
  //压缩了一下
  const res = [1, 0, 1]
  for (let i = 1; i < l; i++) {
    //先将障碍物所在的赛道的值设置为一个不可能的值
    if (obstacles[i] !== 0) {
      res[obstacles[i] - 1] = l + 2
    }
    //如果当前赛道的当前点没有障碍物，那么计算从当前赛道前一个位置过来或者从另一个赛道横跳过来
    if (obstacles[i] !== 1) {
      res[0] = Math.min(res[0], res[1] + 1, res[2] + 1)
    }
    if (obstacles[i] !== 2) {
      res[1] = Math.min(res[0] + 1, res[1], res[2] + 1)
    }
    if (obstacles[i] !== 3) {
      res[2] = Math.min(res[0] + 1, res[1] + 1, res[2])
    }
  }
  return Math.min(...res)
}