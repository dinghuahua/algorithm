/**
 * 452. 用最少数量的箭引爆气球
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShotsError = function (points = [[10, 16], [2, 8], [1, 6], [7, 12]]) {
  const arr = points.flat(),
    max = Math.max(...arr), min = Math.min(...arr)
  // let intersect = new Set([...a].filter(x => b.has(x)));
  for (let i = min; i <= max; i++) {

  }

};

// [[1, 2], [2, 3], [3, 4], [4, 5]]
var findMinArrowShots = function (points) {
  let pre = []
  for (let i = 0; i < points.length; i++) {
    let [start, end] = points[i], flag = true, j = 0
    for (; j < pre.length; j++) {
      // 1 6  10 8
      let [preStart, preEnd] = pre[j]
      if (preStart <= start && end <= preEnd) {
        pre[j] = [start, end]
        flag = false
        break
      } else if (preStart <= start && preEnd <= end) {
        pre[j] = [start, preEnd]
        flag = false
        break
      } else if (start < preStart && preEnd < end) {
        // 不变
        flag = false
        break
      } else if (start <= preStart && end <= preEnd && preStart <= end) {
        pre[j] = [preStart, end]
        flag = false
        break
      } else {
        flag = true
      }
    }
    j === pre.length && flag && pre.push(points[i])
    // console.log(pre)
  }
  return pre.length

};


/**
 * 1689. 十-二进制数的最少数目
 * @param {string} n
 * @return {number}
 */
var minPartitions = function (n) {
  return Math.max(...n.split(''))
};


/**
 * 861. 翻转矩阵后的得分
 * @param {number[][]} A
 * @return {number}
 */
var matrixScore = function (A) {

};