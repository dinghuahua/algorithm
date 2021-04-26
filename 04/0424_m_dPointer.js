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
      num += odd[i] - pre + 1
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
