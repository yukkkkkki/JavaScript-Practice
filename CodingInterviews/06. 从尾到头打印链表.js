/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function (head) {
  const res = [];

  let cur = head;
  while (cur) {
    res.unshift(cur.val);
    cur = cur.next;
  }

  return res;
};
