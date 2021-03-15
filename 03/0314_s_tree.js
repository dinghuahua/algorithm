/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 101. 对称二叉树
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  /**
   * @param root 当前 节点
   * @param flag !0 左根右 !1右根左
   */
  const getNode = (root, resArr, flag = !0) => {
    console.log(root)
    if (root === null) return
    if (flag) {
      if (root.left === null && root.right !== null) {
        resArr.push(root.left)
        return
      } else {
        getNode(root.left, resArr, flag)
      }
    } else {
      if (root.right === null && root.left !== null) {
        resArr.push(root.right)
        return
      } else {
        getNode(root.right, resArr, flag)
      }
    }
    console.log(root.val)
    resArr.push(root.val)
    if (flag) {
      if (root.right === null && root.left !== null) {
        resArr.push(root.right)
        return
      } else {
        getNode(root.right, resArr, flag)
      }
    } else {
      if (root.left === null && root.right !== null) {
        resArr.push(root.left)
        return
      } else {
        getNode(root.left, resArr, flag)
      }
    }
  }
  let leftArr = [],
    rightArr = []
  getNode(root.left, leftArr, !0)
  // getNode(root, rightArr, !1)
  console.log(leftArr, rightArr)
  return leftArr.join(',') === rightArr.join(',')
}

var isSymmetric2 = function (root) {
  const isMirror = (left, right) => {
    if (left == null && right == null) {
      return true
    }
    if (left == null || right == null) {
      return false
    }
    if (left.val == right.val) {
      return (
        isMirror(left.left, right.right) && isMirror(left.right, right.left)
      )
    }
    return false
  }
  const isMirror = (left, right) => {
    if (!left && !right) return true
    if (!left && !right) return false
    if (left.val === right.val) {
      return (
        isMirror(left.left, right.right) && isMirror(left.right, right.left)
      )
    } else {
      return false
    }
  }
  return isMirror(root.left, root.right)
}
