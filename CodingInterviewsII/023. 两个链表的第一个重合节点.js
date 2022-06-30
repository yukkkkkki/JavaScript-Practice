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
// 方法一：双指针
var getIntersectionNode = function (headA, headB) {
  let p1 = headA;
  let p2 = headB;

  while (p1 !== p2) {
    p1 = p1 === null ? headB : p1.next;
    p2 = p2 === null ? headA : p2.next;
  }
  return p1;
};
// 时间复杂度：O(m+n)
// 空间复杂度：O(1)

// 方法一：哈希集合
var getIntersectionNode = function (headA, headB) {
  const visited = new Set();
  let temp = headA;

  while (temp) {
    visited.add(temp);
    temp = temp.next;
  }

  temp = headB;
  while (temp) {
    if (visited.has(temp)) {
      return temp;
    }
    temp = temp.next;
  }
  return null;
};
// 时间复杂度：O(m+n)
// 空间复杂度：O(m)
