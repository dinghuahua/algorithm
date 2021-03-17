/**
 * 1790. 仅执行一次字符串交换能否使两个字符串相等
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var areAlmostEqual = function (s1, s2) {
  if (s1.length !== s2.length) return false
  let diff = []
  for (var i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      diff.push([s1[i], s2[i]])
    }
  }
  if (!diff.length) return true
  if (diff.length > 2 || diff.length === 1) return false
  return diff[0][0] === diff[1][1] && diff[0][1] === diff[1][0]
}

/**
 * 1791. 找出星型图的中心节点
 * @param {number[][]} edges
 * @return {number}
 */
var findCenter = function (edges) {
  let map = new Map()

  for (var i = 0; i < edges.length; i++) {
    let item = edges[i],
      first = item[0],
      second = item[1]
    if (i === 0) {
      map.set(first, 1)
      map.set(second, 1)
    } else {
      if (map.has(first)) return first
      if (map.has(second)) return second
    }
  }
}

/**
 * 1792. 最大平均通过率
 * @param {number[][]} classes
 * @param {number} extraStudents
 * @return {number}
 */
var maxAverageRatioError = function (classes, extraStudents) {
  var map = new Map()

  let allPass = extraStudents,
    allStudents = extraStudents
  for (var i = 0; i < classes.length; i++) {
    map.set(i, classes[i])
    let pass = classes[i][0],
      student = classes[i][1]
    allPass += pass
    allStudents += student
  }

  let allAverageRatio = 0
  for (var i = 1; i <= extraStudents; i++) {
    // 下标 差值
    let diff = [-1, 0]
    for (let [index, [pass, student]] of map) {
      let temp = Math.max(diff[1], (pass + 1) / (student + 1) - pass / student)
      if (temp > diff[1]) diff = [index, temp]
    }
    let [pass, student] = map.get(diff[0])
    ++pass
    ++student
    map.set(diff[0], [pass, student])
  }
}

// 输入：classes = [[1,2],[3,5],[2,2]], extraStudents = 2
// 输出：0.78333
// 解释：你可以将额外的两个学生都安排到第一个班级，平均通过率为 (3/4 + 3/5 + 2/2) / 3 = 0.78333 。
// 示例 2：

// 输入：classes = [[2,4],[3,9],[4,5],[2,10]], extraStudents = 4
// 输出：0.53485

// 9 + 2 == 11

// 3 / 5   18/30
// 4 / 6    20/30

// 4/7    32/56
// 5 / 8    35 / 56

//                    8/13
var maxAverageRatio = function (classes, extraStudents) {
  var map = new Map()

  let allPass = extraStudents,
    allStudents = extraStudents
  for (var i = 0; i < classes.length; i++) {
    map.set(i, classes[i])
    let pass = classes[i][0],
      student = classes[i][1]

    allPass += pass
    allStudents += student
  }

  let allAverageRatio = 0
  for (var i = 1; i <= extraStudents; i++) {
    // 下标 差值
    let diff = [-1, 0]
    for (let [index, [pass, student]] of map) {
      let temp = Math.max(diff[1], (pass + 1) / (student + 1) - pass / student)
      if (temp > diff[1]) diff = [index, temp]
    }
    let [pass, student] = map.get(diff[0])
    ++pass
    ++student
    map.set(diff[0], [pass, student])
  }
  for (let [pass, student] of map.values()) {
    allAverageRatio += pass / student
  }
  return allAverageRatio / map.size
}
console.log(
  maxAverageRatio(
    [
      [1, 2],
      [3, 5],
      [2, 2],
    ],
    2
  )
)

/**
 * 1793. 好子数组的最大分数
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumScore = function (nums, k) {
  const l = nums.length
  let left = k
  let right = k
  let max = 0
  let min = nums[k]
  while (left >= 0 && right < l) {
    while (left && nums[left - 1] >= min) {
      left--
    }
    while (right < l - 1 && nums[right + 1] >= min) {
      right++
    }
    max = Math.max((right - left + 1) * min, max)
    if (!left && right === l - 1) break
    if (left && right < l - 1) {
      min = Math.max(nums[left - 1], nums[right + 1])
    } else if (left) {
      min = Math.min(min, nums[left - 1])
    } else {
      min = Math.min(min, nums[right + 1])
    }
  }
  return max
}
