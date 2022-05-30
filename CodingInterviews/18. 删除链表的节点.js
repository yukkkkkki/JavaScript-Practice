/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
// 方法一：递归
var deleteNode = function (head, val) {
  if (head === null) return null;
  if (head.val == val) return head.next;
  head.next = deleteNode(head.next, val);
  return head;
};

// 方法二：迭代
var deleteNode = function (head, val) {
  let pre = new ListNode(-1);
  pre.next = head;
  let node = pre;
  while (node.next) {
    if (node.next.val === val) {
      node.next = node.next.next;
      break;
    }
    node = node.next;
  }
  return pre.next;
};
