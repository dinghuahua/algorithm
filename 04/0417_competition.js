/**
 * 1827. 最少操作使数组递增
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  // let num = 0,
  //   pre = nums[0]

  // for (let i = 1; i < nums.length; i++) {
  //   let min = pre + 1
  //   if (nums[i] < min) {
  //     num += min - nums[i]
  //   }
  //   pre = Math.max(nums[i], min)
  // }
  // return num

  let c = 0
  for (let i = 1; i < nums.length; i++) {
    c += Math.max(0, nums[i - 1] + 1 - nums[i])
    nums[i] = Math.max(nums[i], nums[i - 1] + 1)
  }
  return c
}

/**
 * 1828. 统计一个圆中点的数目
 * @param {number[][]} points
 * @param {number[][]} queries
 * @return {number[]}
 */
var countPoints = function (points, queries) {
  let ans = []
  for (let i = 0; i < queries.length; i++) {
    const [xc, yc, r] = queries[i]
    let num = 0
    for (let j = 0; j < points.length; j++) {
      const [x, y] = points[j]
      if ((xc - x) * (xc - x) + (yc - y) * (yc - y) <= r * r) {
        num++
      }
    }
    ans.push(num)
  }
  return ans
}

var countPoints = function (points, queries) {
  return queries.map((item) => {
    const [xc, yc, r] = item
    return points.filter((it) => {
      const [x, y] = it
      return (xc - x) * (xc - x) + (yc - y) * (yc - y) <= r * r
    }).length
  })
}

/**
 * 5719. 每个查询的最大异或值
 * @param {number[]} nums
 * @param {number} maximumBit
 * @return {number[]}
 */
var getMaximumXor = function (nums, maximumBit) {
  // 如果a、b两个值不相同，则异或结果为1。如果a、b两个值相同，异或结果为0
  //所有元素的异或结果
  let pre = nums.reduce((pre, item) => pre ^ item, 0)
  const res = []
  // a^b=c
  // a=c^b
  while (nums.length) {
    const str = pre.toString(2)
    const l = str.length
    const max = Number.parseInt('1'.repeat(maximumBit), 2)
    //每次计算之后删除最后一项
    let n = pre
    if (maximumBit < l) {
      n = Number.parseInt(str.slice(l - maximumBit), 2)
    }
    res.push(max ^ n)
    pre ^= nums.pop()
  }
  return res
}
