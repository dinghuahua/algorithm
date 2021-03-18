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
var isSymmetricError = function (root) {
  /**
   * @param root 当前 节点
   * @param flag !0 左根右 !1右根左
   */
  const getNode = (root, resArr, flag = !0) => {
    // null 无法判断
    if (root === null) return
    if (flag) {
      if (!root.left && root.right) resArr.push('null')
      if (root.left) {
        getNode(root.left, resArr, flag)
      }
      resArr.push(root.val)
      if (root.right) getNode(root.right, resArr, flag)
    } else {
      if (root.right) getNode(root.right, resArr, flag)
      resArr.push(root.val)
      if (!root.left && root.right) resArr.push('null')
      if (root.left) {
        getNode(root.left, resArr, flag)
      }
    }
  }
  let leftArr = [],
    rightArr = []
  getNode(root.left, leftArr, !0)
  getNode(root.right, rightArr, !1)
  return leftArr.join(',') === rightArr.join(',')
}

var isSymmetric2 = function (root) {
  const is = (left, right) => {
    if (!left && !right) return true
    if (!left || !right) return false
    if (left.val === right.val) {
      return is(left.left, right.right) && is(left.right, right.left)
    } else {
      return false
    }
  }
  return is(root.left, root.right)
}

// 迭代
var isSymmetric3 = function (root) {
  let stack = [{ left: root.left, right: root.right }]
  while (stack.length) {
    const cur = stack.pop()
    let left = cur.left,
      right = cur.right

    if (!left && !right) continue
    if (!left || !right) return false
    if (left.val === right.val) {
      stack.push({ left: left.left, right: right.right })
      stack.push({ left: left.right, right: right.left })
    } else {
      return false
    }
  }
  return true
}
