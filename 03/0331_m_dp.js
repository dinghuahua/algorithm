/**
 * 978. 最长湍流子数组
 * @param {number[]} arr
 * @return {number}
 */
// 结束的位置没办法判断 不会判断
var maxTurbulenceSizeError = function (arr) {
  const l = arr.length
  let dp1 = new Array(l + 1).fill(0),
    dp2 = new Array(l + 1).fill(0)

  for (let i = 1; i <= l; i++) {
    // console.log((arr?.[i-2]??Infinity),arr[i-1] , (arr?.[i]??Infinity))
    if ((i - 1) % 2 === 0) {
      // 偶数位置
      if ((arr?.[i - 2] ?? Infinity) > arr[i - 1] && arr[i - 1] < (arr?.[i] ?? Infinity)) {
        dp1[i] = dp1[i - 1] + 1
      } else {
        dp1[i] = Math.max(1, dp1[i - 1])
      }

      if ((arr?.[i - 2] ?? -Infinity) < arr[i - 1] && arr[i - 1] > (arr?.[i] ?? -Infinity)) {
        dp2[i] = dp2[i - 1] + 1
      } else {
        dp2[i] = Math.max(1, dp2[i - 1])
        if ((arr?.[i - 2] ?? -Infinity) < arr[i - 1] && arr[i - 1] <= (arr?.[i] ?? -Infinity)) ++dp2[i]
      }

    } else {
      // 奇数位置
      if ((arr?.[i - 2] ?? -Infinity) < arr[i - 1] && arr[i - 1] > (arr?.[i] ?? -Infinity)) {
        dp1[i] = dp1[i - 1] + 1
      } else {
        dp1[i] = Math.max(1, dp1[i - 1])
        if ((arr?.[i - 2] ?? -Infinity) < arr[i - 1] && arr[i - 1] <= (arr?.[i] ?? -Infinity)) ++dp1[i]
      }


      if ((arr?.[i - 2] ?? Infinity) > arr[i - 1] && arr[i - 1] < (arr?.[i] ?? Infinity)) {
        dp2[i] = dp2[i - 1] + 1
      } else {
        dp2[i] = Math.max(1, dp2[i - 1])
        if ((arr?.[i - 2] ?? Infinity) > arr[i - 1] && arr[i - 1] >= (arr?.[i] ?? Infinity)) ++dp2[i]
      }

    }
  }
  console.log(dp1, dp2)
  return Math.max(dp1[l], dp2[l])
};
// [0, 1, 1, 0, 1, 0, 1, 1, 0, 0]
// [4, 8, 12, 16]

/**
 * 300. 最长递增子序列
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  let l = nums.length
  // 第i元素的长度
  let dp = new Array(l + 1).fill(0)
  let max = 1
  for (var i = 1; i <= l; i++) {
    // 每个位置的元素 本身就可以是1
    dp[i] = 1
    for (let j = 0; j < i; j++) {
      // 考虑数组越界
      if (nums[i - 1] > nums?.[j - 1] ?? -Infinity) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
    max = Math.max(max, dp[i])
  }
  // console.log(dp)
  return max

};

/**
 * 1641. 统计字典序元音字符串的数目
 * @param {number} n
 * @return {number}
 */
var countVowelStrings = function (n) {
  const str = "aeiou"

  let stack = [{
    pre: '',
    next: str
  }]
  let num = 0;
  while (stack.length) {
    const cur = stack.shift()
    let pre = cur.pre, next = cur.next

    if (pre.length === n) {
      ++num
      continue
    }
    if (!next.length) continue
    const l = next.length
    for (let i = 0; i < l; i++) {
      stack.unshift({
        pre: `${pre}${next[i]}`,
        next: `${next.slice(i)}`
      })
    }
  }
  return num
};
var countVowelStringsError = function (n) {
  const str = "aeiou", sl = str.length
  // 在第i个字母时长度为j的字符串个数
  let dp = new Array(sl + 1).fill(0).map(_ => new Array(n + 1).fill(0))

  for (let i = 1; i <= sl; i++) {
    for (let j = 1; j <= n; j++) {
      for (let k = 0; k <= j; k++)
        // 不取 取重复个
        dp[i][j] = dp[i - 1][j] + dp[i][j - k] + k
    }
  }
  console.log(dp)
  return dp[sl][n]
};
var countVowelStrings2 = function (n) {
  const str = "aeiou", sl = str.length
  let dp = new Array(n + 1).fill(0).map(_ => new Array(sl + 1).fill(0).map((a, b) => b))

  for (let i = 2; i <= n; i++) {
    for (let j = 2; j <= sl; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[n][sl];
};
var countVowelStrings3 = function (n) {
  if (n == 0) return 0;
  if (n == 1) return 5;
  // a e i o u
  // list[i]表示以对应的元音字母结尾的字符串的数量
  const list = [1, 1, 1, 1, 1];
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j < 5; j++) {
      list[j] = list[j] + list[j - 1];
    }
  }
  return list.reduce((a, b) => a + b, 0);
};
// "abcde"
// "ace"

// "bsbininm"
// "jmjkbkjkv"

// "oxcpqrsvwf"
// "shmtulqrypy"

/**
 * 1143. 最长公共子序列
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const t1 = text1.length, t2 = text2.length
  const dp = new Array(t1 + 1).fill(0).map(_ => new Array(t2 + 1).fill(0))

  for (let i = 1; i <= t1; i++) {
    for (let j = 1; j <= t2; j++) {
      // 不同使用的是的当前行的前一个
      // 不同使用的是上一行的同一个位置
      // 相同上一行的前一个 + 1  因为是和两个字符串有关系
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j])
      }
    }
  }
  // console.log(dp)
  return dp[t1][t2]
};