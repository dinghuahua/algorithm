/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 938. 二叉搜索树的范围和 是否可以sum
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function (root, low, high) {
  let sum = 0
  const dfs = (root) => {
    if (!root) return
    dfs(root.left)
    if (root.val >= low && root.val <= high) sum += root.val
    dfs(root.right)
  }
  dfs(root)
  return sum
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 530. 二叉搜索树的最小绝对差
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function(root) {
    let min = Infinity,pre = -Infinity
    
    const dfs = (root)=>{
        if(!root) return
        dfs(root.left)
        min = Math.min(min, Math.abs(pre - root.val))
        pre = root.val
        dfs(root.right)
    }
    dfs(root)
    return min
};