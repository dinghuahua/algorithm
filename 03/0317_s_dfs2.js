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
  let res = []
  const dfs = (root) => {
    if (!root) return
    if (root.left) dfs(root.left)
    res.push(root.val)
    if (root.right) dfs(root.right)
  }
  dfs(root)
  return res
}
var inorderTraversal2Error = function (root) {
  let res = []
  let stack = [
    {
      node: root,
      path: [],
    },
  ]
  while (stack.length) {
    let cur = stack.unshift,
      node = cur.node,
      path = cur.path

    if (!node) continue
    if (node.right) {
      stack.unshift({ node: node.right, path: [...path, node.val] })
    }
    if (node.left) {
      stack.unshift({ node: node.left, path: [...path, node.val] })
    }
    res.unshift(node.val)
  }

  return res
}

var inorderTraversal3 = function (root) {
  if (!root) return []
  return [
    ...inorderTraversal3(root.left),
    root.val,
    ...inorderTraversal3(root.right),
  ]
}
// 迭代
var inorderTraversal4 = function (root) {
  const res = []
  const stack = [root]
  while (stack.length) {
    const cur = stack.shift()
    if (!cur) continue
    if (cur.left) {
      const left = cur.left
      cur.left = null
      stack.unshift(cur)
      stack.unshift(left)
    } else {
      res.push(cur.val)
      stack.unshift(cur.right)
    }
  }
  return res
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
 * 144. 二叉树的前序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  let res = []
  const dfs = (root) => {
    if (!root) return
    res.push(root.val)
    if (root.left) dfs(root.left)
    if (root.right) dfs(root.right)
  }
  dfs(root)
  return res
}
var preorderTraversal2 = function (root) {
  if (!root) return []
  return [
    root.val,
    ...preorderTraversal(root.left),
    ...preorderTraversal(root.right),
  ]
}
// 迭代
var preorderTraversal3 = function (root) {
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
  let res = []
  const dfs = (root) => {
    if (!root) return
    if (root.left) dfs(root.left)
    if (root.right) dfs(root.right)
    res.push(root.val)
  }
  dfs(root)
  return res
}

var postorderTraversal2 = function (root) {
  if (!root) return []
  return [
    ...postorderTraversal2(root.left),
    ...postorderTraversal2(root.right),
    root.val,
  ]
}

var postorderTraversal3 = function (root) {
  let res = [], stack = [root]
  while (stack.length) {
    let cur = stack.shift()
    if (!cur) continue
    stack.unshift(cur.left)
    stack.unshift(cur.right)
    res.unshift(cur.val)
  }
  return res
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
 * 102. 二叉树的层序遍历
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  let res = [],
    level = 0
  const pushRes = (level, val) => {
    if (!res[level]) res[level] = [val]
    else res[level].push(val)
  }
  const dfs = (node) => {
    if (!node) return
    if (!node.left && !node.right) {
      pushRes(level, node.val)
    } else {
      pushRes(level, node.val)
      ++level
      if (node.left) dfs(node.left)
      if (node.right) dfs(node.right)
      --level
    }
  }
  dfs(root)
  return res
}

var levelOrder2 = function (root) {
  let res = []
  const dfs = (node, level) => {
    if (!node) return
    if (!res[level]) res[level] = []
    if (!node.left && !node.right) {
      res[level].push(node.val)
    } else {
      res[level].push(node.val)
      ++level
      dfs(node.left, level)
      dfs(node.right, level)
    }
  }
  dfs(root, 0)
  return res
}
var levelOrder3 = function (root) {
  let res = []
  const dfs = (node, level = 0) => {
    if (!node) return
    if (!res[level]) res[level] = []
    res[level].push(node.val)
    dfs(node.left, level + 1)
    dfs(node.right, level + 1)
  }
  dfs(root)
  return res
}
// 迭代
var levelOrder4 = function (root) {
  const res = [];
  const stack = [{ node: root, level: 0 }];
  while (stack.length) {
    const cur = stack.shift();
    const node = cur.node
    const level = cur.level
    if (!node) continue;
    if (!res[level]) res[level] = []
    res[level].push(node.val);
    stack.unshift({ node: node.right, level: level + 1 });
    stack.unshift({ node: node.left, level: level + 1 });
  }
  return res;
};