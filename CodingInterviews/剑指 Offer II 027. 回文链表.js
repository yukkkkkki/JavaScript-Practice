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
// 先找中点 然后后半部分反转 再与前半部分对比
var isPalindrome = function (head) {
  if (!head || !head.next) return true;

  const firstHalfEnd = endOfFirstHalf(head);
  const secondHalfStart = reverseLinkList(firstHalfEnd.next);

  // 判断是否回文
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

// 找中点
const endOfFirstHalf = (head) => {
  let slow = head;
  let fast = head;

  while (fast.next && fast.next.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
};

// 反转链表
const reverseLinkList = (root) => {
  let prev = null;
  let cur = root;

  while (cur) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }

  return prev;
};
