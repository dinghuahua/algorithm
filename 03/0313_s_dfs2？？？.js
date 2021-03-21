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

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 🌟🌟🌟🌟🌟
 * 897. 递增顺序查找树
 * @param {TreeNode} root
 * @return {TreeNode}
*/
var increasingBST2 = function (root) {
  const head = new TreeNode(0)
  let cur = head
  const dfs = (root) => {
    if (!root) return
    dfs(root.left)
    //handle
    cur.left = null
    cur.right = new TreeNode(root.val)
    cur = cur.right
    dfs(root.right)
  }
  dfs(root)
  return head.right
}

var increasingBST3 = function (root) {
  const head = {}
  let pre = head
  const dfs = (root) => {
    if (!root) return
    dfs(root.left)
    //handle 
    root.left = null;
    // 当前节点赋值到right,并在回到上一次递归的时候把left 重置为null  深入优先遍历
    // 因为刚刚在深层次的递归中已经处理过left了，所以不用担心数据丢失
    pre.right = root
    // 把right 指向下一次的当前节点
    pre = pre.right
    dfs(root.right)
  }
  dfs(root)
  return head.right
}

// 递归永远是深度遍历
// 广度优先是同层级  层级遍历
// 广度不能用递归实现 加了一个异步
