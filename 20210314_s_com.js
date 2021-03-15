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
