/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) return null;

  let pa = headA;
  let pb = headB;

  while (pa || pb) {
    while (pa === pb) return pa;
    pa = pa ? pa.next : headB;
    pb = pb ? pb.next : headA;
  }

  return null;
};
