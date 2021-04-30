/**
 * 826. 安排工作以达到最大收益
 * @param {number[]} difficulty
 * @param {number[]} profit
 * @param {number[]} worker
 * @return {number}
 */
const a = [
  66,
  1,
  28,
  73,
  53,
  35,
  45,
  60,
  100,
  44,
  59,
  94,
  27,
  88,
  7,
  18,
  83,
  18,
  72,
  63,
];
const b = [
  66,
  20,
  84,
  81,
  56,
  40,
  37,
  82,
  53,
  45,
  43,
  96,
  67,
  27,
  12,
  54,
  98,
  19,
  47,
  77,
];
const c = [
  61,
  33,
  68,
  38,
  63,
  45,
  1,
  10,
  53,
  23,
  66,
  70,
  14,
  51,
  94,
  18,
  28,
  78,
  100,
  16,
];
var maxProfitAssignmentError = function (difficulty, profit, worker) {
  const map = new Map();
  for (let i = 0; i < difficulty.length; i++) {
    map.set(difficulty[i], i);
  }
  let p = 0;
  for (let i = 0; i < worker.length; i++) {
    let w = worker[i],
      max = 0;
    while (w) {
      if (map.has(w)) {
        max = Math.max(max, profit[map.get(w)]);
      }
      w--;
    }
    p += max;
  }
  return p;
};
console.log(maxProfitAssignmentError(a, b, c));
// var maxProfitAssignment = function (difficulty, profit, worker) {
//   let array = []
//   for (let i = 0; i < difficulty.length; i++) {
//     array.push([difficulty[i], profit[i]])
//   }
//   array.sort((a, b) => a[0] - b[0])
//   let map = new Map(array)
//   let p = 0
//   for (let i = 0; i < worker.length; i++) {
//     let w = worker[i],
//       max = 0
//     while (w) {
//       if (map.has(w)) {
//         max = Math.max(max, map.get(w))
//       }
//       w--
//     }
//     p += max
//   }
//   return p
// }
//[1,3] [1,2]
//[2,2]
var maxProfitAssignment = function (difficulty, profit, worker) {
  //记录每个工作的最大收益
  const map = new Map();
  const l = difficulty.length;
  for (let i = 0; i < l; i++) {
    map.set(difficulty[i], Math.max(profit[i], map.get(difficulty[i]) || 0));
  }
  const max = Math.max(...worker, ...difficulty);
  // dp[i]表示难度为i的工作对应的最大收益
  const dp = new Array(max + 1).fill(0);
  for (let i = 1; i <= max; i++) {
    dp[i] = Math.max(dp[i - 1], map.get(i) || 0);
  }
  return worker.reduce((a, b) => a + dp[b], 0);
};
