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
 var addTwoNumbers = function (l1, l2) {
  const dummy = new ListNode(-1);
  let curr = dummy;
  let carry = 0;

  while (l1 || l2) {
    const x = l1 ? l1.val : 0;
    const y = l2 ? l2.val : 0;
    const total = x + y + carry;

    curr.next = new ListNode(total % 10);
    curr = curr.next;

    // 计算进位
    carry = Math.floor(total / 10);

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  if (carry) curr.next = new ListNode(carry);
  return dummy.next;
};