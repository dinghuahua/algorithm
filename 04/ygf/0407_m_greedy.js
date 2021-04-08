/**
 * 452. 用最少数量的箭引爆气球
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShotsError = function (
  points = [
    [10, 16],
    [2, 8],
    [1, 6],
    [7, 12],
    [8, 14],
  ]
) {
  const arr = points.flat(),
    max = Math.max(...arr),
    min = Math.min(...arr);
  // let intersect = new Set([...a].filter(x => b.has(x)));
  for (let i = min; i <= max; i++) {}
};

// [[1, 2], [2, 3], [3, 4], [4, 5]]
// var findMinArrowShots = function (points) {
//   let pre = [];
//   for (let i = 0; i < points.length; i++) {
//     let [start, end] = points[i],
//       flag = true,
//       j = 0;
//     for (; j < pre.length; j++) {
//       // 1 6  10 8
//       let [preStart, preEnd] = pre[j];
//       if (preStart <= start && end <= preEnd) {
//         pre[j] = [start, end];
//         flag = false;
//         break;
//       } else if (preStart <= start && preEnd <= end) {
//         pre[j] = [start, preEnd];
//         flag = false;
//         break;
//       } else if (start < preStart && preEnd < end) {
//         // 不变
//         flag = false;
//         break;
//       } else if (start <= preStart && end <= preEnd && preStart <= end) {
//         pre[j] = [preStart, end];
//         flag = false;
//         break;
//       } else {
//         flag = true;
//       }
//     }
//     j === pre.length && flag && pre.push(points[i]);
//     // console.log(pre)
//   }
//   return pre.length;
// };

/**
 * 1689. 十-二进制数的最少数目
 * @param {string} n
 * @return {number}
 */
var minPartitions = function (n) {
  return Math.max(...n.split(""));
};

/**
 * 861. 翻转矩阵后的得分
 * @param {number[][]} A
 * @return {number}
 */
// 不知道错哪了
// var matrixScoreError = function (A) {
//   let max = 0;

//   //  行转换 首位必须为1才是最大
//   for (let i = 0; i < A.length; i++) {
//     if (!A[i][0]) {
//       for (let j = 0; j < A[0].length; j++) {
//         A[i][j] = A[i][j] === 0 ? 1 : 0;
//       }
//     }
//   }
//   // 列转换
//   for (let i = 1; i < A[0].length; i++) {
//     // 统计1的个数，当1的个数少于一半时，进行翻转
//     let v1 = 0;
//     for (let j = 0; j < A.length; j++) {
//       if (A[j][i]) v1++;
//     }
//     if (A.length / 2 > v1) {
//       for (let j = 0; j < A.length; j++) {
//         A[j][i] = +!A[j][i];
//       }
//     }
//   }
//   for (let i = 0; i < A.length; i++) {
//     max += parseInt(+A[i].join(""), 2);
//   }
//   return max;
// // };
// var matrixScoreError = function (A) {
//   const h = A.length;
//   const w = A[0].length;
//   //记录行和列的反转次数
//   const dh = new Array(h).fill(0);
//   const dw = new Array(w).fill(0);
//   for (let i = 0; i < h; i++) {
//     if (!A[i][0]) {
//       dh[i]++;
//     }
//   }

//   //
//   for (let i = 1; i < w; i++) {
//     // 统计1的个数，当1的个数少于一半时，进行翻转
//     let v1 = 0;
//     for (let j = 0; j < h; j++) {
//       if ((A[j][i] + dh[j]) % 2) v1++;
//     }
//     if (A.length / 2 > v1) {
//       dw[i]++;
//     }
//   }
//   for (let i = 0; i < h; i++) {
//     for (let j = 0; j < w; j++) {
//       if ((dh[i] + dw[j]) % 2) {
//         A[i][j] = A[i][j] === 0 ? 1 : 0;
//       }
//     }
//   }
//   return A.reduce((pre, item) => pre + Number.parseInt(item.join(""), 2), 0);
// };
// var findMinArrowShotsError = function (
//   points = [
//     [10, 16],
//     [2, 8],
//     [1, 6],
//     [7, 12],
//     [8, 14],
//   ]
// ) {
//   const res = [];
//   points.sort((a, b) => {
//     return a[1] - b[1];
//   });
//   let pre = -Infinity;
//   let c = 0;
//   let maxMin = -Infinity;
//   for (const [start, end] of points) {
//     if (start > pre) {
//       res.push([maxMin, pre]);
//       c++;
//       pre = end;
//       maxMin = start;
//     } else {
//       maxMin = Math.max(maxMin, start);
//     }
//   }
//   res.push([maxMin, pre]);
//   return c;
// };
var findMinArrowShotsError = function (
  points = [
    [10, 16],
    [2, 8],
    [1, 6],
    [7, 12],
    [8, 14],
  ]
) {
  points.sort((a, b) => {
    return a[0] - b[0];
  });
  const l = points.length;
  let pre = Infinity;
  let c = 0;

  for (let i = l - 1; i >= 0; i--) {
    const [start, end] = points[i];
    if (end < pre) {
      c++;
      pre = start;
    }
  }

  return c;
};
