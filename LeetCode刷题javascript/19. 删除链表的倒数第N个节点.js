// 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

// 示例：
// 给定一个链表: 1->2->3->4->5, 和 n = 2.
// 当删除了倒数第二个节点后，链表变为 1->2->3->5.

// 方法一：双指针法
// 1. 指针 first 指向头节点，然后，让其向后移动 n 步。
// 2. 指针 second 指向头结点，并和 first 一起向后移动。当 first 的 next 指针为 null 时，second 即指向了要删除节点的前一个节点。
// 3. 指针 first 的 next 指向要删除节点的下一个节点。
var removeNthFromEnd = function (head, n) {
  let first = head;
  let second = head;
  while (n > 0) {
    first = first.next;
    n -= 1;
  }
  // 如果first为null，则要删除的节点是首节点，直接返回head
  if (!first) return head.next;
  while (first.next) {
    first = first.next;
    second = second.next;
  }
  second.next = second.next.next;
  return head;
};
// 时间复杂度：O(n); 空间复杂度：O(1)

// 方法二：单向链表成为双向链表
// 1. 指针 cur 指向头节点，并定义 cur.prev、cur.next 使其成为双向链表。
// 2. 找到其尾节点，当 cur.next 不存在时，则当前节点 cur 为尾节点。
// 3. 遍历链表同时向前推进。n 做递减，当 n=1 时就是我们要删除的节点位置，
//    否则，就让节点向前推进一个节点，直到 n=1 删除当前节点。
//    （同时要考虑要删除的要删除的节点位置刚好是头节点的时候）
var removeNthFromEnd = function (head, n) {
  let cur = head;
  while (cur.next) {
    cur.next.prev = cur;
    cur = cur.next;
  }

  if (n === 1) {
    // 删除最后一个节点
    if (!cur.prev) {
      // 若是头节点则直接返回null
      return null;
    } else {
      cur.prev.next = null;
      return head;
    }
  }

  while (n > 0 && cur) {
    if (n === 1) {
      if (!cur.prev) {
        cur.next.prev = null;
        return cur.next;
      } else {
        cur.prev.next = cur.next;
        cur.next.prev = cur.prev;
        return head;
      }
    }
    cur = cur.prev;
    n -= 1;
  }
};
// 时间复杂度：O(n); 空间复杂度：O(1)
