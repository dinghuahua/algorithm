// 层序遍历 尾递归
const levelOrder = (root, pre = [root], res = []) => {
  if (!root) return res
  const [curLevel, next] = pre.reduce((sum, item) => {
    if (item) {
      sum[0].push(item.val)
      sum[1].push(item.left, item.right)
    }
    return sum
  })
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

var binaryTreePaths = function (root, pre = '', res = []) {
  if (!root) return res
  if (!root.left && !root.right) res.push(`${pre ? pre + '->' : ''}${root.val}`)
  res = binaryTreePaths(root.left, `${pre ? pre + '->' : ''}${root.val}`, res)
  res = binaryTreePaths(root.right, `${pre ? pre + '->' : ''}${root.val}`, res)
  return res
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

const fun1 = (s) => {
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

const fun = (s) => {
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
const res = fun1('abbc')
const res1 = fun('abbc')
console.log(res, res1)
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
var increasingBST = function(root) {
    const head = {}
    let pre = head
    const dfs = (node)=>{
        if(!node) return 
        dfs(node.left)
        pre.right = node
        node.left = null
        pre = node
        dfs(node.right)
    }
    dfs(root)
    return head.right
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 563. 二叉树的坡度  可以尾递归嘛？？
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
