/**
 * 424. 替换后的最长重复字符
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
// 题解 看不懂
var characterReplacement = function (s, k) {
  const num = new Array(26).fill(0)
  const n = s.length
  let maxn = 0,
    left = 0,
    right = 0

  while (right < n) {
    num[s[right].charCodeAt() - 'A'.charCodeAt()]++
    maxn = Math.max(maxn, num[s[right].charCodeAt() - 'A'.charCodeAt()])
    if (right - left + 1 - maxn > k) {
      num[s[left].charCodeAt() - 'A'.charCodeAt()]--
      left++
    }
    right++
  }
  return right - left
}

/**
 * 986. 区间列表的交集
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
var intervalIntersection = function (firstList, secondList) {
  let res = [],
    i = 0,
    j = 0
  while (i < firstList.length && j < secondList.length) {
    let start = Math.max(firstList[i][0], secondList[j][0]),
      end = Math.min(firstList[i][1], secondList[j][1])

    if (start <= end) {
      res.push([start, end])
    }
    if (firstList[i][1] < secondList[j][1]) {
      i++
    } else {
      j++
    }
  }
  return res
}
