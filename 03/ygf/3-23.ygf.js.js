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
  if (!root) return 0;
  if (root.val > high) return rangeSumBST(root.left, low, right);
  if (root.val < low) return rangeSumBST(root.right, low, right);
  return (
    root.val +
    rangeSumBST(root.left, low, right) +
    rangeSumBST(root.right, low, right)
  );
};

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
var getMinimumDifference = function (
  root,
  min = Infinity,
  pre = { val: -Infinity }
) {
  if (!root) return min;

  min = Math.min(getMinimumDifference(root.left, min, pre), min);
  min = Math.min(min, root.val - pre.val);
  pre.val = root.val;
  min = Math.min(getMinimumDifference(root.right, min, pre), min);
  return min;
};
