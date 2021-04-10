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

var groupThePeople2 = function (groupSizes) {
  const map = new Map()

  const l = groupSizes.length
  for (let i = 0; i < l; i++) {
    if (!map.has(groupSizes[i])) {
      map.set(groupSizes[i], [])
    }
    map.get(groupSizes[i]).push(i)
  }
  const res = []
  for (const [size, list] of map.entries()) {
    for (let i = 0; i < list.length / size; i++) {
      res.push(list.slice(i * size, (i + 1) * size))
    }
  }
  return res
}

var groupThePeople3 = function (groupSizes) {
  const map = new Map()
  let res = []
  const l = groupSizes.length
  for (let i = 0; i < l; i++) {
    if (map.has(groupSizes[i])) {
      if (groupSizes[i] === map.get(groupSizes[i]).length) {
        res.push(map.get(groupSizes[i]))
        map.set(groupSizes[i], [])
      }
      // 先处理长度再push 会导致当前push进去的元素没有在for循环中进行判断是否可以装入到res中，
      // 这样就需要在for循环结束后，对map进行处理一次性装入到res中
      map.get(groupSizes[i]).push(i)
    } else {
      map.set(groupSizes[i], [i])
    }
  }
  res = [...res, ...Array.from(map.values())]
  return res
}

var groupThePeople4 = function (groupSizes) {
  const map = new Map()
  const res = []
  const l = groupSizes.length
  for (let i = 0; i < l; i++) {
    if (groupSizes[i] === 1) {
      res.push([i])
      continue
    }
    if (map.has(groupSizes[i])) {
      map.get(groupSizes[i]).push(i)
      if (groupSizes[i] === map.get(groupSizes[i]).length) {
        res.push(map.get(groupSizes[i]))
        map.delete(groupSizes[i])
      }
    } else {
      map.set(groupSizes[i], [i])
    }
  }
  return res
}

/**
 * 1111. 有效括号的嵌套深度
 * @param {string} seq
 * @return {number[]}
 */
// 读不懂题
var maxDepthAfterSplit = function (seq) {
  const res = []
  let v0 = 0,
    v1 = 0
  for (const s of seq) {
    if (s === '(') {
      if (v0 > v1) {
        v1++
        res.push(1)
      } else {
        v0++
        res.push(0)
      }
    } else {
      if (v0 >= v1) {
        v0--
        res.push(0)
      } else {
        v1--
        res.push(1)
      }
    }
  }
  return res
}

var maxDepthAfterSplit = function (seq) {
  let dep = 0

  return seq.split('').map((value, index) => {
    if (value === '(') {
      ++dep
      return dep % 2
    } else {
      let ans = dep % 2
      --dep
      return ans
    }
  })
}

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
      // let c = S[j],
      //   newLast = map.get(c)
      // // 中间的字母最后一次出现的位置大于当前的last,则变更last
      // if (newLast > last) last = newLast
      // 优化成下面的
      last = Math.max(last, map.get(c))
    }
    // console.log(i,j)
    res.push(j - i + 1)
    i = j + 1
  }
  return res
}

var partitionLabels2 = function (S) {
  const len = S.length,
    map = new Map(),
    res = []
  if (len < 2) return [S.length]
  for (let i = 0; i < len; i++) {
    // 记录相同的字母最后一次出现的位置
    map.set(S[i], i)
  }
  let left = 0
  let max = -1
  let right = 0
  // 0 3
  while (right < len) {
    max = Math.max(max, map.get(S[right]))
    if (right === max) {
      res.push(right - left + 1)
      max = -1
      left = right + 1
    }
    right++
  }
  return res
}
/**
 * 406. 根据身高重建队列
 * @param {number[][]} people
 * @return {number[][]}
 */
//不会
var reconstructQueueError = function (people) {
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
// 题解
var reconstructQueue2 = function (people) {
  
}
var reconstructQueue3 = function (people) {
  let len = people.length,
    res = new Array()

  // 按照身高降序排序，身高相同时按照队列前面的人数升序排序
  people.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]))
  // [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 5, 0 ], [ 5, 2 ], [ 4, 4 ]

  // [[7, 0]]
  // [[7, 0], [7, 1]]
  // [[7, 0], [6, 1], [7, 1]]
  // [[5, 0], [7, 0], [6, 1], [7, 1]]
  // [[5, 0], [7, 0], [5, 2], [6, 1], [7, 1]]
  // [[5, 0], [7, 0], [5, 2], [6, 1], [4, 4], [7, 1]]
  
  for (let i = 0; i < len; i++) {
    //K值定义为 排在h前面且身高大于或等于h的人数
    //因为从身高降序开始插入，此时所有人身高都大于等于h
    //因此K值即为需要插入的位置
    res.splice(people[i][1], 0, people[i])
  }
  return res
}
var reconstructQueue4 = function (people) {
  people.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1]
    }
    return b[0] - a[0]
  })
  const stack = []
  for (const item of people) {
    if (!stack.length) {
      stack.push(item)
    } else {
      stack.splice(item[1], 0, item)
    }
  }
  return stack
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
