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
var hasCycle = function (head) {
    if (!head || !head.next) return false
    let slow = head, fast = head
    while (fast && !fast.next || slow !== fast) {
        slow = slow.next
        fast = fast.next.next
    }
    return slow === fast
}