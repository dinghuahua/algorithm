/**
 * 605. 种花问题
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  const dfs = (index) => {
    if (index >= 0 && index < flowerbed.length && n > 0) {
      if (flowerbed[index]) {
        // 1 
        dfs(index + 2)
      } else {
        // 0
        // 判断当前位置的前后是否都为0
        if ((!index || index - 1 >= 0 && !flowerbed[index - 1]) && (index === flowerbed.length - 1 || index + 1 < flowerbed.length && !flowerbed[index + 1])) {
          flowerbed[index] = 1
          --n
          dfs(index + 2)
        } else {
          dfs(index + 1)
        }
      }
    }
  }
  dfs(0)
  return n <= 0
};

var canPlaceFlowers2 = function (flowerbed, n) {
  for (var i = 0; i < flowerbed.length;) {

  }
};

/** 
 * 733. 图像渲染
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, newColor) {
  const dfs = () => {

  }
  dfs()
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
 * 100. 相同的树
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  const dfs = (root1, root2) => {
    if (!root1 && !root2) return true
    if (!root1 || !root2) return false
    if (root1.val !== root2.val) return false
    return dfs(root1.left, root2.left) && dfs(root1.right, root2.right)
  }
  return dfs(p, q)

};

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * 559. N 叉树的最大深度 是否可以去掉外层的max
 * @param {Node} root
 * @return {number}
 */
var maxDepth = function (root) {
  let max = 0
  const dfs = (root, deep) => {
    if (!root) return 0
    ++deep
    if (!root.children.length) {
      max = Math.max(max, deep)
    }
    root.children.map(item => dfs(item, deep))
  }
  dfs(root, 0)
  return max
};


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 剑指 Offer 55 - II. 平衡二叉树
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalancedError = function (root) {
  const dfs = (root, left, right) => {
    if (!root) return 0
    if (!root.left && !root.right) return 1
    Math.abs(dfs(root.left) - dfs(root.right)) <= 1
  }
  return dfs(root, 0)
};


var isBalanced1 = function (root) {
  let flag = !0
  const dfs = (root, deep) => {
    console.log(deep)
    if (!root) return deep
    ++deep
    let leftDeep = dfs(root.left, deep)
    root.left = null
    let rightDeep = dfs(root.right, deep)
    --deep
    console.log(root, leftDeep, rightDeep)
    flag = flag && Math.abs(leftDeep - rightDeep) <= 1
  }
  dfs(root, 0)
  return flag
};