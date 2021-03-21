/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 面试题 02.02. 返回倒数第 k 个节点  是否可以尾递归
 * @param {ListNode} head
 * @param {number} k
 * @return {number}
 */
var kthToLast = function (head, k) {
  let arr = []
  const dfs = (node) => {
    if (!node) return
    arr.push(node.val)
    dfs(node.next)
  }
  dfs(head)
  return arr[arr.length - k]
}

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
var getKthFromEnd = function(head, k) {

};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 21. 合并两个有序链表  联想897题目
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoListsError = function (l1, l2) {
  let head = ListNode()
  cur = head
  const dfs = (l1, l2) => {
    if (!l1) {
      cur.next = l2
      return
    } else if (!l2) {
      cur.next = l1
      return
    } else if (l1.val < l2.val) {
      cur.next = l1
      l1 = l1.next
    } else if (l1.val === l2.val) {
      cur.next = l1
      cur = cur.next
      cur.next = l2
      l1 = l1.next
      l2 = l2.next
    } else {
      cur.next = l2
      l2 = l2.next
    }
    cur = cur.next
    dfs(l1, l2)
  }
  dfs(l1, l2)
  return head.next
}
var mergeTwoLists2 = function (l1, l2) {
  if (!l1) {
    return l2
  } else if (!l2) {
    return l1
  } else if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  }
}
