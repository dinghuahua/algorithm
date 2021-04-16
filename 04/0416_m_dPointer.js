/**
 * 75. 颜色分类
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  nums.sort((a, b) => a - b)
}
// 题解 遍历两遍
var sortColors2 = function (nums) {
  let n = nums.length
  let ptr = 0
  for (let i = 0; i < n; ++i) {
    if (nums[i] == 0) {
      let temp = nums[i]
      nums[i] = nums[ptr]
      nums[ptr] = temp
      ++ptr
    }
  }
  for (let i = ptr; i < n; ++i) {
    if (nums[i] == 1) {
      let temp = nums[i]
      nums[i] = nums[ptr]
      nums[ptr] = temp
      ++ptr
    }
  }
}
// 遍历一遍
var sortColors3 = function (nums) {
  let n = nums.length
  let p0 = 0,
    p1 = 0
  for (let i = 0; i < n; ++i) {
    if (nums[i] == 1) {
      // let temp = nums[i]
      // nums[i] = nums[p1]
      // nums[p1] = temp
      ;[nums[i], nums[p1]] = [nums[p1], nums[i]]
      ++p1
    } else if (nums[i] == 0) {
      // let temp = nums[i]
      // nums[i] = nums[p0]
      // nums[p0] = temp
      ;[nums[i], nums[p0]] = [nums[p0], nums[i]]
      if (p0 < p1) {
        // temp = nums[i]
        // nums[i] = nums[p1]
        // nums[p1] = temp

        ;[nums[i], nums[p1]] = [nums[p1], nums[i]]
      }
      ++p0
      ++p1
    }
  }
}

/**
 * 80. 删除有序数组中的重复项 II
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let index = 0,
    pre = nums[index++],
    num = 1
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === pre && num < 2) {
      num++
      nums[index++] = nums[i]
    } else if (nums[i] !== pre) {
      num = 1
      pre = nums[i]
      nums[index++] = nums[i]
    }
  }
  return index
}

// 题解
var removeDuplicates = function (nums) {
  const n = nums.length
  if (n <= 2) {
    return n
  }
  let slow = 2,
    fast = 2
  while (fast < n) {
    if (nums[slow - 2] != nums[fast]) {
      nums[slow] = nums[fast]
      ++slow
    }
    ++fast
  }
  return slow
}
