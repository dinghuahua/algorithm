/**
 * 1403. 非递增顺序的最小子序列
 * @param {number[]} nums
 * @return {number[]}
 */
var minSubsequence = function (nums) {
  if (nums.length === 1) return nums
  const len = nums.length
  let sortNums = nums.sort((a, b) => a - b)
  const allSum = sortNums.reduce((a, b) => a + b, 0)
  // 前缀和
  let frontSum = allSum,
    // 尾缀和
    behindSum = 0

  for (let i = len - 1; i >= 0; i--) {
    frontSum = frontSum - nums[i]
    behindSum = behindSum + nums[i]
    if (frontSum < behindSum) {
      return sortNums.slice(i).reverse()
    }
  }
}
var minSubsequence2 = function (nums) {
  if (nums.length === 1) return nums
  let sortNums = nums.sort((a, b) => a - b)
  const allSum = sortNums.reduce((a, b) => a + b, 0)
  // 尾缀和
  let behindSum = 0
  const res = []
  //  while (behindSum <= allSum/2) {
  while (behindSum <= allSum - behindSum) {
    const last = nums.pop()
    res.push(last)
    behindSum += last
  }
  return res
}

/**
 * 1217. 玩筹码
 * @param {number[]} position
 * @return {number}
 */
var minCostToMoveChipsError = function (position) {
  // 1 2 3 4 === 3:2
  // 1 2 3 4 5 6 === 6:3
  // 1 2 3 4 5 6 7 === 4:4  5:3 6:4 7:3

  // if(position.length === 1) return 0
  // if(position.length === 2 || position.length === 3) return 1
  return ~~(position.length / 2)
}
var minCostToMoveChips = function (position) {
  const len = position.length
  //  偶数位置 奇数位置
  let v0 = 0,
    v1 = 0
  for (let i = 0; i < len; i++) {
    if (position[i] % 2) {
      // 奇数位置筹码
      ++v1
    } else ++v0
  }

  // return Math.min(v0, v1)
  return v0 > v1 ? v1 : v0
}

/**
 * 1518. 换酒问题
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var numWaterBottles = function (numBottles, numExchange) {
  let empty = 0,
    all = 0
  while (numBottles + empty >= numExchange) {
    // 先喝掉全部的酒
    all += numBottles
    // 之前剩余的的空酒瓶 + 当次喝过后增加的空酒瓶
    empty += numBottles
    // 空酒瓶兑换可以喝的酒
    numBottles = ~~(empty / numExchange)
    // 不能够全部兑换完，剩余的空酒瓶
    empty = empty % numExchange
  }
  return all + numBottles
}

/**
 * 1725. 可以形成最大正方形的矩形数目
 * @param {number[][]} rectangles
 * @return {number}
 */
var countGoodRectangles = function (rectangles) {
  let k = 0,
    maxLen = 0

  for (let i = 0; i < rectangles.length; i++) {
    let [l, w] = rectangles[i]
    const min = Math.min(l, w)
    if (k === min) ++maxLen
    if (k < min) {
      k = min
      maxLen = 1
    }
  }
  return maxLen
}

