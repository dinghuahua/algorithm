/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 206. 反转链表
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (!head) return null
  let res = {}
  const dfs = (node) => {
    if (!node.next) {
      res.next = node
      return node
    }
    let pre = dfs(node.next)
    node.next = null
    pre.next = node
    return node
  }
  dfs(head)
  return res.next
}
// 尾递归
var reverseListError = function (head, res = {}) {
  if (!head) return null
  if (!head.next) {
    return head
  }
  reverseList(head.next, res).next = head
  head.next = null
  return res
}

var reverseList2 = function (head) {
  if (!head) return null
  let res = [],
    cur = head
  while (cur) {
    const next = cur.next
    res.unshift(cur)
    cur = cur.next
  }
  let link = {}
  res.reduce((pre, item) => {
    pre.next = item
    item.next = null
    return item
  }, link)
  return link.next
}
var reverseList3 = function (head, res = null) {
  if (!head) return res
  const next = head.next
  head.next = res
  return reverseList3(next, head)
}

var reverseList4 = function (head) {
  if (!head) return null
  let res = null
  while (head) {
    const next = head.next
    head.next = res
    //
    res = head
    head = next
  }
  return res
}

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 剑指 Offer 06. 从尾到头打印链表
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function (head, res = []) {
  if (!head) {
    return res
  }
  if (!head.next) {
    res.push(head.val)
    return res
  }
  reversePrint(head.next, res)
  res.push(head.val)
  return res
}

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 🌟🌟🌟🌟🌟
 * 141. 环形链表  [1,2]   -1
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  if (!head || !head.next) return false
  var map = new Map()
  while (head) {
    if (!head.next) return false
    if (map.has(head)) return true
    map.set(head, head.next)
    head = head.next
  }
}
// [1,2]   -1
var hasCycle = function (head) {
  if (!head || !head.next) return false
  let slow = head,
    fast = head.next
  // fast先下一个，否则会进不去循环
  while (slow !== fast) {
    if (!fast || !fast.next) {
      return false
    }
    slow = slow.next
    fast = fast.next.next
  }
  return true
}

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 1290. 二进制链表转整数
 * @param {ListNode} head
 * @return {number}
 */
var getDecimalValue = function (head) {
  if (!head) return 0
  if (!head.next) return head.val
  let num = 0
  while (head) {
    num = 2 * num + head.val
    head = head.next
  }
  return num
}
var getDecimalValue = function (head) {
  if (!head) return 0
  if (!head.next) return head.val
  let res = []
  while (head) {
    res.unshift(head.val)
    head = head.next
  }
  return res.reduce((sum, item, index) => sum + Math.pow(2, index) * item, 0)
}
