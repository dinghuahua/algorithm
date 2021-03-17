// 给定一个字符串，输出所有字符的排列组合 不考虑字符串中的出现重复字符
// abc, acb, bac, bca, cab, cba

var getAllStr = (str = 'abcd') => {
  var strArr = [str, str.split('').reverse().join('')]
  var resStrArr = []

  for (var k = 0; k < strArr.length; k++) {
    var item = strArr[k]
    for (var i = 0; i < item.length; i++) {
      var remain = item.substring(0, i) + item.substring(i + 1, item.length)
      var curStr = remain + item[i]
      !resStrArr.includes(curStr) ? resStrArr.push(curStr) : ''
      for (var j = 0; j <= remain.length; j++) {
        let remainArr = remain.split('')
        remainArr.splice(j, 0, item[i])
        curStr = remainArr.join('')
        !resStrArr.includes(curStr) ? resStrArr.push(curStr) : ''
      }
    }
  }
  console.log(resStrArr.join(','))
}
var getAllStr2 = (str = 'abcd') => {
  var resStrArr = []

  // 遍历字符
  for (var i = 0; i < str.length; i++) {
    var curStr = str[i]
    // 当前字符的坑位
    for (var j = 0; j < str.length; j++) {
      for (var k = 0; k < resStrArr.length; k++) {
        resStrArr = resStrArr.concat(resStrArr)
      }
      for (var k = 0; k < resStrArr.length; k++) {
        var strArr = new Array(str.length).fill('')
        strArr[j] = curStr
        var str = strArr.join('')
      }
      console.log(str)
      resStrArr.push(str)
    }
  }
}
const anagrams = (str) => {
  if (str.length <= 2) {
    return str.length === 2 ? [str, str[1] + str[0]] : [str]
  } else {
    return str.split('').reduce(
      (acc, letter, i) =>
        acc.concat(
          anagrams(str.slice(0, i) + str.slice(i + 1)).map((val) => {
            console.log(letter + val)
            return letter + val
          })
        ),
      []
    )
  }
}

// 其实就是，遍历当前字符串，在每一轮中拼接当前字符，将当前字符从原字符串剔除传给下一轮
// 一个循环遍历，在每一轮循环中拼接当前字符串的结果，进行下一轮递归
// 递归函数的参数主要有两个，一个是当前要遍历的字符串，另一个是上一轮拼接的字符串
// 当要遍历的字符串为空，说明拼接结束，当前字符串就是结果之一
// 随机取一个，然后在剩下的字符串中再随机取一个
// 直到取完最后一个

/**
 * 深度迭代版本
 * @param {*} s
 * @returns
 */
const dfsIteration = (s) => {
  const stack = [
    {
      pre: '',
      next: s,
    },
  ]
  //next有值，说明字符还没取完
  while (stack[0].next.length) {
    const cur = stack.shift()
    const next = cur.next
    const nextLen = next.length
    //从剩余字符串中取每一个字符拼接当前字符
    //下一轮循环用到的字符串要去掉当前的字符
    for (let i = 0; i < nextLen; i++) {
      stack.push({
        pre: `${cur.pre}${next[i]}`,
        next: `${next.slice(0, i)}${next.slice(i + 1)}`,
      })
    }
  }
  return stack.map((item) => item.pre)
}

const dfsRecursion = (s) => {
  let arr = []
  const fn = (pre = '', cur = '') => {
    if (cur.length <= 1) {
      arr.push[pre + cur]
    } else {
      fn('', pre)
      for (var i = 0; i < cur.length; i++) {
        fn(pre + cur[i], cur.slice(i + 1))
      }
    }
  }
  fn('', s)
}
console.log(dfsRecursion('1234'))
// console.log(dfsIteration('1234'))
// console.log(anagrams('1234'))
// getAllStr()
