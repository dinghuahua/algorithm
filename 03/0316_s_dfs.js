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
 * 给定一个二叉树，返回所有从根节点到叶子节点的路径。
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  let res = [],
    stack = []
  const dfs = (root) => {
    if (!root) return
    stack.push(root.val)
    if (!root.left && !root.right) {
      res.push([...stack])
      stack.pop()
    } else {
      if (root.left) dfs(root.left)
      if (root.right) dfs(root.right)
      stack.pop()
    }
  }
  dfs(root)
  return res.map((item) => item.join('->'))
}

var binaryTreePaths2 = function (root) {
  let res = []
  const dfs = (root, pre) => {
    if (!root) return
    pre.push(root.val)
    if (!root.left && !root.right) {
      res.push([...pre])
    } else {
      if (root.left) dfs(root.left, pre)
      if (root.right) dfs(root.right, pre)
    }
    pre.pop()
  }
  dfs(root, [])
  return res.map((item) => item.join('->'))
}

var binaryTreePaths3 = function (root) {
  let res = []
  const dfs = (root, pre) => {
    if (!root) return
    pre += root.val
    if (!root.left && !root.right) {
      res.push(pre)
    } else {
      pre += '->'
      if (root.left) dfs(root.left, pre)
      if (root.right) dfs(root.right, pre)
    }
  }
  dfs(root, '')
  return res
}

// 迭代实现
var binaryTreePaths4 = function (root) {
  let res = [],
    queue = [
      {
        node: root,
        path: [],
      },
    ]
  while (queue.length) {
    let cur = queue.shift(),
      node = cur.node,
      path = cur.path

    if (!node) return
    path.push(node.val)
    if (!node.left && !node.right) {
      res.push([...path])
    } else {
      if (node.left)
        queue.push({
          node: node.left,
          path: [...path],
        })
      if (node.right)
        queue.push({
          node: node.right,
          path: [...path],
        })
    }
  }
  return res.map((item) => item.join('->'))
}

// 给定一个二叉树，计算 整个树 的坡度 。
// 一个树的 节点的坡度 定义即为，该节点左子树的节点之和和右子树节点之和的 差的绝对值 。如果没有左子树的话，左子树的节点之和为 0 ；没有右子树的话也是一样。空结点的坡度是 0 。
// 整个树 的坡度就是其所有节点的坡度之和。

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 563. 二叉树的坡度
 * @param {TreeNode} root
 * @return {number}
 */
var findTilt = function (root) {
  let slope = []
  const dfs = (root) => {
    if (!root) return 0
    if (!root.left && !root.right) {
      return root.val
    } else {
      let leftSum = 0,
        rightSum = 0
      if (root.left) leftSum = dfs(root.left)
      if (root.right) rightSum = dfs(root.right)
      slope.push(Math.abs(leftSum - rightSum))
      return leftSum + rightSum + root.val
    }
  }
  dfs(root)
  return slope.reduce((a, b) => a + b, 0)
}
var findTilt2 = function (root) {
  let slope = 0
  const dfs = (root) => {
    if (!root) return 0
    if (!root.left && !root.right) {
      return root.val
    } else {
      let leftSum = 0,
        rightSum = 0
      if (root.left) leftSum = dfs(root.left)
      if (root.right) rightSum = dfs(root.right)
      slope += Math.abs(leftSum - rightSum)
      return leftSum + rightSum + root.val
    }
  }
  dfs(root)
  return slope
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
 * 108. 将有序数组转换为二叉搜索树
 * @param {number[]} nums
 * @return {TreeNode}
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 🌟🌟🌟🌟🌟
 * 108. 将有序数组转换为二叉搜索树
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBSTError = function (nums) {
  let cur = new TreeNode()

  const dfs = (node) => {
    let val, lVal, rVal
    if (!nums.length) return node
    if (nums.length === 1) {
      node.val = new TreeNode(nums.shift())
      return node
    } else if (nums.length === 2) {
      node.val = new TreeNode(nums.shift())
      node.left = new TreeNode(nums.shift())
    } else if (nums.length >= 3) {
      let mid = Math.floor(nums / 2)
      node.val = new TreeNode(nums[mid])
      node.left = new TreeNode(nums[mid - 1])
      node.right = new TreeNode(nums[mid + 1])
    }
    if (node.left) dfs(node.left)
    if (node.right) dfs(node.right)
  }
  return dfs(cur)
}
var sortedArrayToBST = function (nums) {
  const dfs = (nums) => {
    if (!nums.length) return null
    let mid = Math.floor(nums.length / 2)
    let node = new TreeNode(nums[mid])
    if (nums.length > 1) node.left = dfs(nums.slice(0, mid))
    if (nums.length > 2) node.right = dfs(nums.slice(mid + 1, nums.length))
    return node
  }
  return dfs(nums)
}
