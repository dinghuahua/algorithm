/**
 * 53. 最大子序和
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArrayError = function (nums) {
  let max = nums.reduce((a, b) => a + b, 0)

  for (var i = 0, j = nums.length - 1; i < j; ) {
    console.log(i, j)
    if (nums[i] > nums[j]) {
      max = Math.max(max, max - nums[j])
      j--
    } else {
      max = Math.max(max, max - nums[i])
      i++
    }
  }
  return max
}

var maxSubArray2 = function (nums) {
  const l = nums.length
  let dp = nums[0]
  let max = -Infinity
  for (let i = 1; i < l; i++) {
    if (dp < 0) {
      dp = nums[i]
    } else {
      dp += nums[i]
    }
    max = Math.max(max, dp)
  }
  return max
}

var maxSubArray3 = function (nums) {
  const l = nums.length
  let dp = nums[0]
  let max = nums[0]
  for (let i = 1; i < l; i++) {
    if (dp < 0) {
      dp = nums[i]
    } else {
      dp += nums[i]
    }
    max = Math.max(max, dp)
  }
  return max
}

var maxSubArray4 = function (nums) {
  let max = -Infinity,
    pre = 0

  for (var i = 0; i < nums.length; i++) {
    pre = Math.max(pre + nums[i], nums[i])
    max = Math.max(max, pre)
  }
}
