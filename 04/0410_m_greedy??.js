/**
 * 1029. 两地调度
 * @param {number[][]} costs
 * @return {number}
 */
var twoCitySchedCostError = function (costs) {
  const len = costs.length
  costs.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]))
  // console.log(costs)
  let p = 0
  for (let i = 0; i < len; i++) {
    const [a, b] = costs[i]
    if (i < len / 2) {
      p += a
    } else {
      p += b
    }
  }
  return p
}
// [[259, 770], [448, 54], [926, 667], [184, 139], [840, 118], [577, 469]]
var twoCitySchedCost2 = function (costs) {
  const len = costs.length
  // 按照去AB差值升序排序，前N去A,后N也就是AB差值最大的即去B最便宜的，即总价值最便宜的
  costs.sort((a, b) => a[0] - a[1] - (b[0] - b[1]))
  let price = 0
  for (let i = 0; i < len; i++) {
    price += i < len / 2 ? costs[i][0] : costs[i][1]
  }
  return price
}

/**
 * 621. 任务调度器
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastIntervalError = function (tasks, n) {
  const len = tasks.length,
    map = new Map()

  for (let i = 0; i < len; i++) {
    map.set(tasks[i], (map.get(tasks[i]) ?? 0) + 1)
  }
  // console.log(map)
  let t = 0,
    i = len,
    //上一轮待命时间
    pre = 0

  while (i) {
    let size = map.size
    t += pre
    for (const [t, n] of map) {
      if (n === 1) map.delete(t)
      else map.set(t, n - 1)
    }
    t += size
    pre = size > n ? 0 : n + 1 - size
    i -= size
    console.log(map, t, pre, i)
  }
  return t
}
var leastIntervalError = function (tasks, n) {
  if (!n) return tasks.length
  const len = tasks.length,
    map = new Map(),
    map2 = new Map()
  for (let i = 0; i < len; i++) {
    map.set(tasks[i], (map.get(tasks[i]) ?? 0) + 1)
  }
  // console.log(map)
  let res = [],
    i = len

  while (i) {
    let size = map.size
    if (size > n) {
      let temp = n + 1
      for (let [t, n] of map) {
        const last = res?.[res.length - 1]
        const diff = res.length - map2.get(t)
        if (diff <= n) {
          res = res.concat(','.repeat(n - diff + 1).split(''))
        }
        if (t === last) res.push(',')
        res.push(t)
        map2.set(t, res.length - 1)
        if (n === 1) map.delete(t)
        else map.set(t, n - 1)
        if (temp--) break
      }
      i -= n + 1
    } else {
      for (let [t, n] of map) {
        const last = res?.[res.length - 1]
        const diff = res.length - map2.get(t)
        if (diff <= n) {
          res = res.concat(','.repeat(n - diff + 1).split(''))
        }
        if (t === last) res.push(',')
        res.push(t)
        map2.set(t, res.length - 1)
        if (n === 1) map.delete(t)
        else map.set(t, n - 1)
      }

      i -= size
    }
    // i -= n ? Math.min(size,n): size
  }
  console.log(res)
  return res.length
}
var leastInterval = function (tasks, n) {
  if (!n) return tasks.length
  const len = tasks.length,
    map = new Map(),
    map2 = new Map(),
    res = []
  for (let i = 0; i < len; i++) {
    map.set(tasks[i], (map.get(tasks[i]) ?? 0) + 1)
  }

  for (let [t, n] of map.entries()) {
    res = res.concat(t.repeat(n).split('').join(','.repeat(n)).split(''))
  }

  console.log(res)
  return res.length
}
leastInterval(['A', 'A', 'A', 'B'], 2)

/**
 * 1433. 检查一个字符串是否可以打破另一个字符串
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkIfCanBreak = function (s1, s2) {
  let arr1 = s1.split('').sort()
  let arr2 = s2.split('').sort()

  let flag1 = true,
    flag2 = true
  for (let i = 0; i < arr1.length; i++) {
    // s1 打破 s2
    if (arr1[i] < arr2[i]) flag1 = false
  }

  for (let i = 0; i < arr1.length; i++) {
    // s2 打破 s1
    if (arr2[i] < arr1[i]) flag2 = false
  }
  return flag1 || flag2
}
