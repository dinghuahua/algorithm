/**
 * 5746. 到目标元素的最小距离
 * @param {number[]} nums
 * @param {number} target
 * @param {number} start
 * @return {number}
 */
var getMinDistance = function (nums, target, start) {
  let min = Infinity
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      min = Math.min(min, Math.abs(i - start))
    }
  }
  return min
}

/**
 * 5747. 将字符串拆分为递减的连续值
 * @param {string} s
 * @return {boolean}
 */
// 题解
const splitString = function (s) {
  let i = 0,
    n = s.length
  //pre：上一个子串数值 pos：上一个子串结束位置
  const dfs = (pre, s, pos, n) => {
    if (pos == n - 1) return true //划分到最后一个位置，划分成功
    if (pre == 0) {
      //前面子串数值为0，后边若全为0则成功划分（后边0全归到上一个子串），否则失败
      for (let i = pos + 1; i < n; i++) {
        if (s[i] != '0') return false
      }
      return true
    }
    let cur = 0 //当前子串数值
    for (let i = pos + 1; i < n; i++) {
      //从pos + 1开始划分下一个子串
      // cur *= 10 + 0LL;
      // cur += s[i] - '0' + 0LL;
      if (cur == pre - 1) return dfs(cur, s, i, n)
      //满足cur == pre - 1，划分下一个子串
      else if (cur >= pre) return false //cur >= pre时，再往后划分只会大于等于pre，划分失败
    }
    return false //没有划分成功就是划分失败
  }

  for (i; i < n; i++) {
    //去除s前导0，排除掉全0的情况
    if (s[i] != '0') break
  }
  let pre = 0 //第一个子串数值（最多20位数字）
  for (i; i < n - 1; i++) {
    //枚举第一个子串，长度为1 ~ n - 1（至少划分2个子串）
    // pre *= 10 + 0LL;
    // pre += s[i] - '0' + 0LL;
    if (dfs(pre, s, i, n) == true) return true //能划分到最后，说明可以划分
  }
  return false //没有划分成功就是划分失败
}

// F
var splitString = function (s) {
  const l = s.length
  let flag = false
  const dfs = (index, pre = []) => {
    if (flag) return
    if (index < 0 && pre.length > 1) {
      flag = true
      return
    }
    for (let i = index; i >= 0; i--) {
      const head = Number(s.slice(i, index + 1))
      if (pre.length && head !== pre[0] + 1) continue
      const target = pre.slice()
      target.unshift(Number(s.slice(i, index + 1)))
      dfs(i - 1, target)
    }
  }
  dfs(l - 1)
  return flag
}

/**
 * 5749. 邻位交换的最小次数
 * @param {string} num
 * @param {number} k
 * @return {number}
 */
var getMinSwaps = function (num, k) {}