/**
 * 122. 买卖股票的最佳时机 II
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let sum = 0

  prices.slice(1).reduce((pre, cur) => {
    if (cur > pre) sum += cur - pre
    return cur
  }, prices[0])
  return sum
}

/**
 * 874. 模拟行走机器人
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
// 不知道错在哪里了
var robotSimError = function (commands, obstacles) {
  const len = commands.length
  let map = new Map(),
    x = 0,
    y = 0,
    // 1面向北 2面向东 3面向南 4面向西
    d = 1
  for (let i = 0; i < obstacles.length; i++) {
    const [xi, yi] = obstacles[i]
    map.set(`${xi},${yi}`, true)
  }
  for (let i = 0; i < len; i++) {
    const step = commands[i]
    if (step === -2) {
      // 左转90
      if (d === 1) d = 4
      else if (d === 2) d = 1
      else if (d === 3) d = 2
      else if (d === 4) d = 3
    } else if (step === -1) {
      // 右转90
      if (d === 1) d = 2
      else if (d === 2) d = 3
      else if (d === 3) d = 4
      else if (d === 4) d = 1
    } else if (step >= 1 && step <= 9) {
      // 向前移动
      for (let j = 1; j <= step; j++) {
        // 1面向北 2面向东 3面向南 4面向西
        if (d === 1) {
          if (!map.has(`${x},${y + 1}`)) ++y
          else break
        }
        if (d === 2) {
          if (!map.has(`${x + 1},${y}`)) ++x
          else break
        }
        if (d === 3) {
          if (!map.has(`${x},${y - 1}`)) --y
          else break
        }
        if (d === 4) {
          if (!map.has(`${x - 1},${y}`)) --x
          else break
        }
      }
    }
    console.log(x, y)
  }
  return x * x + y * y
}
/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
// 最大值可能在中间的过程，不一定是在结束处
var robotSim2 = function (commands, obstacles) {
  const len = commands.length
  let map = new Map(),
    x = 0,
    y = 0,
    // 1面向北 2面向东 3面向南 4面向西
    d = 1
  max = 0
  for (let i = 0; i < obstacles.length; i++) {
    const [xi, yi] = obstacles[i]
    map.set(`${xi},${yi}`, true)
  }
  for (let i = 0; i < len; i++) {
    const step = commands[i]
    if (step === -2) {
      // 左转90
      if (d === 1) d = 4
      else if (d === 2) d = 1
      else if (d === 3) d = 2
      else if (d === 4) d = 3
    } else if (step === -1) {
      // 右转90
      if (d === 1) d = 2
      else if (d === 2) d = 3
      else if (d === 3) d = 4
      else if (d === 4) d = 1
    } else if (step >= 1 && step <= 9) {
      // 向前移动
      for (let j = 1; j <= step; j++) {
        // 1面向北 2面向东 3面向南 4面向西
        if (d === 1) {
          if (!map.has(`${x},${y + 1}`)) ++y
          else break
        }
        if (d === 2) {
          if (!map.has(`${x + 1},${y}`)) ++x
          else break
        }
        if (d === 3) {
          if (!map.has(`${x},${y - 1}`)) --y
          else break
        }
        if (d === 4) {
          if (!map.has(`${x - 1},${y}`)) --x
          else break
        }
      }
      max = Math.max(max, x * x + y * y)
    }
  }
  return max
}
var robotSim3 = function (commands, obstacles) {
  const len = commands.length,
    // 1面向北 2面向东 3面向南 4面向西
    // 调整方向：当前方向值 +5 取余数
    v = {
      '-2': -1,
      '-1': 1,
    },
    // 1面向北 2面向东 3面向南 4面向西
    // 0x轴下标 1y轴下标
    keyIndex = {
      // 北向前 y轴
      1: 1,
      // 东向前 X轴
      2: 0,
      // 南向前 y轴
      3: 1,
      // 西向前 X轴
      4: 0,
    },
    valuesIndex = {
      // 北向前 y轴+1
      1: 1,
      // 东向前 X轴+1
      2: 1,
      // 南向前 y轴-1
      3: -1,
      // 西向前 X轴-1
      4: -1,
    }
  let map = new Map(),
    x = 0,
    y = 0,
    // 1面向北 2面向东 3面向南 4面向西
    d = 1
  let position = [0, 0],
    max = 0
  for (let i = 0; i < obstacles.length; i++) {
    const [xi, yi] = obstacles[i]
    map.set(`${xi},${yi}`, true)
  }
  for (let i = 0; i < len; i++) {
    const step = commands[i]
    if (step === -2 || step === -1) {
      // 加5 是为了防止负数的情况 比如 (1-1)%5 最小值是1
      d = Math.max(1, (d + v[step] + 5) % 5)
      // d 从0 1 2 3 的话就是对4取余数
      // d = (d + v[step] + 4) % 4
    } else if (step >= 1 && step <= 9) {
      for (let j = 1; j <= step; j++) {
        // 根据方向获取对应xy轴   根据方向获取+-1
        position[keyIndex[d]] += valuesIndex[d]
        if (map.has(position.join())) {
          console.log(position)
          position[keyIndex[d]] -= valuesIndex[d]
          break
        }
        max = Math.max(max, position[0] * position[0] + position[1] * position[1])
      }
    }
  }
  return max
}

robotSim3(
  [
    1,
    2,
    -2,
    5,
    -1,
    -2,
    -1,
    8,
    3,
    -1,
    9,
    4,
    -2,
    3,
    2,
    4,
    3,
    9,
    2,
    -1,
    -1,
    -2,
    1,
    3,
    -2,
    4,
    1,
    4,
    -1,
    1,
    9,
    -1,
    -2,
    5,
    -1,
    5,
    5,
    -2,
    6,
    6,
    7,
    7,
    2,
    8,
    9,
    -1,
    7,
    4,
    6,
    9,
    9,
    9,
    -1,
    5,
    1,
    3,
    3,
    -1,
    5,
    9,
    7,
    4,
    8,
    -1,
    -2,
    1,
    3,
    2,
    9,
    3,
    -1,
    -2,
    8,
    8,
    7,
    5,
    -2,
    6,
    8,
    4,
    6,
    2,
    7,
    2,
    -1,
    7,
    -2,
    3,
    3,
    2,
    -2,
    6,
    9,
    8,
    1,
    -2,
    -1,
    1,
    4,
    7,
  ],[
    [-57, -58],
    [-72, 91],
    [-55, 35],
    [-20, 29],
    [51, 70],
    [-61, 88],
    [-62, 99],
    [52, 17],
    [-75, -32],
    [91, -22],
    [54, 33],
    [-45, -59],
    [47, -48],
    [53, -98],
    [-91, 83],
    [81, 12],
    [-34, -90],
    [-79, -82],
    [-15, -86],
    [-24, 66],
    [-35, 35],
    [3, 31],
    [87, 93],
    [2, -19],
    [87, -93],
    [24, -10],
    [84, -53],
    [86, 87],
    [-88, -18],
    [-51, 89],
    [96, 66],
    [-77, -94],
    [-39, -1],
    [89, 51],
    [-23, -72],
    [27, 24],
    [53, -80],
    [52, -33],
    [32, 4],
    [78, -55],
    [-25, 18],
    [-23, 47],
    [79, -5],
    [-23, -22],
    [14, -25],
    [-11, 69],
    [63, 36],
    [35, -99],
    [-24, 82],
    [-29, -98],
    [-50, -70],
    [72, 95],
    [80, 80],
    [-68, -40],
    [65, 70],
    [-92, 78],
    [-45, -63],
    [1, 34],
    [81, 50],
    [14, 91],
    [-77, -54],
    [13, -88],
    [24, 37],
    [-12, 59],
    [-48, -62],
    [57, -22],
    [-8, 85],
    [48, 71],
    [12, 1],
    [-20, 36],
    [-32, -14],
    [39, 46],
    [-41, 75],
    [13, -23],
    [98, 10],
    [-88, 64],
    [50, 37],
    [-95, -32],
    [46, -91],
    [10, 79],
    [-11, 43],
    [-94, 98],
    [79, 42],
    [51, 71],
    [4, -30],
    [2, 74],
    [4, 10],
    [61, 98],
    [57, 98],
    [46, 43],
    [-16, 72],
    [53, -69],
    [54, -96],
    [22, 0],
    [-7, 92],
    [-69, 80],
    [68, -73],
    [-24, -92],
    [-21, 82],
    [32, -1],
    [-6, 16],
    [15, -29],
    [70, -66],
    [-85, 80],
    [50, -3],
    [6, 13],
    [-30, -98],
    [-30, 59],
    [-67, 40],
    [17, 72],
    [79, 82],
    [89, -100],
    [2, 79],
    [-95, -46],
    [17, 68],
    [-46, 81],
    [-5, -57],
    [7, 58],
    [-42, 68],
    [19, -95],
    [-17, -76],
    [81, -86],
    [79, 78],
    [-82, -67],
    [6, 0],
    [35, -16],
    [98, 83],
    [-81, 100],
    [-11, 46],
    [-21, -38],
    [-30, -41],
    [86, 18],
    [-68, 6],
    [80, 75],
    [-96, -44],
    [-19, 66],
    [21, 84],
    [-56, -64],
    [39, -15],
    [0, 45],
    [-81, -54],
    [-66, -93],
    [-4, 2],
    [-42, -67],
    [-15, -33],
    [1, -32],
    [-74, -24],
    [7, 18],
    [-62, 84],
    [19, 61],
    [39, 79],
    [60, -98],
    [-76, 45],
    [58, -98],
    [33, 26],
    [-74, -95],
    [22, 30],
    [-68, -62],
    [-59, 4],
    [-62, 35],
    [-78, 80],
    [-82, 54],
    [-42, 81],
    [56, -15],
    [32, -19],
    [34, 93],
    [57, -100],
    [-1, -87],
    [68, -26],
    [18, 86],
    [-55, -19],
    [-68, -99],
    [-9, 47],
    [24, 94],
    [92, 97],
    [5, 67],
    [97, -71],
    [63, -57],
    [-52, -14],
    [-86, -78],
    [-17, 92],
    [-61, -83],
    [-84, -10],
    [20, 13],
    [-68, -47],
    [7, 28],
    [66, 89],
    [-41, -17],
    [-14, -46],
    [-72, -91],
    [4, 52],
    [-17, -59],
    [-85, -46],
    [-94, -23],
    [-48, -3],
    [-64, -37],
    [2, 26],
    [76, 88],
    [-8, -46],
    [-19, -68]
  ]
)
/**
 * 860. 柠檬水找零
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
  // 5 10 20 剩余的数量
  let arr = [0, 0, 0]

  for (let i = 0; i < bills.length; i++) {
    const cur = bills[i]
    if (cur === 5) ++arr[0]
    if (cur === 10) {
      if (!arr[0]) return false
      else {
        --arr[0]
        ++arr[1]
      }
    }
    if (cur === 20) {
      if (arr[1] && arr[0]) {
        --arr[0]
        --arr[1]
        ++arr[2]
      } else if (!arr[1] && arr[0] >= 3) {
        arr[0] -= 3
        ++arr[2]
      } else {
        return false
      }
    }
    // console.log(arr)
  }
  return true
}

/**
 * 944. 删列造序
 * @param {string[]} strs
 * @return {number}
 */
