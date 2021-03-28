/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 1026. 节点与其祖先之间的最大差值
 * @param {TreeNode} root
 * @return {number}
 */
var maxAncestorDiff = function (root) {
  let maxDiff = -Infinity,
    path = []

  const dfs = (root) => {
    if (!root) return
    path.push(root.val)
    if (!root.left && !root.right) {
      let max = Math.max(...path),
        min = Math.min(...path)
      maxDiff = Math.max(Math.abs(max - min), maxDiff)
      path.pop()
      return
    }
    dfs(root.left)
    dfs(root.right)
    let max = Math.max(...path),
      min = Math.min(...path)
    maxDiff = Math.max(Math.abs(max - min), maxDiff)
    path.pop()
  }
  dfs(root)
  return maxDiff
}

var maxAncestorDiff2 = function (root) {
  let maxDiff = -Infinity

  const dfs = (root, max, min) => {
    if (!root) return
    max = Math.max(max, root.val)
    min = Math.min(min, root.val)
    if (!root.left && !root.right) {
      maxDiff = Math.max(Math.abs(max - min), maxDiff)
      return
    }
    dfs(root.left, max, min)
    dfs(root.right, max, min)
    maxDiff = Math.max(Math.abs(max - min), maxDiff)
  }
  dfs(root, -Infinity, Infinity)
  return maxDiff
}

var maxAncestorDiff3 = function (
  root,
  max = -Infinity,
  min = Infinity,
  maxDiff = -Infinity
) {
  if (!root) return maxDiff
  max = Math.max(max, root.val)
  min = Math.min(min, root.val)
  if (!root.left && !root.right) {
    maxDiff = Math.max(Math.abs(max - min), maxDiff)
    return maxDiff
  }
  const leftDiff = maxAncestorDiff3(root.left, max, min, maxDiff)
  const rightDiff = maxAncestorDiff3(root.right, max, min, maxDiff)
  maxDiff = Math.max(leftDiff, rightDiff, maxDiff)
  return maxDiff
}
var maxAncestorDiff4 = function (root, max = -Infinity, min = Infinity) {
  if (!root) return -Infinity
  max = Math.max(max, root.val)
  min = Math.min(min, root.val)
  if (!root.left && !root.right) {
    return Math.max(Math.abs(max - min))
  }
  const leftDiff = maxAncestorDiff4(root.left, max, min)
  const rightDiff = maxAncestorDiff4(root.right, max, min)
  return Math.max(leftDiff, rightDiff)
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
 * 100. 相同的树
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (!p && !q) return true
  if (!p) return false
  if (!q) return false
  if (p.val !== q.val) return false
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * 559. N 叉树的最大深度
 * @param {Node} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0
  if (!root.children) return 1

  return (
    1 +
    root.children.reduce((max, item) => {
      return Math.max(max, maxDepth(item))
    }, 0)
  )
}
/** 111. 二叉树的最小深度
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root, isRoot = !0) {
  if (!root) return isRoot ? 0 : Infinity
  if (!root.left && !root.right) return 1

  return Math.min(minDepth(root.left, !1) + 1, minDepth(root.right, !1) + 1)
}
/**
 * 733. 图像渲染
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, newColor) {
  const newVal = image[sr][sc]
  if (newVal === newColor) return image
  const dfs = (sr, sc) => {
    if (sr >= 0 && sr < image.length && sc >= 0 && sc < image[sr].length) {
      if (image[sr][sc] === newVal) {
        image[sr][sc] = newColor
        dfs(sr - 1, sc)
        dfs(sr + 1, sc)
        dfs(sr, sc + 1)
        dfs(sr, sc - 1)
      }
    }
  }
  dfs(sr, sc)
  return image
}
/**
 * 104. 二叉树的最大深度
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0
  if (!root.left && !root.right) return 1

  return Math.max(maxDepth(root.left) + 1, maxDepth(root.right) + 1)
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
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBSTError = function (
  root,
  min1 = Infinity,
  min2 = Infinity,
  minDiff = Infinity
) {
  if (!root) return min2 - min1
  ;[min1, min2] =
    root.val > min2
      ? [min1, min2]
      : min2 > root.val && root.val > min1
      ? [min1, root.val]
      : [root.val, min1]

  if (!root.left && !root.right) {
    return Math.min(minDiff, min2 - min1)
  }
  return Math.min(
    minDiffInBST(root.left, min1, min2, minDiff),
    minDiffInBST(root.right, min1, min2, minDiff)
  )
}
