/**
 * 532. 数组中的 k-diff 数对
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// [1,2,4,4,3,3,0,9,2,3] 3
// Map(6) { 1 => [ 4 ], 2 => [], 4 => [], 3 => [], 0 => [ 3 ], 9 => [] }
// 重复的
var findPairs = function (nums, k) {
  let map = new Map(),
    num = 0

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i] + k) && !map.get(nums[i] + k).includes(nums[i])) {
      num++
      let arr = map.get(nums[i] + k)
      arr.push(nums[i])
      map.set(nums[i] + k, arr)
    } else if (
      map.has(nums[i] - k) &&
      !map.get(nums[i] - k).includes(nums[i])
    ) {
      num++
      let arr = map.get(nums[i] - k)
      arr.push(nums[i])
      map.set(nums[i] - k, arr)
    }
    map.set(nums[i], [])
  }
  // console.log(map)
  return num
}

// 不知道错哪里了
// [6, 3, 5, 7, 2, 3, 3, 8, 2, 4],2
var findPairs = function (nums, k) {
  let map = new Map(),
    num = 0

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i] + k) && !map.get(nums[i] + k).includes(nums[i])) {
      num++

      let arr = map.get(nums[i] + k)
      arr.push(nums[i])
      map.set(nums[i] + k, arr)

      arr = map.get(nums[i]) || []
      !arr.includes(nums[i] + k) && arr.push(nums[i] + k)
      map.set(nums[i], arr)
    } else if (
      map.has(nums[i] - k) &&
      !map.get(nums[i] - k).includes(nums[i])
    ) {
      num++

      let arr = map.get(nums[i] - k)
      arr.push(nums[i])
      map.set(nums[i] - k, arr)

      arr = map.get(nums[i]) || []
      !arr.includes(nums[i] - k) && arr.push(nums[i] - k)
      map.set(nums[i], arr)
    }
    map.set(nums[i], map.get(nums[i]) || [])
  }
  // console.log(map)
  return num
}

// 题解
var findPairs = function (nums, k) {
  if (nums.length < 2) return 0
  nums.sort((a, b) => a - b)
  let count = 0
  for (let i = 0; i < nums.length - 1; i++) {
    //这条判断语句很重要
    if (i >= 1 && nums[i] === nums[i - 1]) continue
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] - k > nums[i]) {
        break
      }
      if (nums[j] - k == nums[i]) {
        count++
        break
      }
    }
  }
  return count
}

// 题解 O(n)复杂度 没看懂