/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function (strs) {
  const len = strs.length,
    col = strs[0].length
  let num = 0
  for (let c = 0; c < col; c++) {
    let pre = 'a'
    for (let n = 0; n < len; n++) {
      const s = strs[n][c]
      if (s < pre) {
        ++num
        break
      }
      pre = s
    }
  }
  return num
}

/**
 * 1758. 生成交替二进制字符串的最少操作数
 * @param {string} s
 * @return {number}
 */
/**
 * @param {string} s
 * @return {number}
 */
var minOperations = function (s) {
  let num1 = 0,
    pre1 = s[0],
    num2 = 0,
    pre2 = +!+s[0] + ''

  // 比较 0101 1010 交换次数的大小
  // "110010"
  //  101010
  // "10010100"
  //  10101010
  //  01010101
  for (let i = 1; i < s.length; i++) {
    if (s[i] === pre1) {
      num1++
      pre1 = +!+pre1 + ''
    } else pre1 = s[i]
  }

  for (let i = 0; i < s.length; i++) {
    console.log(i, s[i], pre2)
    if (s[i] !== pre2) {
      num2++
      pre2 = s[i]
    } else pre2 = +!+pre2 + ''
  }
  // console.log(num1,num2)
  return Math.min(num1, num2)
}
var minOperations2 = function (s) {
  const l = s.length
  // 0的数量
  let c0 = 0
  //奇数位上0的数量
  let position = 0
  for (let i = 0; i < l; i++) {
    if (i === '0') {
      c0++
      if (i % 2) {
        position++
      }
    }
  }
  // s中奇数位置的个数
  const odd = ~~(l / 2)
  // s中偶数位置的个数
  const even = ~~((l + 1) / 2)
  // 最终结果为：奇数位置0偶数位置1 = 奇数位置1的数量+偶数位置0的数量
  let pattern1 = 0
  // 奇数位置上的1
  pattern1 += odd - position
  // 偶数位置上的0
  pattern1 += c0 - position
  // 最终结果为：奇数位置1偶数位置0 = 奇数位置0的数量+偶数位置1的数量
  let patter2 = 0
  // 奇数位置0的数量
  patter2 += position
  // 偶数位置的个数 - (偶数位置0的数量) = 偶数位置1的数量
  patter2 += even - (c0 - position)
  return Math.min(patter2, pattern1)
}
/**
 * 1710. 卡车上的最大单元数
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
// 不知道错哪了 不是动态规划，每一类箱子可以不用拿完
var maximumUnitsError = function (boxTypes, truckSize) {
  let len = boxTypes.length
  // 第i个箱子可用箱子容量为j的最大单元总数
  let dp = new Array(len + 1)
    .fill(0)
    .map((_) => new Array(truckSize + 1).fill(0))

  // 第i类箱子
  for (let i = 1; i <= len; i++) {
    const [num, unit] = boxTypes[i - 1]
    // 可用箱子数量
    for (let j = 1; j <= truckSize; j++) {
      // 取当前箱子的数量
      for (let k = 0; k <= num && k <= j; k++) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - k] + k * unit)
      }
    }
  }
  console.log(dp)
  return dp[len][truckSize]
}

var maximumUnits = function (boxTypes, truckSize) {
  boxTypes.sort((a, b) => {
    return b[1] - a[1]
  })
  let c = 0
  while (truckSize > 0 && boxTypes.length) {
    if (boxTypes[0][0] >= truckSize) {
      c += truckSize * boxTypes[0][1]
      truckSize = 0
    } else {
      c += boxTypes[0][0] * boxTypes[0][1]
      truckSize -= boxTypes[0][0]
      boxTypes.shift()
    }
  }
  return c
}
