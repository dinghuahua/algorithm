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
    node = head
  while (node.next) {
    ++len
    node = node.next
  }
  const mid = ~~(len / 2)
  node = head
  let cur = 0
  while (cur < mid) {
    ++cur
    node = node.next
  }
  return node
}
var middleNode1 = function (head) {
  let left = head,
    right = head
  while (right.next) {
    left = left.next
    right = right.next
    if (right.next) {
      right = right.next
    } else {
      break
    }
  }
  return left
}
var middleNode2 = function (head) {
  if (!head && !head.next) return head
  let left = head,
    right = head
  while (right && right.next) {
    left = left.next
    right = right.next.next
  }
  return left
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
 * 237. 删除链表中的节点
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
  node.val = node.next.val
  node.next = node.next.next
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
 * 剑指 Offer 18. 删除链表的节点
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNodeError = function (head, val) {
  if (head.val === val) return head.next

  let cur = head
  while (cur !== null && cur.val !== val) {
    cur = cur.next
  }
  // 只用一个指针无法删除链表中的最后一个
  // 最后 一个没办法置为空，需要前一个指针
  if (!cur) {
    cur.val = cur.next.val
    cur.next = cur.next.next
  }
  return head
}
var deleteNode = function (head, val) {
  let node = head,
    pre = null
  while (node.next) {
    if (node.val === val) {
      node.val = node.next.val
      if (node.next.next) {
        node.next = node.next.next
      } else {
        node.next = null
      }
      break
    }
    pre = node
    node = node.next
  }
  // 为什么不可以删除最后一个？？？
  if (node.val === val) pre.next = null
  return head
}
var deleteNode2 = function (head, val) {
  if (head.val === val) {
    head = head.next
    return head
  }
  let node = head,
    pre = head
  while (node && node.next) {
    if (node.val === val) {
      node.val = node.next.val
      node.next = node.next.next
      break
    }
    pre = node
    node = node.next
  }
  if (node.val === val) pre.next = null
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
 * 🌟🌟🌟🌟🌟
 * 剑指 Offer 18. 删除链表的节点
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function (head, val) {
  let node = head,
    pre = null
  while (node.next) {
    if (node.val === val) {
      node.val = node.next.val
      if (node.next.next) {
        node.next = node.next.next
      } else {
        node.next = null
      }
      break
    }
    pre = node
    node = node.next
  }
  // 为什么不可以删除最后一个？？？
  if (node.val === val) pre.next = null
  return head
}

var deleteNode = function (head, val) {
  if (head.val === val) {
    head = head.next
    return head
  }
  let node = head,
    pre = head
  while (node && node.next) {
    if (node.val === val) {
      node.val = node.next.val
      node.next = node.next.next
      break
    }
    pre = node
    node = node.next
  }
  if (node.val === val) pre.next = null
  return head
}

// 题解-》优化 剑指 Offer 18. 删除链表的节点
var deleteNode = function (head, val) {
  if (head.val == val) return head.next
  let pre = head,
    cur = head.next
  while (cur != null && cur.val != val) {
    pre = cur
    cur = cur.next
  }
  // 找到值的退出或者遍历结束没有找到值退出
  if (cur != null) pre.next = cur.next
  return head
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 🌟🌟🌟🌟🌟
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

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 🌟🌟🌟🌟🌟
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
var deleteDuplicates1 = function (head) {
  if (!head) return null
  let pre = head
  while (head.next) {
    if (head.val === head.next.val) {
      head.next = head.next.next //null;
    } else {
      head = head.next
    }
  }
  return pre
}
// 题解-》优化 剑指 Offer 18. 删除链表的节点
var deleteNode = function (head, val) {
  if (head.val == val) return head.next
  let pre = head,
    cur = head.next
  while (cur != null && cur.val != val) {
    pre = cur
    cur = cur.next
  }
  // 找到值的退出
  if (cur != null) pre.next = cur.next
  return head
}
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 234. 回文链表 ????
 * 进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？？？ 是否可以用指针
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  if (!head) return true
  let node = head,
    arr = []
  while (node.next) {
    arr.push(node.val)
    node = node.next
  }
  arr.push(node.val)
  for (var i = 0, j = arr.length - 1; i < j; i++, j--) {
    if (arr[i] !== arr[j]) return false
  }
  return true
}
// 将链表转为双向链表
var isPalindrome2 = function (head) {
  if (!head || !head.next) return true

  let start = head,
    next = head.next

  while (next) {
    next.pre = head
    head = head.next
    next = next.next
  }

  while (start && head && start.val === head.val) {
    if (start === head || start === head.pre || start.next === head) return true
    start = start.next
    head = head.pre
  }

  return false
}
var isPalindrome3 = function (head) {
  if (!head || !head.next) return true

  // head.pre = null
  let start = head
  let next = head.next
  while (next) {
    next.pre = head
    head = head.next
    next = next.next
  }
  while (start.val === head.val) {
    // 如果把判断语句一道前面，
    // 那么在上一次的循环中为空时将没有拦截，进入到while循环语句，会报错 不存在val属性
    // 所以此判断应该写到结束处进行拦截null 和undefined
    // if (start == head) return true
    start = start.next
    head = head.pre
    // 遍历到末尾 next默认null  pre为undefined
    // start:null head:undefined
    if (start == head) return true
  }
  return false
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
 * 剑指 Offer 52. 两个链表的第一个公共节点
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
// 不会写
var getIntersectionNodeError = function (headA, headB) {
  let nodeA = headA,
    nodeB = headB

  while (
    !nodeA &&
    !nodeB &&
    (nodeA.val !== nodeB.val || nodeA.next !== nodeB.next)
  ) {
    // 可能不是第一个相交的节点
    nodeA = nodeA.next
    nodeB = nodeB.next
  }
}

var getIntersectionNode2 = function (headA, headB) {
  let a = headA
  let b = headB
  if (!headB || !headA) return null
  while (a !== b) {
    if (!a.next && !b.next) return null
    a = a.next ? a.next : headB
    b = b.next ? b.next : headA
  }
  return a
}
var getIntersectionNode3 = function (headA, headB) {
  let pa = headA
  let pb = headB
  while (pa !== pb) {
    pa = pa ? pa.next : headB
    pb = pb ? pb.next : headA
  }
  return pa
}
