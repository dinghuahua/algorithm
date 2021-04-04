/**
 * 5705. 判断国际象棋棋盘中一个格子的颜色
 * @param {string} coordinates
 * @return {boolean}
 */
var squareIsWhite = function (coordinates) {
  let map = new Map()
  for (let i = 1; i <= 8; i++) {
    for (let j = 'a'.charCodeAt(); j <= 'a'.charCodeAt() + 8; j++) {
      let key = String.fromCharCode(j) + i
      if (i % 2) {
        map.set(key, !(j % 2))
      } else {
        map.set(key, !!(j % 2))
      }
    }
  }
  return map.get(coordinates)
}

/**
 * 5706. 句子相似性 III
 * @param {string} sentence1
 * @param {string} sentence2
 * @return {boolean}
 */
// 'c h p Ny'
// 'c BDQ r h p Ny'
var areSentencesSimilar = function (
  sentence1 = 'c h p Ny',
  sentence2 = 'c BDQ r h p Ny'
) {
  if (sentence1 === sentence2) return true
  let arr1 = sentence1.split(' '),
    arr2 = sentence2.split(' '),
    maxArr = arr1,
    minArr = arr2
  if (arr1.length < arr2.length) {
    ;[maxArr, minArr] = [minArr, maxArr]
  }
  // console.log(arr1, arr2)
  while (minArr.length) {
    let flag = 0
    if (maxArr[0] === minArr[0]) {
      maxArr.shift()
      minArr.shift()
    } else {
      ++flag
    }
    if (maxArr[maxArr.length - 1] === minArr[minArr.length - 1]) {
      maxArr.pop()
      minArr.pop()
    } else {
      ++flag
    }
    if (flag === 2) return false
  }
  return true
}
var areSentencesSimilar2 = function (
  sentence1 = 'Luky',
  sentence2 = 'Lucccky'
) {
  if (sentence1 === sentence2) return true
  let maxStr = sentence1,
    minStr = sentence2
  if (sentence1.length < sentence2.length) {
    ;[maxStr, minStr] = [minStr, maxStr]
  }
  for (
    let i1 = 0, j1 = minStr.length - 1, i2 = 0, j2 = maxStr.length - 1;
    i1 <= j1 && i2 <= j2;

  ) {
    
    let flag = 0
    console.log(i1, j1, i2, j2)
    if (minStr[i1] === maxStr[i2]) {
      i1++
      i2++
    } else ++flag
    if (minStr[j1] === maxStr[j2]) {
      --j1
      --j2
    } else ++flag
    if (flag === 2) return false
  }
  return true
}
console.log(areSentencesSimilar2())

/**
 * 5708. 统计一个数组中好对子的数目
 * @param {number[]} nums
 * @return {number}
 */
// 超时
var countNicePairs = function (nums = [13, 10, 35, 24, 76]) {
  let map = new Map(),
    m = Math.pow(10, 9) + 7
  for (let i = 0; i < nums.length; i++) {
    map.set(i, +`${nums[i]}`.split('').reverse().join(''))
  }
  let num = 0
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + map.get(j) === map.get(i) + nums[j]) {
        console.log(i, j, nums[i] - map.get(i))
        ++num
      }
    }
  }
  return num % m
}
var countNicePairs2 = function (nums = [13, 10, 35, 24, 76]) {
  let map = new Map(),
    mapDiff = new Map(),
    mapSum = new Map(),
    m = Math.pow(10, 9) + 7

  const getSum = (n) => {
    let sum = 0
    if (mapSum.has(n)) return mapSum.get(n)
    for (var i = 1; i < n; i++) {
      sum += i
    }
    mapSum.set(n, sum)
    return sum
  }

  for (let i = 0; i < nums.length; i++) {
    map.set(i, +`${nums[i]}`.split('').reverse().join(''))
  }
  for (let i = 0; i < nums.length; i++) {
    // nums[i] - ret(nums[i]) = nums[j] - ret(nums[j])
    let diff = nums[i] - map.get(i)
    if (mapDiff.has(diff)) {
      let v = mapDiff.get(diff)
      mapDiff.set(diff, ++v)
    } else mapDiff.set(diff, 1)
  }
  let num = 0
  for (let n of mapDiff.values()) {
    num += getSum(n)
  }
  return num % m
}
// console.log(countNicePairs2())
