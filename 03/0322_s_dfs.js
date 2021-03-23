// 1.给定一个整数数组[[6，4，-3，5，-2，-1，0，1，-9]，实现一个函数
// 将所有正数向左移动，并将所有负数向右移动。
// 尽力使它的时间复杂度为O（n），空间复杂度为O（1）。

// 2.给定一个“扁平”字典对象，其键以点分隔。
// 例如，{ 'A'：1，'B.A'：2，'B.B'：3，'CC.D.E'：4，'CC.D.F'：5 } 。
// 实现将其转换为“嵌套”字典对象的功能。
// 在上述情况下，嵌套版本如下：
// {
//   'A'：1，
//   'B'：{
//     'A2，
//     'B'：3
//   },
//   “ CC”：{
//     'D'：{
//       'E'：4
//       'F'：5
//     }
//   }
// }

let o = { 'A': 1, 'B.A': 2, 'B.B': 3, 'CC.D.E': 4, 'CC.D.F': 5 }
const transformObjError = (obj = o) => {
  let o = {}
  const dfs = (arr, o, value) => {
    let key = arr[0]
    if (arr.length > 1) {
      let _o = o[key] = {}
      dfs(arr.slice(1), _o, value)
    } else if (arr.length === 1) {
      o[key] = value
      return
    }
  }
  for (const [key, value] of Object.entries(obj)) {
    let arr = `${key}`.split('.')
    let _o = {}
    dfs(arr, o, value)
    o = { ...o, ..._o }
  }
  return o
}
const transformObj1 = (obj = o) => {
  let o = {}
  const dfs = (arr, cur, value) => {
    if (!arr.length) return
    let key = arr[0]
    if (arr.length === 1) {
      cur[key] = value
      return
    }
    if (!cur[key]) cur[key] = {}
    dfs(arr.slice(1), cur[key], value)
  }
  for (const [key, value] of Object.entries(obj)) {
    let arr = key.split('.')
    dfs(arr, o, value)
  }
  return o
}
// console.log(transformObj1())
const codeKey = (obj = o) => {
  const res = {};
  const keys = Object.keys(obj);
  keys.forEach((item) => {
    const deepKeys = item.split(".");
    const lastKey = deepKeys.pop();
    let curObj = res;
    deepKeys.forEach((key) => {
      if (!curObj[key]) {
        curObj[key] = {};
      }
      curObj = curObj[key];
    });
    curObj[lastKey] = obj[item];
  });
  return res;
};
// console.log(codeKey())



// 问的算法，是写个函数，new的时候传入数组，用数组构造二叉搜索树，并实现增加，删除，查找节点的操作
// 当成平衡二叉搜索树来做
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : val)
  this.right = (right === right ? null : val)
}
const binarySearchTree = (nums = [1, 5, 7, 2, 6, 4, 3, 8, 10, 9, 16, 11]) => {
  nums = nums.sort((a, b) => a - b)
  console.log(nums)
  if (!nums.length) return null
  // 因为在new创建树的时候，不能确定指针方向，所以创建出来的节点是没有办法进行链接的
  // 所以不能通过递归的参数传递上一个节点的指针，而是应该利用出参把新创建的节点return,
  // 在进行赋值到之前的节点的指针上
  const dfs = (arr) => {
    if (!arr.length) return null
    const mid = ~~((arr.length + 1) / 2)
    let cur = new TreeNode(arr[mid])
    if (arr.length > 1) cur.left = dfs(arr.slice(0, mid), cur.left)
    if (arr.length > 2) cur.right = dfs(arr.slice(mid + 1), cur.right)
    return cur
  }
  const node = dfs(nums)
  return node
}
const binarySearchTree = (nums = [1, 5, 7, 2, 6, 4, 3, 8, 10, 9, 16, 11]) => {
  nums = nums.sort((a, b) => a - b);
  const dfs = (arr) => {
    if (!arr.length) return null;
    if (arr.length === 1) return new TreeNode(root.val);
    const mid = ~~((arr.length + 1) / 2);
    const cur = new TreeNode(arr[mid]);
    cur.left = dfs(arr.slice(0, mid));
    cur.right = dfs(arr.slice(mid + 1));
    return cur;
  };
  const node = dfs(nums);
  return node;
};

function myTree(arr) {
  this.node = binarySearchTree(arr)
  this.add = function (num) {
    const cur = this.find(num)
    const dfs = (node) => {
      if (!node) return
      dfs(node.left)
      if (node.left <= num && num >= node.val) {
        let newTree = new TreeNode(num)
        node.left = newTree
        newTree.left = node
        return
      }
      if (node.val <= num && num >= node.val) {
        let newTree = new TreeNode(num)
        node.right = newTree
        newTree.right = node
        return
      }
      dfs(node.right)
    }

    if (cur === null) {
      dfs(this.node)
      return this.node
    } else {
      return
    }
  }
  this.del = function () {

  }
  this.find = function (num) {
    let cur = null
    const dfs = (node) => {
      if (!node) return
      dfs(node.left)
      if (node.val === num) {
        cur = node
        return
      }
      dfs(node.right)
    }
    dfs(this.node)
    return cur
  }
  this.console = function () {
    const dfs = (node) => {
      if (!node) return
      dfs(node.left)
      console.log(node.val)
      dfs(node.right)
    }
    dfs(this.node)
  }
}
let tree = new myTree()
tree.console()
tree.find(10)
// console.log()