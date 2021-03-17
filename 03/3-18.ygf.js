/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 94. 二叉树的中序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  let res = [];
  const dfs = (root) => {
    if (!root) return;
    if (root.left) dfs(root.left);
    res.push(root.val);
    if (root.right) dfs(root.right);
  };
  dfs(root);
  return res;
};
var inorderTraversal2 = function (root) {
  const res = [];
  const stack = [root];
  while (stack.length) {
    const cur = stack.shift();
    if (!cur) continue;
    if (cur.left) {
      const left = cur.left;
      cur.left = null;
      stack.unshift(cur);
      stack.unshift(left);
    } else {
      res.push(cur.val);
      stack.unshift(cur.right);
    }
  }
  return res;
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
 * 144. 二叉树的前序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
// var preorderTraversal = function (root) {
//   if (!root) return [];
//   return [
//     ...preorderTraversal(root.left),
//     ...preorderTraversal(root.right),
//     root.val,
//   ];
// };
var preorderTraversal = function (root) {
  const res = [];
  const stack = [root];
  while (stack.length) {
    const cur = stack.shift();
    if (!cur) continue;
    res.push(cur.val);
    stack.unshift(cur.right);
    stack.unshift(cur.left);
  }
  return res;
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
 * 145. 二叉树的后序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root) {
  let res = [];
  const dfs = (root) => {
    if (!root) return;
    if (root.left) dfs(root.left);
    if (root.right) dfs(root.right);
    res.push(root.val);
  };
  dfs(root);
  return res;
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
 * 102. 二叉树的层序遍历
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  const res = [];
  const dfs = (node, level = 0) => {
    if (!node) return;
    if (!res[level]) {
      res[level] = [];
    }
    res[level].push(root.val);
    dfs(root.left, level + 1);
    dfs(root.right, level + 1);
  };
  dfs(root);
  return res;
};
