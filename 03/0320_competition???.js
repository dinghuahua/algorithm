/**
 * 5693. 字符串中第二大的数字
 * @param {string} s
 * @return {number}
 */
var secondHighest = function (s) {
  s = s.replace(/[a-z]/g, '')
  // if (!(cur.charCodeAt() >= 97 && cur.charCodeAt() < 97 + 26))
  if (s.length < 2) return -1
  s = s
    .split('')
    .sort()
    .join('')
    .replace(/(\d)\1+/g, ($1) => $1[0])
  if (s.length < 2) return -1
  return s[s.length - 2]
}

/**
 * @param {number} timeToLive
 */
var AuthenticationManager = function (timeToLive) {
  this.timeToLive = timeToLive;
  this.map = new Map()
};

/** 
 * @param {string} tokenId 
 * @param {number} currentTime
 * @return {void}
 */
AuthenticationManager.prototype.generate = function (tokenId, currentTime) {
  this.map.set(tokenId, currentTime + this.timeToLive)

};

/** 
 * @param {string} tokenId 
 * @param {number} currentTime
 * @return {void}
 */
AuthenticationManager.prototype.renew = function (tokenId, currentTime) {
  const time = this.map.get(tokenId)
  // if(!time || currentTime>=time){
  //     // 当前时间点已经过期 或者不存在
  // } else {
  //     this.map(tokenId,currentTime+this.timeToLive)
  // }
  if (time && currentTime < time) {
    // tokenId存在 并且还没有过期
    this.map.set(tokenId, currentTime + this.timeToLive)
  }

};

/** 
 * @param {number} currentTime
 * @return {number}
 */
AuthenticationManager.prototype.countUnexpiredTokens = function (currentTime) {
  let num = 0
  for (let time of this.map.values()) {
    if (time > currentTime) {
      ++num
    }
  }
  return num
};

/**
 * Your AuthenticationManager object will be instantiated and called as such:
 * var obj = new AuthenticationManager(timeToLive)
 * obj.generate(tokenId,currentTime)
 * obj.renew(tokenId,currentTime)
 * var param_3 = obj.countUnexpiredTokens(currentTime)
 */

/**
 * 5712. 你能构造出连续值的最大数目
 * @param {number[]} coins
 * @return {number}
 */
/**
 * @param {number[]} coins
 * @return {number}
 */
var getMaximumConsecutive = function (coins) {
  let map = new Map(),
    preArr = new Map()
  const dfs = (next, pre = []) => {
    let preStr = pre.join(',')
    if (!map.has(preStr)) {
      preArr.set(preStr, 1)
    } else return
    let sum = pre.reduce((a, b) => a + b, 0)
    if (!map.has(sum)) map.set(sum, 1)
    if (!next.length) return
    const l = next.length
    for (var i = 0; i < l; i++) {
      dfs([...next.slice(0, i), ...next.slice(i + 1)], [...pre, next[i]])
    }
  }
  dfs(coins)
  let sums = [...map.keys()].sort((a, b) => a - b)
  // console.log(sums)
  let max = 0
  sums.reduce((pre, n) => {
    if (n === pre + 1) {
      ++pre
      max = Math.max(pre, max)
      return pre
    } else {
      max = Math.max(pre, max)
      return 0
    }
  }, 0)
  return max + 1
}

var getMaximumConsecutive = function (coins) {
  let map = new Map(),
    preArr = new Map()
  coins = coins.sort((a, b) => a - b)
  const stack = [
    {
      pre: [],
      next: coins,
    },
  ]

  while (stack.length) {
    const cur = stack.shift(),
      pre = cur.pre,
      next = cur.next,
      l = next.length

    let sum = pre.reduce((a, b) => a + b, 0)
    if (!map.has(sum)) map.set(sum, 1)
    if (!l) continue

    for (let i = 0; i < l; i++) {
      const _pre = [...pre, next[i]],
        _preStr = _pre.join(',')

      if (!preArr.has(_preStr)) {
        preArr.set(_preStr, 1)
      } else continue
      stack.unshift({
        pre: _pre,
        next: [...next.slice(0, i), ...next.slice(i + 1)],
      })
    }
  }

  let sums = [...map.keys()].sort((a, b) => a - b)
  // console.log(sums)
  let max = 0
  sums.reduce((pre, n) => {
    if (n === pre + 1) {
      ++pre
      max = Math.max(pre, max)
      return pre
    } else {
      max = Math.max(pre, max)
      return 0
    }
  }, 0)
  return max + 1
}
