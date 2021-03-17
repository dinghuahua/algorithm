/**
 * 11. 盛最多水的容器
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let max = 0

  for (var i = 0, j = height.length - 1; i < j; ) {
    var heightI = height[i],
      heightJ = height[j]

    max = Math.max(max, (j - i) * Math.min(heightI, heightJ))
    if (heightI <= heightJ) ++i
    if (heightI > heightJ) --j
  }
  return max
}
var maxArea2 = function (height) {
  let max = 0,
    i = 0,
    j = height.length - 1

  while (i < j) {
    var heightI = height[i],
      heightJ = height[j]

    max = Math.max(max, (j - i) * Math.min(heightI, heightJ))
    if (heightI <= heightJ) ++i
    if (heightI > heightJ) --j
  }
  return max
}

var maxArea2 = function (height) {
  let max = 0
  const fn = (nums) => {
    if (nums.length <= 1) return 
    else {
      var i = 0,
        j = nums.length - 1,
        heightI = nums[i],
        heightJ = nums[j]

      max = Math.max(max, (nums.length - 1) * Math.min(heightI, heightJ))
      if (heightI <= heightJ) ++i
      if (heightI > heightJ) --j
      return fn(nums.slice(i, j + 1))
    }
  }
  fn(height)
  return max
}

var maxArea3 = function (height) {
  const fn = (nums, pre) => {
    if (nums.length <= 1) return pre
    else {
      var i = 0,
        j = nums.length - 1,
        heightI = nums[i],
        heightJ = nums[j]

      pre = Math.max(pre, (nums.length - 1) * Math.min(heightI, heightJ))
      if (heightI <= heightJ) ++i
      if (heightI > heightJ) --j
      return fn(nums.slice(i, j + 1), pre)
    }
  }
  return fn(height, 0)
}