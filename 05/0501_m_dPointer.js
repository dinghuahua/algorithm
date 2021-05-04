/**
 * 1004. 最大连续1的个数 III
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 如何优化，写的有点复杂
var longestOnes = function (nums, k) {
  if (nums.length <= 1) return k >= 0 ? 1 : nums[0]

  let left = 0,
    right = 0,
    num = 0,
    max = 0

  for (; right < nums.length; ) {
    !nums[right] && ++num

    if (num <= k) {
      max = Math.max(max, right - left + 1)
      right++
    } else {
      max = Math.max(max, right - left)
      // console.log(left,right,max)
      !nums[left] && --num
      left++
      right++
    }
  }
  return max
}
