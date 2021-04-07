/**
 * 455. 分发饼干
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
  g = g.sort((a, b) => a - b)
  s = s.sort((a, b) => a - b)
  let max = 0

  while (s.length && g.length) {
    if (s[0] >= g[0]) {
      max++
      s.shift()
      g.shift()
    } else {
      s.shift()
    }
  }
  return max
}

/**
 * 1716. 计算力扣银行的钱
 * @param {number} n
 * @return {number}
 */
var totalMoney = function (n) {
  let p = ~~(n / 7),
    sum = 0

  sum += 28 * p
  // 整7个
  for (let i = 0; i < p; i++) {
    sum += i * 7
  }
  // 余数
  for (let i = 0; i < n % 7; i++) {
    sum += p + 1 + i
  }
  return sum
}

/**
 * 1046. 最后一块石头的重量
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  stones.sort((a, b) => b - a)

  while (stones.length > 1) {
    let one = stones.shift(),
      second = stones.shift()

    if (one !== second) {
      stones.push(Math.abs(one - second))
      stones.sort((a, b) => b - a)
    }
  }
  return stones.length ? stones[0] : 0
}

/**
 * 1005. K 次取反后最大化的数组和
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var largestSumAfterKNegations = function (A, K) {
  A.sort((a, b) => a - b)

  while (K) {
    if (A[0] < 0) {
      A[0] = -A[0]
      // 尽量不要频繁的排序
      A = A.sort((a, b) => a - b)
    } else if (A[0] === 0) {
      break
    } else {
      A[0] = -A[0]
    }
    K--
  }
  return A.reduce((pre, i) => pre + i, 0)
}

var largestSumAfterKNegations2 = function (A, K) {
  A.sort((a, b) => a - b);
  // <0集合
  const left = [];
  // >=0集合
  const right = [];
  for (const n of A) {
    if (n < 0) {
      left.push(n);
    } else {
      right.push(n);
    }
  }
  // 先把负数取反为正数
  while (left.length && k) {
    right.push(-1 * left.shift());
    k--;
  }
  if (!k) return [...right, ...left].reduce((a, b) => a + b, 0);
  // k为偶数 只对其中一个数字反复取反
  if (!(k % 2)) return right.reduce((a, b) => a + b, 0);
  let min = -1;
  // 还剩余奇数次取反操作 找到最小值
  for (const i of right) {
    if (i > min) {
      min = i;
    }
  }

  return right.reduce((a, b) => a + b, 0) - 2 * min;
};
/**
 * 1736. 替换隐藏数字得到的最晚时间
 * @param {string} time
 * @return {string}
 */
var maximumTime = function (time) {
  const arr = time.split(':')
  if (arr[0][0] === '?') {
    if (arr[0][1] > 3) arr[0] = '1' + arr[0][1]
    else if (arr[0][1] === '?') arr[0] = '23'
    else arr[0] = '2' + arr[0][1]
  } else if (arr[0][0] === '0' || arr[0][0] === '1') {
    if (arr[0][1] === '?') arr[0] = arr[0][0] + '9'
  } else {
    if (arr[0][1] === '?') arr[0] = '23'
  }

  if (arr[1][0] === '?') {
    if (arr[1][1] === '?') arr[1] = '59'
    else arr[1] = '5' + arr[1][1]
  } else {
    if (arr[1][1] === '?') arr[1] = arr[1][0] + '9'
  }
  return arr.join(':')
}

var maximumTime2 = function (time) {
  // ?号情况下根据后一位获取对应的值
  // 根据h2得到h1
  const h1 = {
    '?': 2,
    0: 2,
    1: 2,
    2: 2,
    3: 2,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
    8: 1,
    9: 1,
  },
    // 根据h1得到h2
    h2 = {
      0: 9,
      1: 9,
      2: 3,
    },
    // 根据m2得到m2
    m1 = {
      '?': 5,
      0: 5,
      1: 5,
      2: 5,
      3: 5,
      4: 5,
      5: 5,
      6: 5,
      7: 5,
      8: 5,
      9: 5,
    },
    m2 = {
      0: 9,
      1: 9,
      2: 9,
      3: 9,
      4: 9,
      5: 9,
    }

  // 01:34
  if (time[0] === '?') {
    time = h1[time[1]] + time.slice(1)
  }
  if (time[1] === '?') {
    time = time.slice(0, 1) + h2[time[0]] + time.slice(2)
  }
  if (time[3] === '?') {
    time = time.slice(0, 3) + m1[time[4]] + time.slice(4)
  }
  if (time[4] === '?') {
    time = time.slice(0, 4) + m2[time[3]]
  }
  return time
}
