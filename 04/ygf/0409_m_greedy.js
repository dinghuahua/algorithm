/**
 * 1769. 移动所有球到每个盒子所需的最小操作数
 * @param {string} boxes
 * @return {number[]}
 */
// var minOperations = function (boxes) {
//   const len = boxes.length
//   let res = new Array(len)
//   for (let i = 0; i < len; i++) {
//     let num = 0
//     for (let j = 0; j < len; j++) {
//       if (j === i) continue
//       if (boxes[j] === '1') {
//         num += Math.abs(j - i)
//       }
//     }
//     res[i] = num
//   }
//   return res
// }
var minOperations = function (boxes) {
  const len = boxes.length;
  let res = new Array(len).fill(0);
  let left = boxes[0] === 1 ? 1 : 0;
  let right = 0;
  for (let i = 1; i < len; i++) {
    if (boxes[i] === "1") {
      res[0] += i;
      right++;
    }
  }
  for (let i = 1; i < len; i++) {
    res[i] = res[i - 1] + left - right;
    if (boxes[i] === "1") {
      right--;
      left++;
    }
  }
  return res;
};
/**
 * 921. 使括号有效的最少添加
 * @param {string} S
 * @return {number}
 */
var minAddToMakeValid = function (S) {
  let len = S.length,
    num = 0;
  stack = [];

  for (let i = 0; i < len; i++) {
    if (S[i] === "(") stack.push("(");
    else {
      stack.length ? stack.pop() : ++num;
    }
  }
  return num + stack.length;
};

/**
 * 1605. 给定行和列的和求可行矩阵
 * @param {number[]} rowSum
 * @param {number[]} colSum
 * @return {number[][]}
 */
// 题解
var restoreMatrix = function (rowSum, colSum) {
  let m = rowSum.length,
    n = colSum.length,
    arr = new Array(m).fill("").map((_) => new Array(n)),
    x = 0,
    y = 0;

  while (x < m && y < n) {
    let min = Math.min(rowSum[x], colSum[y]);
    arr[x][y] = min;

    if (min === rowSum[x]) {
      // 最小值为行和时，说明当前行的剩余列为0
      for (let j = y + 1; j < n; j++) {
        arr[x][j] = 0;
      }
      rowSum[x] -= min;
      colSum[y] -= min;
      // 进行遍历下一行
      x++;
    } else {
      // 最小值为列和时，说明当前列的剩余行为0
      for (let i = x + 1; i < m; i++) {
        arr[i][y] = 0;
      }
      rowSum[x] -= min;
      colSum[y] -= min;

      // 进行遍历下一列
      y++;
    }
  }
  return arr;
};

// 题解
var restoreMatrix2 = function (rowSum, colSum, pre, preX, preY, res = []) {
  let m = rowSum.length,
    n = colSum.length;
  // arr = new Array(m).fill("").map((_) => new Array(n));

  for (let i = prex + 1; i < m; i++) {
    for (let j = preY + 1; j < n; j++) {
      const max = Math.min(rowSum[i], colSum[j]);
      // arr[i][j] = Math.min(rowSum[i], colSum[j]);

      for (let k = 0; k <= max; k++) {
        pre[i][j] = k;
        rowSum[i] -= k;
        colSum[j] -= k;
        restoreMatrix2(rowSum, colSum, JSON.parse(JSON.stringify(arr)), i, j);
        rowSum[i] += k;
        colSum[j] += k;
      }
    }
  }
  res.push(pre);
  return res;
};
//周赛第一题:
var truncateSentence = function (s, k) {
  return s.split(" ").slice(0, k).join(" ");
};
//周赛第二题
var findingUsersActiveMinutes = function (logs, k) {
  const map = new Map();
  const res = new Array(k).fill(0);
  for (const [id, time] of logs) {
    if (!map.has(id)) {
      map.set(id, new Set());
    }
    map.get(id).add(time);
  }
  for (const v of map.values()) {
    const c = v.size;
    if (c <= k) {
      res[c - 1]++;
    }
  }
  return res;
};
//周赛第三题
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minAbsoluteSumDiff = function (nums1, nums2) {
  const mod = Math.pow(10, 9) + 7;
  const l = nums1.length;
  const sort = nums1.slice().sort((a, b) => a - b);
  const getAbs = (v) => {
    let left = 0;
    let right = l - 1;
    if (sort[left] === v || sort[right] === v) return 0;
    if (v < sort[left]) return sort[left] - v;
    if (v > sort[right]) return v - sort[right];
    while (right > left) {
      if (right - left === 1) break;
      const mid = ~~((left + right) / 2);
      if (mid === left) break;
      if (sort[mid] === v) return 0;
      if (sort[mid] > v) {
        right = mid;
      } else {
        left = mid;
      }
    }
    return Math.min(Math.abs(v - sort[left]), Math.abs(sort[right] - v));
  };

  const absList = nums1.map((v1, index) => {
    const v = Math.abs(v1 - nums2[index]);
    return v;
  });
  const sum = absList.reduce((a, b) => a + b, 0);
  const newSort = nums2.map((v) => {
    return getAbs(v);
  });
  let maxChange = 0;
  for (let i = 0; i < l; i++) {
    maxChange = Math.max(maxChange, absList[i] - newSort[i]);
  }
  if (!sum) return sum;
  return (sum - maxChange) % mod;
};
var reconstructQueue = function (people) {
  people.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return b[0] - a[0];
  });
  const stack = [];
  for (const item of people) {
    if (!stack.length) {
      stack.push(item);
    } else {
      stack.splice(item[1], 0, item);
    }
  }
  return stack;
};
