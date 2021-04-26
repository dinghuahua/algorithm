var maxPathSum = function (root) {
  let max = -Infinity
  const dfs = (root) => {
    if (!root) return 0
    const left = dfs(root.left)
    const right = dfs(root.right)
    const v = Math.max(left, 0) + root.val + Math.max(right, 0)
    max = Math.max(max, v)
    return root.val + Math.max(left, right, 0)
  }
  dfs(root)
  return max
}
