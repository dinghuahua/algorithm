/**
 * ððððð
 * 1025. é¤æ°åå¼
 * @param {number} n
 * @return {boolean}
 */
// ä¸ä¼ åæä¸åºè§å¾
var divisorGame = function (n) {
  // 1
  // aè¾
  // 2
  // a1  1  bè¾
  // 3
  // a1  2  b1   1  aè¾
  // 4
  // a1  3  b1   1  bè¾
  // a2  2  b1   1  aè¾
  // 5
  // a1  4  b1 ...  aè¾
  // 6
  // a3  3  b1  bè¾
  // a1  5  b1  bè¾
  // a2  4  b1  aè¾
}
var divisorGame = function (n) {
  // næ°å­æ¶ åéæ©çäººæ¯å¦è¾èµ¢
  const dp = new Array(n + 1).fill(false);
  dp[1] = false;
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      if (!(i % j) && !dp[i - j]) {
        dp[i] = true;
        break
      }
    }
  }
  return dp[n];
};

/**
 * ðð
 * åæ Offer 42. è¿ç»­å­æ°ç»çæå¤§å
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  // å½åä½ç½®çè¿ç»­æå¤§å
  let dp = new Array(nums.length).fill(0)
  dp[0] = nums[0]
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
  }
  return Math.max(...dp)
}
var maxSubArray2 = function (nums) {
  // æ´ä¸ªæ°ç»çæå¤§å
  let max = -Infinity,
    // åä¸ä¸ªä½ç½®çæå¤§å
    pre = 0
  for (let i = 0; i < nums.length; i++) {
    //  pre + cur æ²¡æå½åçæ°å­å¤§å°±éç½®pre
    pre = Math.max(pre + nums[i], nums[i])
    max = Math.max(pre, max)
  }
  return max
}
/**
 * ððð
 * 303. åºååæ£ç´¢ - æ°ç»ä¸å¯å  ä¸æè¿éé¢åèä»ä¹
 * åç¼å
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  this.nums = nums || []
}
/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
  let sum = 0,
    nums = this.nums
  for (let i = left; i <= right && i < nums.length; i++) {
    sum += nums[i]
  }
  return sum
}
// dp
var NumArray = function (nums) {
  // å°å½åä¸æ (åå«)çåç¼å
  this.cache = new Array(nums.length).fill(0);
  this.cache[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    this.cache[i] = this.cache[i - 1] + nums[i];
  }
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
  return this.cache[right] - (this.cache[left - 1] || 0);
};
/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
/**
 * é¢è¯é¢ 08.01. ä¸æ­¥é®é¢ å¦ä½å»æåé¢çä¸ä¸ªif
 * @param {number} n
 * @return {number}
 */
var waysToStep = function (n) {
  let dp = new Array(n + 1).fill(0),
    m = 1000000007
  dp[0] = 0
  if (n === 1) return 1 % m
  dp[1] = 1 % m
  if (n === 2) return 2 % m
  dp[2] = 2 % m
  if (n === 3) return 4 % m
  dp[3] = 4 % m
  for (let i = 4; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2] + dp[i - 3]) % m
  }
  return dp[n]
}
var waysToStep2 = function (n) {
  let dp3 = 0,
    dp2 = 0,
    dp1 = 0,
    m = 1000000007
  if (n === 1) return 1 % m
  dp3 = 1 % m
  if (n === 2) return 2 % m
  dp2 = 2 % m
  if (n === 3) return 4 % m
  dp1 = 4 % m
  for (let i = 4; i <= n; i++) {
    ;[dp1, dp2, dp3] = [(dp1 + dp2 + dp3) % m, dp1, dp2]
  }
  return dp1
}
// åå§åd3ç¬¬0ä¸ªå°é¶1 d2ç¬¬1ä¸ªå°é¶1 d1ç¬¬2ä¸ªå°é¶2
var waysToStep3 = function (n) {
  if (n === 1) return 1;
  let dp3 = 1,
    dp2 = 1,
    dp1 = 2,
    m = 1000000007;
  for (let i = 3; i <= n; i++) {
    [dp1, dp2, dp3] = [(dp1 + dp2 + dp3) % m, dp1, dp2];
  }
  return dp1;
};
/**
 * ððð
 * 392. å¤æ­å­åºå
 * å¦ææå¤§éè¾å¥ç Sï¼ç§°ä½ S1, S2, ... , Sk å¶ä¸­ k >= 10äº¿ï¼ä½ éè¦ä¾æ¬¡æ£æ¥å®ä»¬æ¯å¦ä¸º T çå­åºåãå¨è¿ç§æåµä¸ï¼ä½ ä¼ææ ·æ¹åä»£ç ï¼
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  let sIndex = 0

  for (let i = 0; i < t.length; i++) {
    if (t[i] === s[sIndex]) ++sIndex
  }
  return sIndex >= s.length
}
// è¿é¶
var isSubsequence2 = function (s = "abc", t = "ahbgdc") {
  if (!s) return true
  if (!t) return false
  const l = t.length;
  const dp = new Array(l).fill("").map(() => new Array(26).fill(-1));
  dp[l - 1][t[l - 1].charCodeAt() - 97] = l - 1;
  for (let i = l - 2; i >= 0; i--) {
    for (let j = 0; j < 26; j++) {
      dp[i][j] = dp[i + 1][j];
    }
    dp[i][t[i].charCodeAt() - 97] = i;
  }
  let cur = 0;
  // bac
  // aaab
  const ls = s.length;
  for (let i = 0; i < ls; i++) {
    if (cur >= l) return false;
    const curentIndex = dp[cur][s[i].charCodeAt() - 97];
    if (curentIndex < 0) return false;
    cur = curentIndex + 1;
  }
  return true;
};

var isSubsequence3 = function (s = "abc", t = "ahbgdc") {
  if (!s) return true
  if (!t) return false

  const l = t.length
  const sl = s.length
  const dp = new Array(l).fill('').map(item => new Array(26).fill(-1))

  dp[l - 1][t[l - 1].charCodeAt() - 97] = l - 1
  for (let i = l - 2; i >= 0; i--) {
    for (let j = 0; j < 26; j++) {
      dp[i][j] = dp[i + 1][j]
    }
    dp[i][t[i].charCodeAt() - 97] = i
  }
  let curentIndex = 0
  for (let i = 0; i < sl; i++) {
    if (curentIndex >= l) return false
    curentIndex = dp[curentIndex][s[i].charCodeAt() - 97]
    if (curentIndex < 0) return false
    ++curentIndex
  }
  return true
};
console.log(isSubsequence2())
console.log(isSubsequence3())