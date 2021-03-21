// 给你一个仅包含小写英文字母和 '?' 字符的字符串 s，请你将所有的 '?' 转换为若干小写字母，使最终的字符串不包含任何 连续重复 的字符。
// 注意：你 不能 修改非 '?' 字符。
// 题目测试用例保证 除 '?' 字符 之外，不存在连续重复的字符。
// 在完成所有转换（可能无需转换）后返回最终的字符串。如果有多个解决方案，请返回其中任何一个。可以证明，在给定的约束条件下，答案总是存在的。

/**
 * 1576. 替换所有的问号
 * @param {string} s
 * @return {string}
 */
var modifyString = function (s) {
  let ms = '',
    len = s.length,
    allLetter = 'abcdefghijklmnopqrstuvwxyz'.split('')

  for (var i = 0; i < len; i++) {
    if (s[i] !== '?') {
      ms += s[i]
    } else {
      let pre = i ? ms[i - 1] : '-1',
        next = i + 1 > len ? '' : s[i + 1],
        preIndex = allLetter.indexOf(pre),
        curIndex = preIndex + 1 >= 26 ? 0 : preIndex + 1

      if (allLetter[curIndex] !== next) {
        ms += allLetter[curIndex]
      } else {
        curIndex = curIndex + 1 >= 26 ? 0 : curIndex + 1
        ms += allLetter[curIndex]
      }
    }
  }
  return ms
}
var modifyString2 = function (s) {
  let modifyStr = '',
    len = s.length

  function getCurCharByPre(char) {
    let preCode = /[a-z]/.test(char) ? char.charCodeAt() : 96,
      curCode = 97 + ((preCode - 97 + 1) % 26)

    return String.fromCharCode(curCode)
  }
  for (var i = 0; i < len; i++) {
    if (s[i] !== '?') {
      modifyStr += s[i]
    } else {
      let pre = i ? modifyStr[i - 1] : '',
        next = i + 1 > len ? '' : s[i + 1],
        curChar = getCurCharByPre(pre)

      if (curChar === next) {
        curChar = getCurCharByPre(next)
      }
      modifyStr += curChar
    }
  }
  return modifyStr
}
// 无需考虑边界，undefined 不影响结果
var modifyString3 = function (s) {
  let modifyStr = '',
    len = s.length

  for (var i = 0; i < len; i++) {
    if (s[i] !== '?') {
      modifyStr += s[i]
    } else {
      let v = 97
      while (
        String.fromCharCode(v) === modifyStr[i - 1] ||
        String.fromCharCode(v) === s[i + 1]
      ) {
        v++
      }

      modifyStr += String.fromCharCode(v)
    }
  }
  return modifyStr
}

// 给定两个由小写字母构成的字符串 A 和 B ，只要我们可以通过交换 A 中的两个字母得到与 B 相等的结果，就返回 true ；否则返回 false 。
// 交换字母的定义是取两个下标 i 和 j （下标从 0 开始），只要 i != j 就交换 A[i] 和 A[j] 处的字符。例如，在 "abcd" 中交换下标 0 和下标 2 的元素可以生成 "cbad" 。
/**
 * 859. 亲密字符串
 * @param {string} a
 * @param {string} b
 * @return {boolean}
 */
var buddyStrings = function (a, b) {
  if (a.length !== b.length) return false
  let diff = []
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      diff.push([a[i], b[i]])
    }
  }
  if (!diff.length) {
    if (!/([a-z]).*\1/.test(a)) return false
    return true
  }
  if (diff.length !== 2) return false
  let first = diff[0],
    second = diff[1]
  if (first[0] !== second[1] || first[1] !== second[0]) return false
  return true
}
var buddyStrings2 = function (a, b) {
  if (a.length !== b.length) return false
  let diff = []
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      diff.push([a[i], b[i]])
    }
  }
  if (!diff.length) {
    return /([a-z]).*\1/.test(a)
  }
  if (diff.length !== 2) return false
  let first = diff[0],
    second = diff[1]
  return first[0] == second[1] && first[1] === second[0]
}

// 给你一个字符串 s，请你返回 两个相同字符之间的最长子字符串的长度 ，计算长度时不含这两个字符。如果不存在这样的子字符串，返回 - 1 。
// 子字符串 是字符串中的一个连续字符序列。

/**
 * 🌟🌟🌟
 * 1624. 两个相同字符之间的最长子字符串
 * @param {string} s
 * @return {number}
 */
var maxLengthBetweenEqualCharacters = function (s) {
  if (s.length < 2) return -1
  let front = 0,
    behind = s.length - 1,
    maxLen = 0
  while (front < behind) {
    if (s[front] !== s[behind]) {
      // lastIndexOf indexOf 循环
      var fLast = s.lastIndexOf(s[front]),
        bFirst = s.indexOf(s[behind])
      if (fLast !== -1) {
        maxLen = Math.max(maxLen, fLast - front + 1)
      }
      if (bFirst !== -1) {
        maxLen = Math.max(maxLen, behind - bFirst + 1)
      }
      ++front
      --behind
    } else {
      maxLen = Math.max(maxLen, behind - front + 1)
      break
    }
  }
}
var maxLengthBetweenEqualCharacters2 = function (s) {
  var len = s.length
  if (len < 2) return -1
  var map = new Map(),
    max = -1

  // 明确目的：最长子字符串
  // 用map 做缓存，存储字符第一次出现的问题
  for (var i = 0; i < len; i++) {
    var char = s[i]
    if (!map.has(char)) map.set(char, i)
    else {
      max = Math.max(max, i - map.get(char) - 1)
    }
  }
  return max
}
