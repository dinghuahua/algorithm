/**
 * 1248. 统计「优美子数组」
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numberOfSubarraysError = function (nums, k) {
  let odd = []
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2) odd.push(i)
  }
  if (odd.length < k) return 0
  console.log(odd)

  let first = 0,
    last = k - 1,
    pre = odd[last],
    num = 0
  for (; last < odd.length; ) {
    if (odd[last] - pre > 0) {
      num += odd[last] - pre + 1
    }
    if (odd[first] > 0) {
      num += odd[first] - odd[first - 1] ?? 0 + 1
    }
    pre = odd[last]
    first++
    last++
  }
  num += nums.length - 1 - odd[odd.length - 1] + 1
  // console.log(num)
  return num
}
// [2, 2, 2, 1, 2, 2, 1, 2, 2, 2]
// 2
// [0, 3, 6]

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numberOfSubarraysError2 = function (nums, k) {
  let odd = []
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2) odd.push(i)
  }
  if (odd.length < k) return 0

  odd.unshift(-1)
  odd.push(nums.length)
  //   console.log(odd)
  let first = 1,
    last = k,
    num = 0

  for (; last < nums.length; ) {
    let temp = (odd[first] - odd[first - 1]) * (odd[last + 1] - odd[last])
    temp = isNaN(temp) ? 0 : temp
    num += temp

    //   console.log((odd[first] - odd[first - 1]),(odd[last+1] - odd[last]))
    first++
    last++
  }
  return num
}
var numberOfSubarrays = function (nums, k) {
  let odd = []
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2) odd.push(i)
  }
  if (odd.length < k) return 0
  // num.length=3
  // [0, 1, 3];
  // [-1,0,1,3,4]
  // 第0个和最后一个为边界情况
  odd.unshift(-1)
  odd.push(nums.length)
  // console.log(odd)
  let num = 0
  for (let first = 1, last = k; last < odd.length - 1; first++, last++) {
    num += (odd[first] - odd[first - 1]) * (odd[last + 1] - odd[last])
  }
  return num
}

// 题解
var numberOfSubarrays2 = function (nums, k) {
  let n = nums.length
  let odd = new Array(n + 2)
  let ans = 0,
    cnt = 0
  for (let i = 0; i < n; ++i) {
    if ((nums[i] & 1) != 0) {
      odd[++cnt] = i
    }
  }
  odd[0] = -1
  odd[++cnt] = n
  for (let i = 1; i + k <= cnt; ++i) {
    ans += (odd[i] - odd[i - 1]) * (odd[i + k] - odd[i + k - 1])
  }
  return ans
}
