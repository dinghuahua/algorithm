/**
 * 826. 安排工作以达到最大收益
 * @param {number[]} difficulty
 * @param {number[]} profit
 * @param {number[]} worker
 * @return {number}
 */
var maxProfitAssignmentError = function (difficulty, profit, worker) {
  const map = new Map()
  for (let i = 0; i < difficulty.length; i++) {
    map.set(difficulty[i], i)
  }
  let p = 0
  for (let i = 0; i < worker.length; i++) {
    let w = worker[i],
      max = 0
    while (w) {
      if (map.has(w)) {
        max = Math.max(max, profit[map.get(w)])
      }
      w--
    }
    p += max
  }
  return p
}
