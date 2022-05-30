/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
// 方法一：双指针
var removeNthFromEnd = function (head, n) {
  // 指针 first 指向头节点，然后让其向后移动 n 步
  let first = head;
  while (n > 0) {
    first = first.next;
    n--;
  }

  // 如果 first 为 null，则要删除的节点是首节点
  if (!first) return head.next;

  // second 和 first 一起向后移动
  // 当 first.next == null，second 指向了要删除节点的前一个节点
  let second = head;
  while (first.next) {
    first = first.next;
    second = second.next;
  }

  // 删除节点
  second.next = second.next.next;
  return head;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)

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
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 方法三：栈
// 遍历链表的同时将所有节点入栈 则弹出栈的第 n 个节点就是需要删除的节点
// 且目前栈顶的节点就是待删除节点的前驱节点
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(0, head);
  const stack = [];
  let cur = dummy;
  while (cur) {
    stack.push(cur);
    cur = cur.next;
  }

  for (let i = 0; i < n; i++) {
    stack.pop();
  }

  let prev = stack[stack.length - 1];
  prev.next = prev.next.next;
  return dummy.next;
};
// 时间复杂度：O(L)
// 空间复杂度：O(L)
