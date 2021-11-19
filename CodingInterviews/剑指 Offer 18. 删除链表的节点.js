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
var deleteNode = function (head, val) {
  let dummy = new ListNode(-1);
  dummy.next = head;

  let cur = dummy;
  while (cur.next) {
    if (cur.next.val === val) {
      cur.next = cur.next.next;
      break;
    }
    cur = cur.next;
  }

  return dummy.next;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
