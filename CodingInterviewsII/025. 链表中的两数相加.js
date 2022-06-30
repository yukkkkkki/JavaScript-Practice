/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// 方法一：栈
var addTwoNumbers = function (l1, l2) {
  const stack1 = [];
  const stack2 = [];
  while (l1) {
    stack1.push(l1);
    l1 = l1.next;
  }
  while (l2) {
    stack2.push(l2);
    l2 = l2.next;
  }

  const len = Math.max(stack1.length, stack2.length);
  let one = 0;
  let result = null;
  for (let i = 0; i < len; i++) {
    let x1 = stack1.length ? stack1.pop().val : 0;
    let x2 = stack2.length ? stack2.pop().val : 0;
    let sum = x1 + x2 + one;
    result = new ListNode(sum % 10, result);
    one = Math.floor(sum / 10);
  }

  if (one) result = new ListNode(1, result);
  return result;
};
