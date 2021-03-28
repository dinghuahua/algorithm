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
