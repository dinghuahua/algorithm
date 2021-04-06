/**
 * 5722. 截断句子
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var truncateSentence = function (s, k) {
  return s.split(' ').slice(0, k).join(' ')
}

/**
 * 5723. 查找用户活跃分钟数
 * @param {number[][]} logs
 * @param {number} k
 * @return {number[]}
 */
var findingUsersActiveMinutes = function (logs, k) {
  let map = new Map(),
    answer = new Array(k).fill(0)
  for (let i = 0; i < logs.length; i++) {
    const cur = logs[i]
    const [id, time] = cur
    if (!map.has(id)) map.set(id, new Map())
    map.get(id).set(time, 1)
  }
  for (const times of map.values()) {
    ++answer[times.size - 1]
  }
  return answer
}

/**
 * 5724. 绝对差值和
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minAbsoluteSumDiff = function (nums1, nums2) {
  const len = nums1.length,
    m = Math.pow(10, 9) + 7
  let diff = new Array(len).fill(0),
    index = -1,
    maxDiff = -Infinity
  for (let i = 0; i < len; i++) {
    const abs = Math.abs(nums1[i] - nums2[i])
    if (abs > maxDiff) {
      index = i
      maxDiff = abs
    }
    diff[i] = abs
  }
  const max = nums2[index]
  let minDiff = Infinity
  for (let i = 0; i < len; i++) {
    minDiff = Math.min(minDiff, Math.abs(nums1[i] - max))
  }
  diff[index] = minDiff
  return diff.reduce((a, b) => a + b, 0) % m
}

/**
 * 5725. 序列中不同最大公约数的数目
 * @param {number[]} nums
 * @return {number}
 */
var countDifferentSubsequenceGCDs = function (nums) {
  const getMaxDivisor = (array) => {
    const minN = Math.min(...array)
    for (let j = minN; j >= 2; j--) {
      let count = 0
      for (let i = 0; i < array.length; i++) {
        if (array[i] % j == 0) {
          count++
        }
      }
      if (count == array.length) {
        return j
      }
    }
    return -1 // 无最大公约数
  }

  const stack = [{ pre: [], next: nums }],
    map = new Map(),
    sequence = []
  while (stack.length) {
    let { pre, next } = stack.shift()
    if (!next.length) {
      continue
    }
    let _pre = [...pre],
      strPre = _pre.sort().join(',')
    if (!map.has(strPre)) {
      sequence.push(pre)
    } else {
      map.set(strPre, true)
    }
    // console.log(pre, next)
    for (let i = 0; i < next.length; i++) {
      let _pre = [...pre]
      _pre.push(next[i])
      stack.push({
        pre: _pre,
        next: [...next.slice(0, i), ...next.slice(i + 1)],
      })
    }
  }
  let diffMax = new Map()
  for (let i = 0; i < sequence.length; i++) {
    const max = getMaxDivisor(sequence[i])
    max !== -1 && diffMax.set(max, 1)
  }
  return diffMax.size
}

console.log(countDifferentSubsequenceGCDs([6, 10, 3]))

const gcd = (a, b) => {
  if (!b) return a
  return gcd(b, a % b)
}
var countDifferentSubsequenceGCDs2 = function (a) {
  const n = a.length
  let mx = 0
  const state = new Array(200000 + 1).fill(false)
  for (let i = 0; i < n; i++) {
    state[a[i]] = true
    mx = Math.max(mx, a[i])
  }
  let ans = 0
  for (let i = 1; i <= mx; i++) {
    let now = -1
    for (let j = i; j <= mx; j += i) {
      if (state[j]) {
        // 这个j/i 相当于数组中最小的i的倍数
        if (now == -1) now = j / i
        else now = gcd(now, j / i)
        if (now == 1) break
      }
    }
    if (now == 1) ans++
  }
  return ans
}
