// 层序遍历 尾递归
const levelOrder = (root, pre = [root], res = []) => {
  if (!root) return res
  const [curLevel, next] = pre.reduce(
    (sum, item) => {
      if (item) {
        sum[0].push(item.val)
        sum[1].push(item.left, item.right)
      }
      return sum
    },
    [[], []]
  )
  if (!curLevel.length) return res
  res.push(curLevel)
  return levelOrder(
    root,
    next.filter((item) => item),
    res
  )
}

/**
 * 872. 叶子相似的树
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
  const dfs = (root, res = []) => {
    if (!root) return res
    if (!root.left && !root.right) res.push(root.val)
    res = dfs(root.left, res)
    res = dfs(root.right, res)
    return res
  }
  return dfs(root1).join(',') === dfs(root2).join(',')
}

// 学习generate
var leafSimilar = function (root1, root2) {
  const getLeaves = function* (root) {
    if (!root) return
    !root.left && !root.right && (yield root.val)
    yield* getLeaves(root.left)
    yield* getLeaves(root.right)
  }
  return [...getLeaves(root1)].join() === [...getLeaves(root2)].join()
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 257. 二叉树的所有路径
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  const dfs = (root, pre = '', res = []) => {
    if (!root) return res
    if (!root.left && !root.right)
      res.push(`${pre ? pre + '->' : ''}${root.val}`)
    res = dfs(root.left, `${pre ? pre + '->' : ''}${root.val}`, res)
    res = dfs(root.right, `${pre ? pre + '->' : ''}${root.val}`, res)
    return res
  }
  return dfs(root)
}

var binaryTreePaths2 = function (root, pre = '', res = []) {
  if (!root) return res
  if (!root.left && !root.right) res.push(`${pre ? pre + '->' : ''}${root.val}`)
  res = binaryTreePaths2(root.left, `${pre ? pre + '->' : ''}${root.val}`, res)
  res = binaryTreePaths2(root.right, `${pre ? pre + '->' : ''}${root.val}`, res)
  return res
}

var binaryTreePaths3 = function (root, pre = '') {
  if (!root) return []
  pre = pre ? pre + '->' : ''
  if (!root.left && !root.right) {
    return [`${pre}${root.val}`]
  }
  return binaryTreePaths3(root.left, `${pre}${root.val}`).concat(
    binaryTreePaths3(root.right, `${pre}${root.val}`)
  )
}

// 学习广度优先
var binaryTreePaths = function (root) {
  const paths = []
  if (root === null) {
    return paths
  }
  const node_queue = [root]
  const path_queue = [root.val.toString()]

  while (node_queue.length) {
    const node = node_queue.shift()
    const path = path_queue.shift()

    if (node.left === null && node.right === null) {
      paths.push(path)
    } else {
      if (node.left !== null) {
        node_queue.push(node.left)
        path_queue.push(path + '->' + node.left.val.toString())
      }

      if (node.right !== null) {
        node_queue.push(node.right)
        path_queue.push(path + '->' + node.right.val.toString())
      }
    }
  }
  return paths
}

// 有重复字母的排列组合
// 原字符串不排序的情况下
// map 去重pre  set去掉已经在next中选择过的字母

// 原字符串排序的情况下
// 在next中选择过的字母
const fun = (s) => {
  const map = new Map()
  const stack = [
    {
      pre: '',
      next: s,
    },
  ]
  const res = []
  while (stack.length) {
    const cur = stack.shift()
    const next = cur.next
    const nextLen = next.length
    if (!nextLen) {
      res.push(cur.pre)
      continue
    }
    for (let i = 0; i < nextLen; i++) {
      pre = `${cur.pre}${next[i]}`
      if (map.has(pre)) continue
      map.set(pre, 1)
      stack.unshift({
        pre,
        next: `${next.slice(0, i)}${next.slice(i + 1)}`,
      })
    }
  }
  return res
}
const fun2 = (s) => {
  const stack = [
    {
      pre: '',
      next: s,
    },
  ]
  const res = []
  while (stack.length) {
    const cur = stack.shift()
    const next = cur.next
    const nextLen = next.length
    if (!nextLen) {
      res.push(cur.pre)
      continue
    }
    const set = new Set()
    for (let i = 0; i < nextLen; i++) {
      if (set.has(next[i])) continue
      set.add(next[i])
      stack.unshift({
        pre: pre + next[i],
        next: `${next.slice(0, i)}${next.slice(i + 1)}`,
      })
    }
  }
  return res
}

const fun3 = (s) => {
  s = s.split('').sort().join('')
  const stack = [
    {
      pre: '',
      next: s,
    },
  ]
  const res = []
  while (stack.length) {
    const cur = stack.shift()
    const next = cur.next
    const nextLen = next.length
    if (!nextLen) {
      res.push(cur.pre)
      continue
    } //
    //111112233
    for (let i = 0; i < nextLen; i++) {
      while (next[i] === next[i + 1]) {
        i++
      }
      if (i === nextLen) break
      stack.unshift({
        pre: `${cur.pre}${next[i]}`,
        next: `${next.slice(0, i)}${next.slice(i + 1)}`,
      })
    }
  }
  return res
}
console.log(fun3('abcdb'))
const fun4 = (s) => {
  s = s.split('').sort().join('')
  const stack = [
    {
      pre: '',
      next: s,
    },
  ]
  const res = []
  while (stack.length) {
    const cur = stack.shift()
    const next = cur.next
    const nextLen = next.length
    if (!nextLen) {
      res.push(cur.pre)
      continue
    }
    for (let i = 0; i < nextLen; i++) {
      for (var j = i + 1; j < nextLen; j++) {
        if (next[i] !== next[j]) break
      }
      stack.unshift({
        pre: `${cur.pre}${next.slice(i, j + 1)}`,
        next: `${next.slice(0, i)}${next.slice(j + 1)}`,
      })
      i = j
    }
  }
  return res
}
// console.log(res, res1)
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 897. 递增顺序查找树
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var increasingBST = function (root) {
  const head = {}
  let pre = head
  const dfs = (node) => {
    if (!node) return
    dfs(node.left)
    pre.right = node
    node.left = null
    pre = node
    dfs(node.right)
  }
  dfs(root)
  return head.right
}
var increasingBST = function (root) {
  if (!root) return
  root.right = increasingBST(node.right)
  if (!root.left) return root
  const head = increasingBST(root.left)
  root.left = null
  let next = head
  while (next.right) {
    next = next.right
  }
  next.right = root
  return head
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 563. 二叉树的坡度  可以尾递归嘛？？ 不可以
 * @param {TreeNode} root
 * @return {number}
 */
var findTilt = function (root) {
  let abs = 0
  const dfs = (node) => {
    if (!node) return 0
    if (!node.left && !node.right) return node.val
    let leftSum = dfs(node.left)
    let rightSum = dfs(node.right)
    abs += Math.abs(leftSum - rightSum)
    return leftSum + rightSum + node.val
  }
  dfs(root)
  return abs
}
