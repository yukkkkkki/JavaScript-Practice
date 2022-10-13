/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (!head) return head;

  const dummy = new ListNode(0, head);
  let cur = dummy;

  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      const x = cur.next.val;
      // 找最后一个重复元素的下一位
      while (cur.next && cur.next.val === x) {
        cur.next = cur.next.next;
      }
    } else cur = cur.next;
  }

  return dummy.next;
};
// 时间复杂度：o(n)
// 空间复杂度：o(1)
