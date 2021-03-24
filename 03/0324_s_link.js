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

var reverseList = function (head) {
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

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 83. 删除排序链表中的重复元素  如果不得使用临时缓冲区，该怎么解决？
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (!head) return null
  let node = head,
    pre = head,
    map = new Map()
  while (node) {
    if (map.has(node.val)) {
      pre.next = node.next
    } else {
      map.set(node.val, 1)
      pre = node
    }
    node = node.next
  }
  return head
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
 * 141. 环形链表
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

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 203. 移除链表元素   不会考虑边界情况
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElementsError = function (head, val) {
  if (!head) return null
  let node = head,
    pre = head
  while (head) {
    if (head.val === val) {
      if (head.next) {
        pre = head
        head.val = head.next.val
        head.next = head.next.next
      } else {
        pre.next = null
        break
      }
    } else {
      pre = head
      head = head.next
    }
  }
  if (node && node.val === val) node = node.next
  return node
}
