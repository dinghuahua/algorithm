/**
 * 1282. 用户分组
 * @param {number[]} groupSizes
 * @return {number[][]}
 */
var groupThePeople = function (groupSizes) {
  //不能排序，因为会改变下标
  // groupSizes.sort((a,b)=>a-b)
  const len = groupSizes.length
  // 当前元素是否已经使用过
  let arr = new Array(len).fill(0)
  let res = []
  for (let i = 0; i < len; i++) {
    if (arr[i]) continue
    let size = groupSizes[i] - 1,
      temp = [i]
    arr[i] = true
    // 找相同的分组，并限制大小为size
    for (let j = i + 1; j < len; j++) {
      if (!size) break
      if (groupSizes[j] === groupSizes[i] && !arr[j]) {
        temp.push(j)
        --size
        arr[j] = true
      }
    }
    // console.log(temp)
    res.push(temp)
  }
  return res
}

/**
 * 1111. 有效括号的嵌套深度
 * @param {string} seq
 * @return {number[]}
 */
// 读不懂题
var maxDepthAfterSplit = function (seq) {}

/**
 * 763. 划分字母区间
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = function (S) {
  const len = S.length,
    map = new Map(),
    res = []

  for (let i = 0; i < len; i++) {
    // 记录相同的字母最后一次出现的位置
    map.set(S[i], i)
  }
  // console.log(map)
  for (let i = 0; i < len; ) {
    let last = map.get(S[i])
    // 当前字母是最后一个位置时，说明只有一个
    if (i === last) {
      res.push(1)
      i++
      continue
    }
    if (len === last) {
      res.push(last - i + 1)
      break
    }
    let j = i + 1
    // 动态变更last的值
    for (; j < last && j < len; j++) {
      let c = S[j],
        newLast = map.get(c)
      // 中间的字母最后一次出现的位置大于当前的last,则变更last
      if (newLast > last) last = newLast
    }
    // console.log(i,j)
    res.push(j - i + 1)
    i = j + 1
  }
  return res
}

/**
 * 406. 根据身高重建队列
 * @param {number[][]} people
 * @return {number[][]}
 */
//不会
var reconstructQueue = function (people) {
  let res = [],
    len = people.length
  // 按照身高排序
  people.sort((a, b) => a[0] - b[0])

  while (res.length === len) {
    let j = people[0][1]
    if (res[j]) {
    }
    res[j] = people[0]
  }
}

/**
 * 1338. 数组大小减半
 * @param {number[]} arr
 * @return {number}
 */
var minSetSize = function (arr) {
  let len = arr.length,
    map = new Map()

  // 查找相同的数字出现的次数
  for (let i = 0; i < len; i++) {
    map.set(arr[i], (map.get(arr[i]) ?? 0) + 1)
  }
  // 获取次数列表，并进行降序排序
  let numArr = Array.from(map.values()).sort((a, b) => b - a),
    min = 0,
    curLen = 0
  // console.log(numArr)
  // 累加出现的次数大于一半时就break
  for (let i = 0; i < numArr.length; i++) {
    curLen += numArr[i]
    min++
    if (curLen >= len / 2) break
  }
  return min
}
