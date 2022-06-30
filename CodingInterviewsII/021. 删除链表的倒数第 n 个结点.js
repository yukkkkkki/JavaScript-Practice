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
// 方法一：双指针法
var removeNthFromEnd = function (head, n) {
  if (!head || !n) return null;
  let first = head;
  let second = head;

  while (n-- !== 0) {
    first = first.next;
  }

  if (!first) return head.next;

  while (first.next) {
    first = first.next;
    second = second.next;
  }

  second.next = second.next.next;
  return head;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 方法二：栈
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
