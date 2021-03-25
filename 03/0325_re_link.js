/**
 * 141. 环形链表 [1,2]   -1
 * @param {ListNode} head
 * @return {boolean}
 */

var hasCycle = function (head) {
  if (!head || !head.next) return false
  // 中间的前一个
  let slow = head,
    fast = head.next
  // 否则会进不去循环
  while (slow !== fast) {
    if (!fast || !fast.next) {
      return false
    }
    slow = slow.next
    fast = fast.next.next
  }
  return slow === fast && fast.next
}
