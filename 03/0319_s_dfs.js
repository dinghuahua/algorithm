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
        if (
          (!index || (index - 1 >= 0 && !flowerbed[index - 1])) &&
          (index === flowerbed.length - 1 ||
            (index + 1 < flowerbed.length && !flowerbed[index + 1]))
        ) {
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
}
var canPlaceFlowers = function (flowerbed, n) {
  const l = flowerbed.length
  for (let i = 0; i < l; i++) {
    if (!flowerbed[i - 1] && !flowerbed[i + 1] && !flowerbed[i]) {
      n--
      flowerbed[i] = 1
    }
  }
  return n <= 0
}
var canPlaceFlowers1 = function (flowerbed, n) {
  const stack = []
  let len = 0
  for (const n of flowerbed) {
    //计算所有连续的0及对应的长度
    //连续的0对应的最大种植数量是可以计算的
    if (!n) {
      len++
    } else {
      stack.push(len)
      len = 0
    }
  }
  // 在两边都是1时，连续的0，假设长度为l，能种的花是数量是Math.floor((l-1)/2)
  // 如果连续的0在最左边或者最右边，那么是 Math.floor(l/2)
  // 如果整个数组都是0，那么是Math.floor((l+1)/2)

  //没有1，即左右边界相连
  if (!stack.length) return ~~((len + 1) / 2) >= n
  const left = stack.shift()
  //左右边界 只需要考虑一端的相邻问题
  const init = ~~(left / 2) + ~~(len / 2)
  return (
    stack.reduce((sum, item) => {
      return sum + ~~((item - 1) / 2)
    }, init) >= n
  )
}
var canPlaceFlowers2 = function (flowerbed, n) {
  const stack = []
  let len = 0
  const funMap = {
    0: () => {
      len++
    },
    1: () => {
      stack.push(len)
      len = 0
    },
  }
  for (const n of flowerbed) {
    //计算所有连续的0及对应的长度
    //连续的0对应的最大种植数量是可以计算的
    funMap[n]()
  }
  //没有1，即左右边界相连
  if (!stack.length) return ~~((len + 1) / 2) >= n
  const left = stack.shift()
  //左右边界 只需要考虑一端的相邻问题
  const init = ~~(left / 2) + ~~(len / 2)
  return (
    stack.reduce((sum, item) => {
      return sum + ~~((item - 1) / 2)
    }, init) >= n
  )
}
var canPlaceFlowers3 = function (flowerbed, n) {
  const stack = []
  let len = 0
  const funMap = {
    0: () => {
      len++
    },
    1: () => {
      stack.push(len)
      len = 0
    },
  }
  for (const n of flowerbed) {
    //计算所有连续的0及对应的长度
    //连续的0对应的最大种植数量是可以计算的
    funMap[n]()
  }
  const resMap = {
    true: () => {
      return ~~((len + 1) / 2) >= n
    },
    false: () => {
      const left = stack.shift()
      //左右边界 只需要考虑一端的相邻问题
      const init = ~~(left / 2) + ~~(len / 2)
      return (
        stack.reduce((sum, item) => {
          return sum + ~~((item - 1) / 2)
        }, init) >= n
      )
    },
  }
  return resMap[`${!stack.length}`]()
}

