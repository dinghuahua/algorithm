/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 142. 环形链表 II
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let map = new Map()

  while (head) {
    if (map.has(head)) return head
    map.set(head, true)
    head = head.next
  }
  return null
}

// 题解
var detectCycle2 = function (head) {
  const visited = new Set()
  while (head !== null) {
    if (visited.has(head)) {
      return head
    }
    visited.add(head)
    head = head.next
  }
  return null
}
var detectCycle3 = function (head) {
  if (!head) return head
  let list = new ListNode()
  list.next = head
  let fast = list
  let slow = list
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) break
  }
  if (slow !== fast) return null
  while (list !== slow) {
    slow = slow.next
    list = list.next
  }
  return list
}
/**
 * 287. 寻找重复数
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  let setNum = new Set()
  for (let i = 0; i < nums.length; i++) {
    if (setNum.has(nums[i])) return nums[i]
    setNum.add(nums[i])
  }
}
// 题解 双指针
// 看不懂
var findDuplicate = function (nums) {
  // let slow = 0,
  //   fast = 0
  // do {
  //   slow = nums[slow]
  //   fast = nums[nums[fast]]
  // } while (slow != fast)
  // slow = 0
  // while (slow != fast) {
  //   slow = nums[slow]
  //   fast = nums[fast]
  // }
  // return slow
  const l = nums.length
  for (let i = 0; i < l; i++) {
    nums[Math.abs(nums[i])] *= -1
  }
  for (let i = 1; i < l; i++) {
    if (nums[i] > 0) return i
  }
}
