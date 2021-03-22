/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 剑指 Offer 22. 链表中倒数第k个节点
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
  const dfs = (node, len = 0, k) => {
    if (!node) return len
    if (len === k) return node
    return dfs(node.next, len + 1, k)
  }
  const len = dfs(head, 0, Infinity)
  const node = dfs(head, 0, len - k)
  return node
};


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 面试题 02.03. 删除中间节点
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
  // const dfs = (node) => {
  //   if (!node) return 0
  //   return 1 + dfs(node.next)
  // }
  // const len = dfs(node)
  // const mid = ~~(len + 1) / 2
  // // console.log(len,mid)

  // const del = (pre, node, index = 0) => {
  //   if (!node) return
  //   if (index === mid) pre.next = node.next
  //   del(node, node.next, index + 1)
  // }
  // del(null, node)

  node.val = node.next.val;
  node.next = node.next.next;
};
