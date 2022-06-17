/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeDuplicateNodes = function (head) {
  if (!head) return head;
  const dummy = new ListNode(0);
  dummy.next = head;

  // 用来存储遍历过的节点信息
  const map = new Map();

  let pre = dummy;
  let cur = pre.next;
  while (cur) {
    if (!map.get(cur.val)) {
      map.set(cur.val, 1);
      pre = cur;
    } else {
      pre.next = cur.next;
    }
    cur = cur.next;
  }
  return dummy.next;
};
