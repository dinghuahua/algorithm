/**
 * 16. 最接近的三数之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  let map = new Map(),
    l = nums.length,
    min = Infinity

  nums.sort((a, b) => a - b)
  for (let i = 0; i < l; i++) {
    if (i >= 1 && nums[i] === nums[i - 1]) continue
    // 会遗留一些可枚举的情况
    for (let j = i + 1; j < l - 1; j++) {
      const sum = nums[i] + nums[j] + nums[j + 1],
        diff = Math.abs(sum - target)
      console.log(nums[i], nums[j], nums[j + 1])
      min = Math.min(min, diff)
      map.set(diff, sum)
    }
  }
  // console.log(map)
  return map.get(min)
}
