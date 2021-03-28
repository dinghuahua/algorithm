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
var reverseList = function (head, res = null) {
  if (!head) return null
  const next = head.next
  head.next = res
  return reverseList(next, head)
}

var reverseList = function (head) {
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
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */ let prel
//head -> 5
/**[1,1,1,2,3,3,4,5,5]
 * 83. 删除排序链表中的重复元素  如果不得使用临时缓冲区，该怎么解决？
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (!head) return null
  let pre = head
  while (head.next) {
    if (head.next.val === head.val) {
      head.next = head.next.next //null;
    } else {
      head = head.next
    }
  }
  return pre
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
// var removeElementsError = function (head, val) {
//   if (!head) return null;
//   let node = head,
//     pre = head;
//   while (head) {
//     if (head.val === val) {
//       if (head.next) {
//         pre = head;
//         head.val = head.next.val;
//         head.next = head.next.next;
//       } else {
//         pre.next = null;
//         break;
//       }
//     } else {
//       pre = head;
//       head = head.next;
//     }
//   }
//   if (node && node.val === val) node = node.next;
//   return node;
// };
var removeElements = function (head, val) {
  while (head && head.val === val) {
    head = head.next
  }
  if (!head) return head
  const node = head
  let next = node
  while (next.next) {
    if (next.next.val === val) {
      next.next = next.next.next
    } else {
      next = next.next
    }
  }
  return node
}

var isPalindrome = function (head) {
  if (!head || !head.next) return true

  let start = head
  let next = head.next
  while (next) {
    next.pre = head
    head = head.next
    next = next.next
  }
  while (start.val === head.val) {
    start = start.next
    head = head.pre
    if (start == head) return true
  }
  return false
}
var maxSubArray = function (nums) {
  const l = nums.length
  let dp = nums[0]
  let max = -Infinity
  for (let i = 1; i < l; i++) {
    if (dp < 0) {
      dp = nums[i]
    } else {
      dp += nums[i]
    }
    max = Math.max(max, dp)
  }
  return max
}
var secondHighest = function (s) {
  let a = -1
  let b = -2
  for (const n of s) {
    const v = Number(n)
    if (Number.isNaN(v)) {
      continue
    } else {
      if (v > a) {
        ;[a, b] = [v, a]
      } else if (v !== a && v > b) {
        b = v
      }
    }
  }
  return b >= 0 ? b : -1
}