/**
 * 733. 图像渲染
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, newColor) {
  let newVal = image[sr][sc],
    map = new Map()

  const dfs = (i, j) => {
    if (i < 0 || i > image.length - 1 || j < 0 || j > image[i].length - 1) {
      return
    }
    let cur = image[i][j]
    if (cur === newVal) {
      image[i][j] = -1
      map.set(map.size, [i, j])
      dfs(i - 1, j)
      dfs(i + 1, j)
      dfs(i, j + 1)
      dfs(i, j - 1)
    }
  }
  dfs(sr, sc)
  for (let [i, j] of map.values()) {
    image[i][j] = newColor
  }
  return image
}
var floodFill1 = function (image, sr, sc, newColor) {
  const newVal = image[sr][sc]
  if (newVal === newColor) return image
  const dfs = (i, j) => {
    if (i < 0 || i > image.length - 1 || j < 0 || j > image[i].length - 1) {
      return
    }
    if (image[i][j] === newVal) {
      image[i][j] = newColor
      dfs(i - 1, j)
      dfs(i + 1, j)
      dfs(i, j + 1)
      dfs(i, j - 1)
    }
  }
  dfs(sr, sc)
  return image
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
}
var isSameTree2 = function (p, q) {
  if (!p && !q) return true
  if (!p || !q) return false
  if (p.val !== q.val) return false
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}

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
    root.children.map((item) => dfs(item, deep))
  }
  dfs(root, 0)
  return max
}
/**
 * 自顶向下遍历，层级树从顶开始1  每深一个层级把当前层级赋值到结果中+1  叶子节点 + 1 
 * 空节点就不再递归 +0
 * */
var maxDepthError = function (root) {
  if (!root) return 0
  return 1 + Math.max(root.children.map((item) => dfs(item)))
}

var maxDepth2 = function (root) {
  if (!root) return 0
  if (!root.children.length) return 1
  let maxArr = root.children.map((item) => 1 + maxDepth(item))
  return Math.max(...maxArr)
}

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
}
var isBalanced1Error = function (root) {
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
}

//平衡二叉树一
/**
 * 获取一个节点的最大深度
 **/
var getHeight = function (root) {
  if (!root) return 0
  return 1 + Math.max(getHeight(root.left), getHeight(root.right))
}
var isBalanced = function (root) {
  if (!root) return true
  return (
    Math.abs(getHeight(root.left) - getHeight(root.right)) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  )
}

//平衡二叉树二
var isBalanced = function (root) {
  if (!root) return true
  const dfs = (root) => {
    if (!root) return [0, true]
    const left = dfs(root.left)
    const right = dfs(root.right)
    const height = Math.max(left[0], right[0]) + 1
    if (!left[1] || !right[1]) return [height, false]
    if (Math.abs(left[0] - right[0]) > 1) return [height, false]
    return [height, true]
  }
  return dfs(root)[1]
}

//平衡二叉树三
var isBalanced = function (root) {
  const dfs = (root) => {
    if (!root) return 0
    const left = dfs(root.left)
    const right = dfs(root.right)
    if (left < 0 || right < 0) return -1
    if (Math.abs(left - right) > 1) return -1
    return Math.max(left, right) + 1
  }
  return dfs(root) >= 0
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
 * 783. 二叉搜索树节点最小距离
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function (root) {
  let min = Infinity

  const dfs = (root) => {
    if (!root) return []
    return [...dfs(root.left), root.val, ...dfs(root.right)]
  }
  const nodes = dfs(root).sort()

  for (var i = 0; i < nodes.length; i++) {
    for (var j = i + 1; j < nodes.length; j++) {
      min = Math.min(min, Math.abs(nodes[j] - nodes[i]))
    }
  }
  return min
}
var minDiffInBST2 = function (root) {
  let min = Infinity

  const dfs = (root) => {
    if (!root) return []
    return [...dfs(root.left), root.val, ...dfs(root.right)]
  }
  const nodes = dfs(root).sort((a, b) => (a - b > 0 ? 1 : -1))
  for (var i = 0, j = i + 1; j < nodes.length; ) {
    min = Math.min(min, Math.abs(nodes[j] - nodes[i]))
    i++
    j = i + 1
  }
  return min
}
var minDiffInBST3 = function (root) {
  if (!root) return 0
  if (!root.left && !root.right) return 0
  let min = Infinity
  let pre = -Infinity
  const dfs = (root) => {
    if (!root) return
    dfs(root.left)
    min = Math.min(root.val - pre, min)
    pre = root.val
    dfs(root.right)
  }
  return min
}
