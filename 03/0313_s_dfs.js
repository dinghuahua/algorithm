// 给你一份旅游线路图，该线路图中的旅行线路用数组 paths 表示，其中 paths[i] = [cityAi, cityBi] 表示该线路将会从 cityAi 直接前往 cityBi 。请你找出这次旅行的终点站，即没有任何可以通往其他城市的线路的城市。
// 题目数据保证线路图会形成一条不存在循环的线路，因此只会有一个旅行终点站。
/**
 * 1436. 旅行终点站
 * @param {string[][]} paths
 * @return {string}
 */
var destCity = function (paths) {
  var map = new Map()
  for (var i = 0; i < paths.length; i++) {
    // 头-1 尾1
    if (!map.has(paths[i][0])) {
      map.set(paths[i][0], -1)
    } else {
      !map.get(paths[i][0]) - 1 && map.delete(paths[i][0])
    }
    if (!map.has(paths[i][1])) {
      map.set(paths[i][1], 1)
    } else {
      !map.get(paths[i][1]) + 1 && map.delete(paths[i][1])
    }
  }
  let end = ''
  for (let [key, value] of map) {
    value === 1 && (end = key)
  }
  return end
}
var destCity2 = function (paths) {
  var map = new Map()
  for (var i = 0; i < paths.length; i++) {
    map.set(paths[i][0], paths[i][1])
  }
  let end = ''
  for (let value of map.values()) {
    if (!map.get(value)) {
      end = value
      break
    }
  }
  return end
}
var destCity3 = function (paths) {
  var map = new Map(paths)
  let end = ''
  for (let value of map.values()) {
    if (!map.get(value)) {
      end = value
      break
    }
  }
  return end
}

// console.log(
//   destCity2([
//     ['jMgaf WaWA', 'iinynVdmBz'],
//     [' QCrEFBcAw', 'wRPRHznLWS'],
//     ['iinynVdmBz', 'OoLjlLFzjz'],
//     ['OoLjlLFzjz', ' QCrEFBcAw'],
//     ['IhxjNbDeXk', 'jMgaf WaWA'],
//     ['jmuAYy vgz', 'IhxjNbDeXk'],
//   ])
// )

// 如果不是所有的地点都到达过
// 给定起点和路线，求最后到达的终点，不存在循环
// 城市有 abcde，路线是
// b->c->e
// 会给定起点 求终点 就是求e
// 给定城市数量N，编号从0 - N - 1，给定一组路径，
// 路径的每个元素[a, b]表示从a到b，路径不存在循环。
// 给定起点X，求最终到达的终点
var destCity4 = function (
  paths = [
    [3, 4],
    [1, 0],
    [2, 3],
    [4, 1],
    [0, 5],
  ],
  start = 2
) {
  var map = new Map(paths)

  while (map.get(start) || map.get(start) === 0) {
    start = map.get(start)
  }
  return start
}
console.log(destCity4())

// 在一个 平衡字符串 中，'L' 和 'R' 字符的数量是相同的。
// 给你一个平衡字符串 s，请你将它分割成尽可能多的平衡字符串。
// 注意：分割得到的每个字符串都必须是平衡字符串。
// 返回可以通过分割得到的平衡字符串的 最大数量 。
/**
 * 1221. 分割平衡字符串
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function (s) {
  let splitStrLength = 0,
    balancedNum = 0

  for (var i = 0; i < s.length; i++) {
    if (s[i] === 'L') {
      balancedNum -= 1
      !balancedNum && ++splitStrLength
    }
    if (s[i] === 'R') {
      balancedNum += 1
      !balancedNum && ++splitStrLength
    }
  }
  return splitStrLength
}

// 给你一个整数 n，请你每隔三位添加点（即 "." 符号）作为千位分隔符，并将结果以字符串格式返回。
/**
 * 1556. 千位分隔数
 * @param {number} n
 * @return {string}
 */
var thousandSeparator = function (n) {
  n = `${n}`
  return n.replace(/(?!^)(?=(\d{3})+$)/g, '.')
}
var thousandSeparator2 = function (n) {
  n = `${n}`
  let res = ''
  for (var j = n.length; j >= 0; j += -3) {
    let temp = n.substring(j - 3, j)
    res = (j - 3 > 0 ? '.' : '') + temp + res
  }
  return res
}
// console.log(thousandSeparator2(234567890))

// 对于字符串 S 和 T，只有在 S = T + ... + T（T 自身连接 1 次或多次）时，我们才认定 “T 能除尽 S”。
// 返回最长字符串 X，要求满足 X 能除尽 str1 且 X 能除尽 str2。
/**
 * 1071. 字符串的最大公因子
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function (str1, str2) {
  let shortStr, longStr
  if (str1.length < str2.length) {
    shortStr = str1
    longStr = str2
  } else {
    shortStr = str2
    longStr = str1
  }
  let tempShortStr = shortStr
  while (tempShortStr.length) {
    // /(ABAB)+/g.test('ABABAB') => true 不可以用test
    if (
      !longStr.replace(new RegExp(`(${tempShortStr})+`, 'g'), '').length &&
      !shortStr.replace(new RegExp(`(${tempShortStr})+`, 'g'), '').length
    ) {
      break
    } else {
      tempShortStr = tempShortStr.substring(0, tempShortStr.length - 1)
    }
  }
  return tempShortStr
}
var gcdOfStrings1 = function (str1, str2) {
  let shortStr, longStr
  if (str1.length < str2.length) {
    shortStr = str1
    longStr = str2
  } else {
    shortStr = str2
    longStr = str1
  }

  let tempShortStr = shortStr
  while (tempShortStr.length) {
    // /(ABAB)+/g.test('ABABAB') => true 不可以用test
    // /^(ABAB)+$/g.test('ABABAB') => true 不可以用test
    if (
      new RegExp(`^(${tempShortStr})+$`, 'g').test(longStr) &&
      new RegExp(`^(${tempShortStr})+$`, 'g').test(shortStr)
    ) {
      break
    } else {
      tempShortStr = tempShortStr.substring(0, tempShortStr.length - 1)
    }
  }
  return tempShortStr
}
var gcdOfStrings2 = function (str1, str2) {
  const gcd = (a, b) => {
    var remainder = a % b
    while (remainder != 0) {
      a = b
      b = remainder
      remainder = a % b
    }
    return b
  }
  // 另外假设a = m*x，b = n*x
  // 所以，如果a不是b的整数倍，那么，a - b = (m - n)x，也将会是x的倍数。
  // 所以变成了求b和 a - b的最大公约数
  // 考虑到a大于2b的情况，减法换成取余

  // 9193和3567，先用9193÷3567，商2余2059，再用3567÷2059，商1余1508，
  // 2059÷1508，商1余551, 1508÷551，商2余406，551÷406，商1余145，
  // 406÷145，商2余116，145÷116，商1余29，116÷29，商4除尽。所以最大公约数 29

  const gcd = (a, b) => {
    if (!b) return a
    return gcd(b, a % b)
  }

  if (!str1.concat(str2).equals(str2.concat(str1))) {
    return ''
  }
  return str1.substring(0, gcd(str1.length(), str2.length()))
}
// console.log(gcdOfStrings('ABABAB', 'ABAB'))
// console.log(
//   gcdOfStrings1(
//     'TAUXXTAUXXTAUXXTAUXXTAUXX',
//     'TAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXX'
//   )
// )
