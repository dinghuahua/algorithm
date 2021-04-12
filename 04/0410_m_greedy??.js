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
 * 🌟🌟🌟🌟🌟
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
var leastIntervalError = function (tasks, n) {
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
var leastInterval = function (tasks, n) {
  if (!n) return tasks.length;
  const l = tasks.length;
  // 最大次数相同的任务的数量 比如a、b任务出现的次数都是最大，并且次数还相同，那么x=2
  let x = 0;
  // 找相同的任务出现的最大次数
  let k = 0;
  const map = new Map();
  for (const t of tasks) {
    map.set(t, (map.get(t) || 0) + 1);
    if (map.get(t) > k) {
      k = map.get(t);
      x = 1;
    } else if (map.get(t) === k) {
      x++;
    }
  }
  // a...a...a...a      ==>(n + 1) * (k - 1)
  // abcdaefgahijkalmn  ==>l
  // ab..ab..ab..ab     ==>为什么+x
  // 每一段有(n + 1)时间片(任务+等待时间)， 总共有k段，x最大次数相通的尾端节点
  return Math.max(l, (n + 1) * (k - 1) + x);
};
var leastInterval2 = function (tasks, n) {
  if (!n) return tasks.length;
  const map = new Map();
  let max = 0;
  let list = [];
  for (const k of tasks) {
    map.set(k, (map.get(k) || 0) + 1);
    if (max < map.get(k)) {
      max = map.get(k);
      list.splice(0, Infinity, k);
    } else if (max === map.get(k)) {
      list.push(k);
    }
  }
  return Math.max((max - 1) * (n + 1) + list.length, tasks.length);
};
leastInterval(['A', 'A', 'A', 'B'], 2)

/**
 * 🌟🌟🌟🌟
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
// 前缀和
var checkIfCanBreak2 = function (s1, s2) {
  const arr1 = new Array(27).fill(0);
  const arr2 = new Array(27).fill(0);
  const l = s1.length;
  for (let i = 0; i < l; i++) {
    arr1[s1[i].charCodeAt() - 97]++;
    arr2[s2[i].charCodeAt() - 97]++;
  }
  for (let i = 1; i < 26; i++) {
    arr1[i] = arr1[i - 1] + arr1[i];
    arr2[i] = arr2[i - 1] + arr2[i];
  }
  // 尾缀合
  // for (let i = 25; i >= 0; i++) {
  //   arr1[i] = arr1[i + 1] + arr1[i];
  //   arr2[i] = arr2[i + 1] + arr2[i];
  // }
  let flag1 = true;
  let flag2 = true;
  // 如果只求s1是否可以打破s2,那么应该取前缀和少的，即只需要保留flag1
  // ????
  for (let i = 0; i < 26; i++) {
    flag1 = flag1 && arr1[i] <= arr2[i];
    flag2 = flag2 && arr1[i] >= arr2[i];
  }
  return flag1 || flag2;
};