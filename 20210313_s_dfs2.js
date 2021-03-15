/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 872. 叶子相似的树
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
  let root1End = [],
    root2End = []
  const dfsM = (root, endArr) => {
    if (root.left === null && root.right === null) {
      endArr.push(root.val)
      console.log(endArr)
    } else {
      if (root.left || root.left === 0) {
        dfs(root.left, endArr)
      }
      if (root.right || root.right === 0) {
        dfs(root.right, endArr)
      }
    }
  }
  dfs(root1, root1End)
  dfs(root2, root2End)
  return root1End.join(',') === root2End.join(',')
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
 * 897. 递增顺序查找树
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var increasingBST = function (root) {
  let mSort = []
  const dfsM = (curRoot, endArr) => {
    if (curRoot === null) {
      return
    }
    dfsM(curRoot.left, endArr)
    mSort.push(curRoot.val)
    dfsM(curRoot.right, endArr)
  }
  dfsM(root, mSort)
  console.log(mSort)
  // return mSort
}

// 递归永远是深度遍历
// 广度优先是同层级  层级遍历
// 广度不能用递归实现 加了一个异步
