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

let o = { A: 1, 'B.A': 2, 'B.B': 3, 'CC.D.E': 4, 'CC.D.F': 5 }
const transformObjError = (obj = o) => {
  let o = {}
  const dfs = (arr, o, value) => {
    let key = arr[0]
    if (arr.length > 1) {
      let _o = (o[key] = {})
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
  const res = {}
  const keys = Object.keys(obj)
  keys.forEach((item) => {
    const deepKeys = item.split('.')
    const lastKey = deepKeys.pop()
    let curObj = res
    deepKeys.forEach((key) => {
      if (!curObj[key]) {
        curObj[key] = {}
      }
      curObj = curObj[key]
    })
    curObj[lastKey] = obj[item]
  })
  return res
}
// console.log(codeKey())

/**
 * 🌟🌟🌟🌟🌟
 * 问的算法，是写个函数，new的时候传入数组，用数组构造二叉搜索树，并实现增加，删除，查找节点的操作
 * 当成平衡二叉搜索树来做
 * */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : val
  this.right = right === right ? null : val
}
const binarySearchTree = (nums = []) => {
  nums = nums.sort((a, b) => a - b)
  if (!nums.length) return null
  // 因为在new创建树的时候，不能确定指针方向，所以创建出来的节点是没有办法进行链接的
  // 所以不能通过递归的参数传递上一个节点的指针，而是应该利用出参把新创建的节点return,
  // 在进行赋值到之前的节点的指针上
  const dfs = (arr) => {
    if (!arr.length) return null
    const mid = ~~(arr.length / 2)
    let cur = new TreeNode(arr[mid])
    if (arr.length > 1) cur.left = dfs(arr.slice(0, mid), cur.left)
    if (arr.length > 2) cur.right = dfs(arr.slice(mid + 1), cur.right)
    return cur
  }
  const node = dfs(nums)
  return node
}
const binarySearchTree2 = (nums = []) => {
  nums = nums.sort((a, b) => a - b)
  const dfs = (arr) => {
    if (!arr.length) return null
    if (arr.length === 1) return new TreeNode(arr[0])
    const mid = ~~((arr.length + 1) / 2)
    const cur = new TreeNode(arr[mid])
    cur.left = dfs(arr.slice(0, mid))
    cur.right = dfs(arr.slice(mid + 1))
    return cur
  }
  const node = dfs(nums)
  return node
}
const binarySearchTree3 = (nums = []) => {
  nums = nums.sort((a, b) => a - b)
  const dfs = (left, right) => {
    if (right < left) return null
    if (left === right) return new TreeNode(nums[left])
    const mid = ~~((left + right) / 2)
    const cur = new TreeNode(nums[mid])
    cur.left = dfs(left, mid - 1)
    cur.right = dfs(mid + 1, right)
    return cur
  }
  const node = dfs(0, nums.length - 1)
  return node
}

function myTree(arr) {
  this.node = binarySearchTree(arr)
  this.addError = function (num) {
    const cur = this.find(num)
    const dfs = (node) => {
      if (!node) return
      dfs(node.left)
      if (num < node.val) {
        // 最左边<左边<当前节点<右边<最右边
        // 相邻的当前节点、左节点、右节点 不是排序的相邻位置
        // 所以此方法不对
        if (node.left && node.left.val < num) {
          let newTree = new TreeNode(num)
          node.left = newTree
          newTree.left = node.left
          return
        }
        if (!node.left) {
          let newTree = new TreeNode(num)
          node.left = newTree
          return
        }
      }
      if (num > node.val) {
        if (node.right && node.right.val > num) {
          let newTree = new TreeNode(num)
          node.right = newTree
          newTree.right = node.right
          return
        }
        if (!node.right) {
          let newTree = new TreeNode(num)
          node.right = newTree
          return
        }
      }
      dfs(node.right)
    }
    if (cur === null) {
      dfs(this.node)
    } else {
      return
    }
  }
  this.del = function () {}
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

function myTree2(arr) {
  this.node = binarySearchTree2(arr)
  this.add = function (num) {
    // 添加为叶子节点
    //      7
    // 4      11
    // 3             6
    const dfs = (node) => {
      if (!node) return new TreeNode(num)
      if (node.val > num) {
        node.left = dfs(node.left)
      } else {
        node.right = dfs(node.right)
      }
      return node
    }
  }
  this.del = function (num) {
    const dfs = (root) => {
      if (!root) return null
      if (root.val === num) {
        const right = root.right
        const left = root.left
        if (!right) return left
        if (!left) return right
        let leftYeaf = right
        while (leftYeaf.left) {
          leftYeaf = leftYeaf.left
        }
        leftYeaf.left = left
        return right
      } else if (root.val > num) {
        root.left = dfs(root.left)
      } else {
        root.right = dfs(root.right)
      }
      return root
    }
    return dfs(root)
  }
  this.find = function (num) {
    const dfs = (node) => {
      if (!node) return
      if (node.val === num) return node
      return node.val > num ? dfs(node.left) : dfs(node.right)
    }

    return dfs(this.node)
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
  this.spaceConsole = function () {
    let res = []
    const dfs = (node, level = 0) => {
      if (!node) return
      if (!res[level]) res[level] = []
      res[level].push(node.val)
      dfs(node.left, level + 1)
      dfs(node.right, level + 1)
    }
    dfs(this.node)
    console.log(res)
  }
}

// let tree = new myTree([1, 5, 7, 2, 4, 3, 8, 10, 9, 16, 11])
// tree.console()
// tree.addError(6)
// tree.console()

let tree1 = new myTree2([1, 5, 7, 2, 6, 4, 3, 8, 10, 9, 16, 11])
tree1.spaceConsole()
// tree.find(10)
// console.log()
