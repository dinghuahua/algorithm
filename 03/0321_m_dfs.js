// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
/**
 * 17. 电话号码的字母组合
 * @param {string} digits
 * @return {string[]}
 */
var map = new Map([
  ['2', 'abc'],
  ['3', 'def'],
  ['4', 'ghi'],
  ['5', 'jkl'],
  ['6', 'mno'],
  ['7', 'pqrs'],
  ['8', 'tuv'],
  ['9', 'wxyz'],
])
// 迭代
var letterCombinations = function (digits) {
  if (!digits.length) return []
  var map = new Map([
    ['2', 'abc'],
    ['3', 'def'],
    ['4', 'ghi'],
    ['5', 'jkl'],
    ['6', 'mno'],
    ['7', 'pqrs'],
    ['8', 'tuv'],
    ['9', 'wxyz'],
  ])
  let strArr = [].map.call(digits, (s) => (map.has(s) ? map.get(s) : ''))
  let maxLen = digits.length
  let stack = [{ next: strArr, pre: '' }]
  let res = []
  while (stack.length) {
    const cur = stack.shift(),
      next = cur.next,
      pre = cur.pre
    if (pre.length === maxLen) {
      res.push(pre)
      continue
    }
    if (!next.length) return
    for (var i = 0; i < next.length; i++) {
      for (var j = 0; j < next[i].length; j++) {
        stack.unshift({
          next: [...next.slice(i + 1)],
          pre: pre + next[i][j],
        })
      }
    }
  }
  return res
}
var letterCombinations1 = function (digits) {
  if (!digits.length) return []
  let strArr = [].map.call(digits, (s) => (map.has(s) ? map.get(s) : ''))
  let maxLen = digits.length
  let stack = [{ next: strArr, pre: '' }]
  let res = []
  while (stack.length) {
    const cur = stack.shift(),
      next = cur.next,
      pre = cur.pre
    if (pre.length === maxLen) {
      res.push(pre)
      continue
    }
    if (!next.length) return
    for (var i = 0; i < next[0].length; i++) {
      stack.unshift({
        next: [...next.slice(1)],
        pre: pre + next[0][i],
      })
    }
  }
  return res
}
var letterCombinations2 = function (digits) {
  if (!digits.length) return []
  let res = ['']
  for (const s of digits) {
    const temp = []
    for (const i of map.get(s)) {
      const list = res.map((item) => `${item}${i}`)
      temp.push(...list)
    }
    res = temp
  }
  return res
}
var letterCombinations3 = function (digits) {
  const l = digits.length
  if (!l) return []
  const res = ['']
  for (let i = 0; i < l; i++) {
    const jl = res.length
    for (let j = 0; j < jl; j++) {
      const item = res.shift()
      for (const s of map.get(digits[i])) {
        res.push(`${item}${s}`)
      }
    }
  }
  return res
}
// 递归
var letterCombinations4 = function (digits) {
  if (!digits.length) return []
  let strArr = [].map.call(digits, (s) => (map.has(s) ? map.get(s) : ''))
  let res = []
  const dfs = (pre, next) => {
    if (pre.length === digits.length) {
      res.push(pre)
      return
    }
    if (!next.length) return
    for (var i = 0; i < next.length; i++) {
      for (var j = 0; j < next[i].length; j++) {
        dfs(pre + next[i][j], [...next.slice(i + 1)])
      }
    }
  }
  dfs('', strArr)
  return res
}
var letterCombinations5 = function (digits) {
  if (!digits.length) return []
  let strArr = [].map.call(digits, (s) => (map.has(s) ? map.get(s) : ''))
  let res = []
  const dfs = (pre, next) => {
    if (pre.length === digits.length) {
      res.push(pre)
      return
    }
    if (!next.length) return
    for (var i = 0; i < next[0].length; i++) {
      // 每次都创建了新数组，进行保存下标优化
      dfs(pre + next[0][i], next.slice(1))
    }
  }
  dfs('', strArr)
  return res
}
var letterCombinations6 = function (digits) {
  if (!digits.length) return []
  let res = []
  const dfs = (pre = '', index = 0) => {
    if (pre.length === digits.length) {
      res.push(pre)
      return
    }
    if (index === digits.length) return
    const str = map.get(digits[index])
    for (var i = 0; i < str.length; i++) {
      // 每次都创建了新数组，进行保存下标优化
      dfs(pre + str[i], index + 1)
    }
  }
  dfs()
  return res
}
//尾递归
var letterCombinations7 = function (digits, pre = '', index = 0) {
  if (!digits.length) return []
  if (index === digits.length) {
    return [pre]
  }
  const curs = map.get(digits[index])
  return [...curs].reduce((sum, item) => {
    return sum.concat(letterCombinations(digits, pre + item, index + 1))
  }, [])
}
//一个临时变量
var letterCombinations8 = function (digits) {
  const res = []
  let cur = ''
  const l = digits.length
  if (!l) return []
  const dfs = (index = 0) => {
    if (index === l) {
      res.push(cur)
      return
    }
    const curs = map.get(digits[index])
    for (const s of curs) {
      cur += s
      dfs(index + 1)
      cur = cur.slice(0, cur.length - 1)
    }
  }
  dfs()
  return res
}

console.log(letterCombinations6('234'))
