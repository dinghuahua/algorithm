/**
 * 86. 分隔链表
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partitionError = function (head, x) {
  let xNode = head,
    left = head;

  // console.log(head,x)
  while (xNode && xNode.val !== x) {
    xNode = xNode.next;
  }

  let preL = head,
    preR = xNode,
    right = xNode.next;
  while (left.val !== x) {
    if (left.val > x) {
      while (right) {
        if (right && right.val < x) {
          // console.log(preL, left, preR, right)
          let rNext = right.next;

          preL.next = right;
          right.next = left.next;

          preR.next = left;
          left.next = rNext;

          left = right;
          right = preR.next;
          while (right && right.val >= x) {
            preR = right;
            right = right.next;
          }
          console.log(head);
          break;
        } else {
          preR = right;
          right = right.next;
        }
      }
    }
    preL = left;
    left = left.next;
  }

  return head;
};

var partitionError = function (head, x) {
  let xNode = head,
    left = head;

  while (xNode && xNode.val !== x) {
    xNode = xNode.next;
  }

  let preL = head,
    preR = xNode,
    right = xNode.next;

  while (right) {
    while (right && right.val >= x) {
      preR = right;
      right = right.next;
    }
    while (left && left.val <= right.val) {
      preL = left;
      left = left.next;
    }
    let rNext = right?.next;

    right.next = left.next;
    preL.next = right;

    right = rNext?.next;
    preR.next = right;
  }

  return head;
};

// var partition = function (head, x) {
//   // 设 smallHead 和 largeHead 分别为两个链表的哑节点
//   // 即它们的next 指针指向链表的头节点，这样做的目的是为了更方便地处理头节点为空的边界条件
//   let small = new ListNode(0)
//   const smallHead = small
//   let large = new ListNode(0)
//   const largeHead = large

//   while (head !== null) {
//     if (head.val < x) {
//       small.next = head
//       small = small.next
//     } else {
//       large.next = head
//       large = large.next
//     }
//     head = head.next
//   }
//   // 遍历结束后，我们将 large 的 next 指针置空，这是因为当前节点复用的是原链表的节点，
//   // 而其 next 指针可能指向一个小于 xx 的节点，我们需要切断这个引用
//   large.next = null
//   small.next = largeHead.next
//   return smallHead.next
// }
var partition = function (head, x) {
  const left = new ListNode();
  const right = new ListNode();
  let leftHead = left;
  let rightHead = right;
  while (head) {
    if (head.val >= x) {
      rightHead.next = head;
      rightHead = rightHead.next;
      head = head.next;
      rightHead.next = null;
    } else {
      leftHead.next = head;
      leftHead = leftHead.next;
      head = head.next;
      leftHead.next = null;
    }
  }
  leftHead.next = right.next;
  return left.next;
};

/**
 * 61. 旋转链表
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
// [1] 1
var rotateRightError = function (head, k) {
  if (!k || !head || !head.next) return head;
  let cur = new ListNode(0, head),
    first = head,
    second = cur,
    lenHead = head,
    len = 0;

  while (lenHead) {
    len++;
    lenHead = lenHead.next;
  }
  k = k % len;
  while (k) {
    k--;
    first = first.next;
  }

  while (first) {
    first = first.next;
    second = second.next;
  }
  let tail = second.next;
  second.next = null;
  let end = tail;
  while (end && end.next) {
    end = end.next;
  }
  end.next = head;

  return tail;
};
// 题解
// var rotateRight = function (head, k) {
//   if (k === 0 || !head || !head.next) {
//     return head;
//   }
//   let n = 1;
//   let cur = head;
//   while (cur.next) {
//     cur = cur.next;
//     n++;
//   }

//   // 然后我们找到新链表的最后一个节点（即原链表的第(n - 1) - (k mod n) 个节点），
//   // 将当前闭合为环的链表断开，即可得到我们所需要的结果
//   let add = n - (k % n);
//   if (add === n) {
//     return head;
//   }

//   cur.next = head;
//   while (add) {
//     cur = cur.next;
//     add--;
//   }

//   const ret = cur.next;
//   cur.next = null;
//   return ret;
// };
var rotateRight = function (head, k) {
  const pre = head;
  let l = 0;
  if (!head) return head;
  while (head) {
    l++;
    head = head.next;
  }
  k %= l;
  let slow = pre;
  let fast = pre;
  if (!k) return pre;
  while (k--) {
    fast = fast.next;
  }
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next;
  }
  const newHead = slow.next;
  slow.next = null;
  fast.next = pre;
  return newHead;
};
