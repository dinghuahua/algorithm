// console.log(letterCombinations("234"));
//迭代
// var letterCombinations = function (digits) {
//   if (!digits.length) return [];
//   var map = new Map([
//     ["2", "abc"],
//     ["3", "def"],
//     ["4", "ghi"],
//     ["5", "jkl"],
//     ["6", "mno"],
//     ["7", "pqrs"],
//     ["8", "tuv"],
//     ["9", "wxyz"],
//   ]);
//   let res = [""];
//   for (const s of digits) {
//     const temp = [];
//     for (const i of map.get(s)) {
//       const list = res.map((item) => `${item}${i}`);
//       temp.push(...list);
//     }
//     res = temp;
//   }
//   return res;
// };
// console.log(letterCombinations("23"));
var map = new Map([
  ["2", "abc"],
  ["3", "def"],
  ["4", "ghi"],
  ["5", "jkl"],
  ["6", "mno"],
  ["7", "pqrs"],
  ["8", "tuv"],
  ["9", "wxyz"],
]);
//尾递归
// var letterCombinations = function (digits, pre = "", index = 0) {
//   if (!digits.length) return [];
//   if (index === digits.length) {
//     return [pre];
//   }
//   const curs = map.get(digits[index]);
//   return [...curs].reduce((sum, item) => {
//     return sum.concat(letterCombinations(digits, pre + item, index + 1));
//   }, []);
// };
//一个临时变量
var letterCombinations = function (digits) {
  const res = [];
  let cur = "";
  const l = digits.length;
  if (!l) return [];
  const dfs = (index = 0) => {
    if (index === l) {
      res.push(cur);
      return;
    }
    const curs = map.get(digits[index]);
    for (const s of curs) {
      cur += s;
      dfs(index + 1);
      cur = cur.slice(0, cur.length - 1);
    }
  };
  dfs();
  return res;
};
// var letterCombinations = function (digits) {
//   if (!digits.length) return [];
//   var map = new Map([
//     ["2", "abc"],
//     ["3", "def"],
//     ["4", "ghi"],
//     ["5", "jkl"],
//     ["6", "mno"],
//     ["7", "pqrs"],
//     ["8", "tuv"],
//     ["9", "wxyz"],
//   ]);
//   let strArr = [].map.call(digits, (s) => (map.has(s) ? map.get(s) : ""));
//   let res = [];
//   const dfs = (pre, next) => {
//     if (pre.length === digits.length) {
//       res.push(pre);
//       return;
//     }
//     if (!next.length) return;
//     for (var i = 0; i < next.length; i++) {
//       for (var j = 0; j < next[i].length; j++) {
//         dfs(pre + next[i][j], [...next.slice(i + 1)]);
//       }
//     }
//   };
//   dfs("", strArr);
//   return res;
// };
const map = {
  2: "abc",
  3: "def",
  4: "ghi",
  5: "jkl",
  6: "mno",
  7: "pqrs",
  8: "tuv",
  9: "wxyz",
};
var letterCombinations = function (digits) {
  const l = digits.length;
  if (!l) return [];
  const res = [""];
  for (let i = 0; i < l; i++) {
    const jl = res.length;
    for (let j = 0; j < jl; j++) {
      const item = res.shift();
      for (const s of map[digits[i]]) {
        res.push(`${item}${s}`);
      }
    }
  }
  return res;
};
