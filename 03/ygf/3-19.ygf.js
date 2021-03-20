/**
 * 605. 种花问题
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */

var canPlaceFlowers = function (flowerbed, n) {
  const l = flowerbed.length;
  for (let i = 0; i < l; i++) {
    if (!flowerbed[i - 1] && !flowerbed[i + 1] && !flowerbed[i]) {
      n--;
      flowerbed[i] = 1;
    }
  }
  return n <= 0;
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
  const newVal = image[sr][sc];
  if (newVal === newColor) return image;
  const dfs = (i, j) => {
    if (i < 0 || i > image.length - 1 || j < 0 || j > image[i].length - 1) {
      return;
    }
    if (image[i][j] === newVal) {
      image[i][j] = newColor;
      map.set(map.size, [i, j]);
      dfs(i - 1, j);
      dfs(i + 1, j);
      dfs(i, j + 1);
      dfs(i, j - 1);
    }
  };
  dfs(sr, sc);
  return image;
};

/**
 * 100. 相同的树
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;
  return dfs(p.left, q.left) && dfs(p.right, q.right);
};

/**
 * 559. N 叉树的最大深度 是否可以去掉外层的max
 * @param {Node} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0;
  return 1 + Math.max(root.children.map((item) => dfs(item)));
};

var maxDepth = function (root) {
  if (!root) return 0
  if (!root.children.length) return 1
  let maxArr = root.children.map((item) => 1 + maxDepth(item))
  return Math.max(...maxArr)
}

//平衡二叉树一
var getHeight = function (root) {
  if (!root) return 0;
  return Math.max(getHeight(root.left), getHeight(root.right)) + 1;
};
var isBalanced = function (root) {
  if (!root) return true;
  return (
    Math.abs(getHeight(root.left) - getHeight(root.right)) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );
};

//平衡二叉树二
var isBalanced = function (root) {
  if (!root) return true;
  const dfs = (root) => {
    if (!root) return [0, true];
    const left = dfs(root.left);
    const right = dfs(root.right);
    const height = Math.max(left[0], right[0]) + 1;
    if (!left[1] || !right[1]) return [height, false];
    if (Math.abs(left[0] - right[0]) > 1) return [height, false];
    return [height, true];
  };
  return dfs(root)[1];
};

//平衡二叉树三
var isBalanced = function (root) {
  const dfs = (root) => {
    if (!root) return 0;
    const left = dfs(root.left);
    const right = dfs(root.right);
    if (left < 0 || right < 0) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return Math.max(left, right) + 1;
  };
  return dfs(root) >= 0;
};

/**
 * 783. 二叉搜索树节点最小距离
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function (root) {
  if (!root) return 0;
  if (!root.left && !root.right) return 0;
  let min = Infinity;
  let pre = -Infinity;
  const dfs = (root) => {
    if (!root) return;
    dfs(root.left);
    min = Math.min(root.val - pre, min);
    pre = root.val;
    dfs(root.right);
  };
  return min;
};
