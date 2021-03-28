// str ='abcd' str中不存在重复的字母，枚举出所有的排列组合情况
// 递归函数的参数主要有两个，一个是上一轮拼接的字符串pre，另一个是当前要遍历的字符串next
// 遍历当前字符串，在每一轮中pre拼接当前字符，将当前字符从next原字符串剔除传给下一轮
// 当要遍历的字符串为空，说明拼接结束，当前字符串就是结果之一
// 直到取完最后一个

/**
 * 无重复字符串的排列组合
 * @param {*} s
 * @returns
 */
// 递归
const fn = (s) => {
  const res = []
  const dfs = (next, pre = '') => {
    //next无值，说明字符已经拼接完成
    if (!next) {
      res.push(pre)
      return
    }
    //next有值，说明字符还没取完，每次取一个字符，并且next字符串去掉当前取的字符
    const l = next.length
    for (let i = 0; i < l; i++) {
      dfs(`${next.slice(0, i)}${next.slice(i + 1)}`, `${pre}${next[i]}`)
    }
  }
  dfs(s)
  return res
}

const fn2 = (s) => {
  s = [...s]
  const dfs = (next, pre = '', res = []) => {
    if (!next.length) return res.concat(pre)
    return next.reduce((res, item, i) => {
      return dfs(
        next.slice(0, i).concat(next.slice(i + 1)),
        `${pre}${item}`,
        res
      )
    }, res)
  }
  return dfs(s)
}

const fn3 = (s, pre = '', res = []) => {
  if (!s.length) return res.concat(pre)
  return [].reduce.call(
    s,
    (res, item, i) => {
      return fn(`${s.slice(0, i)}${s.slice(i + 1)}`, `${pre}${item}`, res)
    },
    res
  )
}

// 迭代
const fn4 = (s) => {
  const stack = [
    {
      pre: '',
      next: s,
    },
  ]
  const res = []

  while (stack.length) {
    const cur = stack.shift()
    const next = cur.next
    const nextLen = next.length
    //next无值，说明字符已经取完
    if (!nextLen) {
      res.push(cur.pre)
      continue
    }
    //从剩余字符串中取每一个字符拼接当前字符
    //下一轮循环用到的字符串要去掉当前的字符
    for (let i = 0; i < nextLen; i++) {
      stack.unshift({
        pre: `${cur.pre}${next[i]}`,
        next: `${next.slice(0, i)}${next.slice(i + 1)}`,
      })
    }
  }
  return res
}

// console.log(fn4('abcd'))

// 有重复字母的排列组合
// 原字符串不排序的情况下
// 1、map去重pre
// 2、set去掉已经在next中选择过的字母

// 原字符串排序的情况下
// 在next中选择过的字母
const repeatFun = (s) => {
  const map = new Map()
  const stack = [
    {
      pre: '',
      next: s,
    },
  ]
  const res = []
  while (stack.length) {
    const cur = stack.shift()
    const next = cur.next
    const nextLen = next.length
    if (!nextLen) {
      res.push(cur.pre)
      continue
    }
    for (let i = 0; i < nextLen; i++) {
      pre = `${cur.pre}${next[i]}`
      if (map.has(pre)) continue
      map.set(pre, 1)
      stack.unshift({
        pre,
        next: `${next.slice(0, i)}${next.slice(i + 1)}`,
      })
    }
  }
  return res
}
const repeatFun2 = (s) => {
  const stack = [
    {
      pre: '',
      next: s,
    },
  ]
  const res = []
  while (stack.length) {
    const cur = stack.shift()
    const next = cur.next
    const nextLen = next.length
    if (!nextLen) {
      res.push(cur.pre)
      continue
    }
    const set = new Set()
    for (let i = 0; i < nextLen; i++) {
      if (set.has(next[i])) continue
      set.add(next[i])
      stack.unshift({
        pre: pre + next[i],
        next: `${next.slice(0, i)}${next.slice(i + 1)}`,
      })
    }
  }
  return res
}
const repeatFun3 = (s) => {
  s = s.split('').sort().join('')
  const stack = [
    {
      pre: '',
      next: s,
    },
  ]
  const res = []
  while (stack.length) {
    const cur = stack.shift()
    const next = cur.next
    const nextLen = next.length
    if (!nextLen) {
      res.push(cur.pre)
      continue
    }
    for (let i = 0; i < nextLen; i++) {
      while (next[i] === next[i + 1]) {
        i++
      }
      if (i === nextLen) break
      stack.unshift({
        pre: `${cur.pre}${next[i]}`,
        next: `${next.slice(0, i)}${next.slice(i + 1)}`,
      })
    }
  }
  return res
}

// console.log(repeatFun('abbc'), repeatFun3('abbc'))
// console.log(repeatFun('abbc').join(',') === repeatFun3('abbc').join(','))

const stoneGame = (piles) => {
  const l = piles.length
  const dp = new Array(l).fill('').map(() => new Array(l).fill(0))
  for (let i = l - 2; i >= 0; i--) {
    for (let j = i + 1; j < l; j++) {
      dp[i][j] = Math.max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1])
    }
  }
  return dp[0][l - 1] > 0
}
const stoneGame2 = (piles) => {
  const l = piles.length
  const dp = new Array(l).fill(0)
  for (let i = l - 2; i >= 0; i--) {
    for (let j = i + 1; j < l; j++) {
      dp[j] = Math.max(piles[i] - dp[j], piles[j] - dp[j - 1])
    }
  }
  return dp[l - 1] > 0
}
