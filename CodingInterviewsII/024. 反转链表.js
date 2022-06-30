/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 方法一：迭代
var reverseList = function (head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 方法二：递归
var reverseList = function (head) {
  if (head === null || head.next === null) return head;

  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;

  return newHead;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
