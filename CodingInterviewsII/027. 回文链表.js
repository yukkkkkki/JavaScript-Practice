/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 方法一：快慢指针
// 快慢指针步速相差 1，慢指针找中间点，快指针找尾结点
// 后半部分反转，与前半部分比较
var isPalindrome = function (head) {
  if (!head || !head.next) return true;

  const firstHalfEnd = endOfFirstHalf(head);
  const secondHalfStart = reverseLinkList(firstHalfEnd.next);

  let p1 = head;
  let p2 = secondHalfStart;
  let result = true;
  while (result && p2) {
    if (p1.val !== p2.val) return false;
    p1 = p1.next;
    p2 = p2.next;
  }

  firstHalfEnd.next = reverseLinkList(secondHalfStart);
  return result;
};
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const endOfFirstHalf = (head) => {
  let fast = head;
  let slow = head;
  while (fast.next && fast.next.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
};
const reverseLinkList = (root) => {
  let prev = null;
  let curr = root;

  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
};
