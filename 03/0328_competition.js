/**
 * 5714. 替换字符串中的括号内容
 * @param {string} word
 * @return {number}
 */
var numDifferentIntegers = function (word) {
  word = word
    .replace(/[a-z]+/g, ' ')
    .split(' ')
    .filter((a) => a)
    .map((a) => +a)

  let set = new Set(word)
  return set.size
}
console.log(numDifferentIntegers('leet1234code234'))

/**
 * 5715. 还原排列的最少操作步数
 * @param {number} n
 * @return {number}
 */
var reinitializePermutation = function (n) {
  let perm = new Array(n).fill(0).map((v, i) => i)
  let num = 1,
    str = perm.join(',')

  const fun = (arr) => {
    return arr.map((item, index) => {
      return index % 2 ? arr[n / 2 + (index - 1) / 2] : arr[index / 2]
    })
  }
  while (((perm = fun(perm)), perm.join(',')) !== str) {
    ++num
  }
  return num
}
// console.log(reinitializePermutation(6))

/**
 * 5713. 字符串中不同整数的数目
 * @param {string} s
 * @param {string[][]} knowledge
 * @return {string}
 */
var evaluate = function (
  s = '(name)is(age)yearsold',
  knowledge = [
    ['name', 'bob'],
    ['age', 'two'],
  ]
) {
  const map = new Map(knowledge)

  return s.replace(/\(([a-z]+)\)/g, (word, $1) => {
    return map.get($1) || '?'
  })
}
// console.log(evaluate())

/**
 * 5716. 好因子的最大数目5716. 好因子的最大数目
 * @param {number} primeFactors
 * @return {number}
 */
var maxNiceDivisors = function (primeFactors) {
  let set = new Set()
  const fun = (n) => {
    for (var i = 1; i <= n; i++) {
      if (num % i == 0) set.add(i)
    }
  }
  function isPrime(n) {
    for (let i = 2; i < n; i++) {
      if (n % i === 0) {
        return false //质数
      }
    }
    return true //非质数
  }
  let n = 2
  while (primeFactors) {
    
  }
}
