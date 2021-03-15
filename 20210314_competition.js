
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
};


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
};


/**
 * 1792. 最大平均通过率
 * @param {number[][]} classes
 * @param {number} extraStudents
 * @return {number}
 */
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