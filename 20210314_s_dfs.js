var increasingBST = function (root) {
  const head = {}
  let pre = head
  const dfs = (root) => {
    if (!root) return
    dfs(root.left)
    //handle root.left = null;
    pre.right = root
    pre = pre.right
    dfs(root.right)
  }
  dfs(root)
  return head.right
}

var increasingBST = function (root) {
  const head = {}
  let pre = head
  const dfs = (root) => {
    if (!root) return
    dfs(root.left)
    //handle
    root.left = null
    pre.right = root
    pre = pre.right
    dfs(root.right)
  }
  dfs(root)
  return head.right
}

// 递归：
const fn = (s) => {
  const res = []
  const dfs = (next, pre = '') => {
    if (!next) {
      res.push(pre)
      return
    }
    const l = next.length
    for (let i = 0; i < l; i++) {
      dfs(`${next.slice(0, i)}${next.slice(i + 1)}`, `${pre}${next[i]}`)
    }
  }
  dfs(s)
  return res
}

const fn = (s) => {
  s = [...s]
  console.log(s)
  const dfs = (pre, next, res = []) => {
    if (!next.length) return res.concat(pre)
    return next.reduce((res, item, i) => {
      return dfs(
        `${pre}${item}`,
        next.slice(0, i).concat(next.slice(i + 1)),
        res
      )
    }, res)
  }
  return dfs('', s)
}

const fn = (s, pre = '', res = []) => {
  if (!s.length) return res.concat(pre)
  return [].reduce.call(
    s,
    (res, item, i) => {
      return fn(`${s.slice(0, i)}${s.slice(i + 1)}`, `${pre}${item}`, res)
    },
    res
  )
}

// 深度优先:
const fn = (s) => {
  const stack = [
    {
      pre: '',
      next: s,
    },
  ]
  const res = []

  //next有值，说明字符还没取完
  while (stack.length) {
    const cur = stack.shift()
    const next = cur.next
    const nextLen = next.length
    if (!nextLen) {
      res.push(cur.pre)
      continue
    }
    //从剩余字符串中取每一个字符拼接当前字符
    //下一轮循环用到的字符串要去掉当前的字符
    for (let i = 0; i < nextLen; i++) {
      stack.unshift({
        pre: `${cur.pre}${next[i]}`,
        next: `${next.slice(0, i)}${next.slice(i + 1)}`,
      })
    }
  }
  return res
}
