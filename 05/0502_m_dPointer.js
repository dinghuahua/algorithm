/**
 * 209. 长度最小的子数组
 * 如果你已经实现 O(n) 时间复杂度的解法, 请尝试设计一个 O(n log(n)) 时间复杂度的解法。
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
// 如何优化，写的有点复杂
// 复杂度？？？
var minSubArrayLen = function (target, nums) {
  let num = Infinity,
    left = 0,
    right = 0,
    sum = 0,
    preR = 0

  for (; right < nums.length; ) {
    // console.log('pre', preR);
    ;(preR !== right || right === 0) && (sum += nums[right])
    if (sum < target) {
      preR = right
      right++
    } else {
      num = Math.min(num, right - left + 1)
      if (left === right) {
        // console.log('1',left, right,sum)
        sum -= nums[left]
        preR = right
        left++
        right++
      } else if (left < right) {
        // console.log('2',left, right,sum)
        sum -= nums[left]
        preR = right
        left++
      }
    }
  }
  return num === Infinity ? 0 : num
}
// 题解
// 暴力 为什么不超时
var minSubArrayLen = function (target, nums) {
  let n = nums.length
  if (n == 0) {
    return 0
  }
  let ans = Infinity
  for (let i = 0; i < n; i++) {
    let sum = 0
    for (let j = i; j < n; j++) {
      sum += nums[j]
      if (sum >= target) {
        ans = Math.min(ans, j - i + 1)
        break
      }
    }
  }
  return ans == Infinity ? 0 : ans
}
// 前缀和+二分
var minSubArrayLen = function (target, nums) {
  let n = nums.length
  if (n == 0) {
    return 0
  }
  let ans = Infinity
  let sums = new Array(n + 1)
  // 为了方便计算，令 size = n + 1
  // sums[0] = 0 意味着前 0 个元素的前缀和为 0
  // sums[1] = A[0] 前 1 个元素的前缀和为 A[0]
  // 以此类推
  for (let i = 1; i <= n; i++) {
    sums[i] = sums[i - 1] + nums[i - 1]
  }
  // 二分查找大于等于某个数的第一个位置 ????
  const binarySearch = (a, l, r, target) => {
    let mid = -1,
      originL = l,
      originR = r
    while (l < r) {
      mid = (l + r) >> 1
      if (a[mid] < target) l = mid + 1
      else r = mid
    }

    return a[l] >= target ? l : -1
  }

  for (let i = 1; i <= n; i++) {
    let s = target + sums[i - 1]
    let bound = binarySearch(sums, s)
    if (bound < 0) {
      bound = -bound - 1
    }
    if (bound <= n) {
      ans = Math.min(ans, bound - (i - 1))
    }
  }
  return ans == Infinity ? 0 : ans
}

// 滑动窗口
var minSubArrayLen = function (target, nums) {
  let n = nums.length
  if (n == 0) {
    return 0
  }
  let ans = Infinity
  let start = 0,
    end = 0
  let sum = 0
  while (end < n) {
    sum += nums[end]
    while (sum >= target) {
      ans = Math.min(ans, end - start + 1)
      sum -= nums[start]
      start++
    }
    end++
  }
  return ans == Infinity ? 0 : ans
}
