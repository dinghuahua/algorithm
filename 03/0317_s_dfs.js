/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  let max = 0
  const dfs = (root, preDep) => {
    if (!root) return 0
    ++preDep
    if (!root.left && !root.right) {
      max = Math.max(max, preDep)
    } else {
      if (root.left) dfs(root.left, preDep)
      if (root.right) dfs(root.right, preDep)
    }
    --preDep
  }
  dfs(root, 0)
  return max
};
var maxDepth2 = function (root) {
  if (!root) return 0
  let leftDep = maxDepth2(root.left)
  let rightDep = maxDepth2(root.right)
  return Math.max(leftDep + 1, rightDep + 1);
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
 * 112. 路径总和
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {

  let flag = false, stack = []
  const dfs = (root) => {
    if (!flag) {
      if (!root) return false
      stack.push(root.val)
      if (root.left === null && root.right === null) {
        let pathSum = stack.reduce((pre, item) => pre + item, 0)
        stack.pop()
        if (pathSum === targetSum) {
          flag = true
          return true
        } else {
          flag = false
          return false
        }
      }
      dfs(root.left)
      dfs(root.right)
      stack.pop()
    }
  }

  dfs(root)
  return flag
};

var hasPathSum2 = function (root, targetSum) {

  let flag = false, sum = 0
  const dfs = (root) => {
    if (!flag) {
      if (!root) return false
      if (root.left === null && root.right === null) {
        if (sum + root.val === targetSum) {
          flag = true
          return true
        } else {
          flag = false
          return false
        }
      }
      sum += root.val
      dfs(root.left)
      dfs(root.right)
      sum -= root.val
    }
  }

  dfs(root)
  return flag
};