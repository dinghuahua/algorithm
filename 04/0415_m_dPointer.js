/**
 * 19. 删除链表的倒数第 N 个结点
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let cur = new ListNode(0, head), first = head, second = cur;
  for (let i = 0; i < n; ++i) {
    first = first.next;
  }
  while (first) {
    first = first.next;
    second = second.next;
  }
  second.next = second.next.next;
  return cur.next;
}

/**
 * 86. 分隔链表
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partitionError = function (head, x) {
  let xNode = head, left = head

  // console.log(head,x)
  while (xNode && xNode.val !== x) {
    xNode = xNode.next
  }

  let preL = head, preR = xNode, right = xNode.next
  while (left.val !== x) {
    if (left.val > x) {
      while (right) {
        if (right && right.val < x) {
          // console.log(preL, left, preR, right)
          let rNext = right.next

          preL.next = right
          right.next = left.next

          preR.next = left
          left.next = rNext

          left = right
          right = preR.next
          while (right && right.val >= x) {
            preR = right
            right = right.next
          }
          console.log(head)
          break
        } else {
          preR = right
          right = right.next
        }
      }
    }
    preL = left
    left = left.next
  }

  return head
};

var partitionError = function (head, x) {
  let xNode = head, left = head

  while (xNode && xNode.val !== x) {
    xNode = xNode.next
  }

  let preL = head, preR = xNode, right = xNode.next

  while (right) {
    while (right && right.val >= x) {
      preR = right
      right = right.next
    }
    while (left && left.val <= right.val) {
      preL = left
      left = left.next
    }
    let rNext = right?.next

    right.next = left.next
    preL.next = right

    right = rNext?.next
    preR.next = right

  }

  return head
};

var partition = function (head, x) {
  // 设 smallHead 和 largeHead 分别为两个链表的哑节点
  // 即它们的next 指针指向链表的头节点，这样做的目的是为了更方便地处理头节点为空的边界条件
  let small = new ListNode(0);
  const smallHead = small;
  let large = new ListNode(0);
  const largeHead = large;

  while (head !== null) {
    if (head.val < x) {
      small.next = head;
      small = small.next;
    } else {
      large.next = head;
      large = large.next;
    }
    head = head.next;
  }
  // 遍历结束后，我们将 large 的 next 指针置空，这是因为当前节点复用的是原链表的节点，
  // 而其 next 指针可能指向一个小于 xx 的节点，我们需要切断这个引用
  large.next = null;
  small.next = largeHead.next;
  return smallHead.next;
};
