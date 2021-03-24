/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 876. 链表的中间结点
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let len = 1,
    node = head;
  while (node.next) {
    ++len;
    node = node.next;
  }
  const mid = ~~(len / 2);
  node = head;
  let cur = 0;
  while (cur < mid) {
    ++cur;
    node = node.next;
  }
  return node;
};
// 0 1
var middleNode1 = function (head) {
  if (!head && !head.next) return head;
  let left = head,
    right = head;
  while (right && right.next) {
    left = left.next;
    right = right.next.next;
  }
  return left;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 237. 删除链表中的节点
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
  node.val = node.next.val;
  node.next = node.next.next;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 剑指 Offer 18. 删除链表的节点
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function (head, val) {
  let node = head,
    pre = null;
  while (node.next) {
    if (node.val === val) {
      node.val = node.next.val;
      if (node.next.next) {
        node.next = node.next.next;
      } else {
        node.next = null;
      }
      break;
    }
    pre = node;
    node = node.next;
  }
  // 为什么不可以删除最后一个？？？
  // if (node.val === val) node = null
  if (node.val === val) pre.next = null;
  return head;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 234. 回文链表
 * 进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？？？ 是否可以用指针
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  if (!head) return true;
  let node = head,
    arr = [];
  while (node.next) {
    arr.push(node.val);
    node = node.next;
  }
  arr.push(node.val);
  for (var i = 0, j = arr.length - 1; i < j; i++, j--) {
    if (arr[i] !== arr[j]) return false;
  }
  return true;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 剑指 Offer 52. 两个链表的第一个公共节点
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
// 不会写
var getIntersectionNode = function (headA, headB) {
  let nodeA = headA,
    nodeB = headB;

  while (
    !nodeA &&
    !nodeB &&
    (nodeA.val !== nodeB.val || nodeA.next !== nodeB.next)
  ) {
    // 可能不是第一个相交的节点
    nodeA = nodeA.next;
    nodeB = nodeB.next;
  }
};
