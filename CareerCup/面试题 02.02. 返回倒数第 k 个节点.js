// 实现一种算法，找出单向链表中倒数第 k 个节点。返回该节点的值。

// 注意：本题相对原题稍作改动

// 示例：
// 输入： 1->2->3->4->5 和 k = 2
// 输出： 4

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {number}
 */
var kthToLast = function (head, k) {
  if (!head || !k) return null;

  let first = head;
  let second = head;

  while (k) {
    first = first.next;
    k--;
  }
  while (first) {
    first = first.next;
    second = second.next;
  }
  return second.val;
};
