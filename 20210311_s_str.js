// 给你一个字符串 s ，请你根据下面的算法重新构造字符串：
// 从 s 中选出 最小 的字符，将它 接在 结果字符串的后面。
// 从 s 剩余字符中选出 最小 的字符，且该字符比上一个添加的字符大，将它 接在 结果字符串后面。
// 重复步骤 2 ，直到你没法从 s 中选择字符。
// 从 s 中选出 最大 的字符，将它 接在 结果字符串的后面。
// 从 s 剩余字符中选出 最大 的字符，且该字符比上一个添加的字符小，将它 接在 结果字符串后面。
// 重复步骤 5 ，直到你没法从 s 中选择字符。
// 重复步骤 1 到 6 ，直到 s 中所有字符都已经被选过。
// 在任何一步中，如果最小或者最大字符不止一个 ，你可以选择其中任意一个，并将其添加到结果字符串。
// 请你返回将 s 中字符重新排序后的 结果字符串 。

/**
 * 1370. 上升下降字符串
 * @param {string} s
 * @return {string}
 */
var sortString = function (s) {
  s = s.split('').sort((a, b) => {
    return a.charCodeAt() - b.charCodeAt()
  }).join('')
  let arr = s.match(/(.)\1*/g), res = ''

  let letterArr = [], map = new Map()
  // for (var i = 0; i < arr.length; i++) {
  //   const lettter = arr[i][0]
  //   letterArr.push(lettter)
  //   map.set(lettter, lettter.length)
  // }
  while (arr.length) {
    if (arr.length == 1) { res += arr[0]; break }
    let temp = ''
    for (var i = arr.length - 1; i >= 0; i--) {
      if (arr[i].length) {
        temp = arr[i][0] + temp
        arr[i] = arr[i].slice(0, -1)
      } else {
        arr.splice(i, 1)
      }
    }
    res += temp
    for (var i = arr.length - 1; i >= 0; i--) {
      if (arr[i].length) {
        res += arr[i][0]
        arr[i] = arr[i].slice(0, -1)
      } else {
        arr.splice(i, 1)
      }
    }
  }
  return res
};
// console.log(sortString("ggggggg"))


// 给你一个数组 items ，其中 items[i] = [typei, colori, namei]，描述第 i 件物品的类型、颜色以及名称。
// 另给你一条由两个字符串 ruleKey 和 ruleValue 表示的检索规则。
// 如果第 i 件物品能满足下述条件之一，则认为该物品与给定的检索规则 匹配 ：
// ruleKey == "type" 且 ruleValue == typei 。
// ruleKey == "color" 且 ruleValue == colori 。
// ruleKey == "name" 且 ruleValue == namei 。
// 统计并返回 匹配检索规则的物品数量 

/**
 * 1773. 统计匹配检索规则的物品数量
 * @param {string[][]} items
 * @param {string} ruleKey
 * @param {string} ruleValue
 * @return {number}
 */
var countMatches = function (items, ruleKey, ruleValue) {
  var map = new Map([['type', 0], ['color', 1], ['name', 2]])
  const result = items.reduce((pre, item) => {
    if (item[map.get(ruleKey)] === ruleValue) pre.push(item)
    return pre
  }, [])
  return result.length
};
// console.log(countMatches([["phone", "blue", "pixel"], ["computer", "silver", "lenovo"], ["phone", "gold", "iphone"]], "color", "silver"))

// 如果字符串满足以下条件之一，则可以称之为 有效括号字符串（valid parentheses string，可以简写为 VPS）：
// 字符串是一个空字符串 ""，或者是一个不为 "(" 或 ")" 的单字符。
// 字符串可以写为 AB（A 与 B 字符串连接），其中 A 和 B 都是 有效括号字符串 。
// 字符串可以写为(A) ，其中 A 是一个 有效括号字符串 。
// 类似地，可以定义任何有效括号字符串 S 的 嵌套深度 depth(S) ：
// depth("") = 0
// depth(C) = 0，其中 C 是单个字符的字符串，且该字符不是 "(" 或者 ")"
// depth(A + B) = max(depth(A), depth(B)) ，其中 A 和 B 都是 有效括号字符串
// depth("(" + A + ")") = 1 + depth(A) ，其中 A 是一个 有效括号字符串
// 例如：""、"()()"、"()(()())" 都是 有效括号字符串（嵌套深度分别为 0、1、2），而 ")(" 、"(()" 都不是 有效括号字符串 。
// 给你一个 有效括号字符串 s，返回该字符串的 s 嵌套深度 。

/**
 * 1614. 括号的最大嵌套深度
 * @param {string} s
 * @return {number}
 */
var maxDepth = function (s) {
  s = s.replace(/[^()]/g, '')
  let max = 0, stack = []
  for (var i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push('(')
    } else {
      max = Math.max(max, stack.length)
      stack.pop()
    }
  }
  return max
};
// console.log(maxDepth("(1+(2*3)+((8)/4))+1"))


// 给你一个字符串 s，它仅由字母 'a' 和 'b' 组成。每一次删除操作都可以从 s 中删除一个回文 子序列。
// 返回删除给定字符串中所有字符（字符串为空）的最小删除次数。
// 「子序列」定义：如果一个字符串可以通过删除原字符串某些字符而不改变原字符顺序得到，那么这个字符串就是原字符串的一个子序列。
// 「回文」定义：如果一个字符串向后和向前读是一致的，那么这个字符串就是一个回文。
/**
 * @param {string} s
 * @return {number}
 */
var removePalindromeSub = function (s) {
  let num = 1
  for (var i = 0, len = s.length, j = len - 1; i < j;) {
    if (s[i] === s[j]) {
      ++i
      --j
    } else ++num
    --j
  }
  return num
};