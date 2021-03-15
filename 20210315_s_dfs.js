// 用递归判断回文数
const isPalindrome = (str) => {
  const fn = (str, result) => {
    if (result) {
      if (!str.length) return true
      else {
        let first = str[0], end = str[str.length - 1]
        return fn(str.slice(1, str.length - 1), first === end && result)
      }
    }
    return false
  }
  return fn(str, true)
}
const isPalindrome1 = (str) => {
  if (str.length <= 1) return true
  else {
    let first = str[0], end = str[str.length - 1]
    return first === end && isPalindrome1(str.slice(1, str.length - 1))
  }
}
console.log(isPalindrome1('abcfba'))
console.log(isPalindrome1('abcba'))

/**
 * 112. 路径总和
 * 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum ，判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。
 * 叶子节点 是指没有子节点的节点
 * @param {*} root 
 * @param {*} targetSum 
 *//**
* Definition for a binary tree node.
* function TreeNode(val, left, right) {
*     this.val = (val===undefined ? 0 : val)
*     this.left = (left===undefined ? null : left)
*     this.right = (right===undefined ? null : right)
* }
*/
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {

  let stack = [root.val]
  const dfs = (root) => {
    if (!root) return false
    stack.push(root.val)
    console.log(root, stack)
    if (root.left === null && root.right === null) {
      let pathSum = stack.reduce((pre, item) => pre + item, 0)
      stack.pop()
      if (pathSum === targetSum) {
        return true
      } else {
        return false
      }
    }
    let leftRes = dfs(root.left)
    let rightRes = dfs(root.right)
    return leftRes || rightRes
  }

  return dfs(root.left) || dfs(root.right)

};