/**
 * 474. 一和零
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

const countzeroesones = (s) => {
  var c = [0, 0];
  for (let i = 0; i < s.length; i++) {
    c[+s[i]]++;
  }
  return c;
}

var findMaxFormError = function (strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3) {
  var dp = new Array(m + 1).fill(0).map(_ => new Array(n + 1).fill(0))
  for (let s of strs) {
    const count = countzeroesones(s);
    for (let zeroes = 1; zeroes <= m; zeroes++)
      if (zeroes < count[0]) {
        dp[zeroes] = dp[zeroes - count[0]]
      } else {
        for (let ones = 1; ones <= n; ones++) {
          if (ones < count[1]) {
            dp[zeroes][ones] = dp[zeroes - count[0]][ones]
          } else {
            dp[zeroes][ones] = Math.max(1 + dp[zeroes - count[0]][ones - count[1]], dp[zeroes][ones]);
          }
        }
      }
  }
  return dp[m][n];
};

var findMaxForm1 = function (strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3) {
  var dp = new Array(m + 1).fill(0).map(_ => new Array(n + 1).fill(0))
  for (let s of strs) {
    const count = countzeroesones(s);
    for (let zeroes = m; zeroes >= count[0]; zeroes--)
      for (let ones = n; ones >= count[1]; ones--)
        dp[zeroes][ones] = Math.max(1 + dp[zeroes - count[0]][ones - count[1]], dp[zeroes][ones]);
  }
  console.log(dp)
  return dp[m][n];
};
console.log(findMaxForm(), findMaxForm1())