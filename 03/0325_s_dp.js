/**
 * 53. 最大子序和
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
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
