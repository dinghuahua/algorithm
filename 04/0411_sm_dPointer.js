/**
 * 26. 删除有序数组中的重复项
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let pre = Infinity

  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === pre) nums.splice(i, 1)
    pre = nums[i]
  }
  return nums.length
}

/**
 * 88. 合并两个有序数组
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  nums1.splice(m, nums1.length - m, ...nums2)
  nums1.sort((a, b) => a - b)
}

/**
 * 349. 两个数组的交集
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  let set1 = new Set(nums1),
    set2 = new Set(nums2)
  let intersect = Array.from(set2).filter((x) => set1.has(x))

  return intersect
}

/**
 * 350. 两个数组的交集 II
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  let map1 = new Map(),
    res = []

  for (let i = 0; i < nums1.length; i++) {
    if (!map1.has(nums1[i])) map1.set(nums1[i], [])
    let arr = map1.get(nums1[i])
    arr.push(i)
    map1.set(nums1[i], arr)
  }
  for (let i = 0; i < nums2.length; i++) {
    if (map1.get(nums2[i])) {
      res.push(nums2[i])
      if (map1.get(nums2[i]).length === 1) {
        map1.delete(nums2[i])
      } else {
        map1.get(nums2[i]).pop()
      }
    }
  }
  // console.log(map1,res)

  return res
}

/**
 * 无重复字符的最长子串
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let map = new Map(),
    max = 0,
    start = 0

  for (let i = 0; i < s.length; i++) {
    if (!map.has(s[i])) map.set(s[i], i)
    else {
      max = Math.max(max, i - start)
      start = map.get(s[i]) + 1
      for (const [c, index] of map.entries()) {
        index < start && map.delete(c)
      }
      map.set(s[i], i)
    }
  }

  return Math.max(max, map.size)
}
var lengthOfLongestSubstring2 = function (s) {
  let map = new Map(),
    max = 0

  for (let i = 0; i < s.length; i++) {
    if (!map.has(s[i])) map.set(s[i], i)
    else {
      max = Math.max(max, map.size)
      for (const [c, index] of map.entries()) {
        index < map.get(s[i]) + 1 && map.delete(c)
      }
      map.set(s[i], i)
    }
  }

  return Math.max(max, map.size)
}
