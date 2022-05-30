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
 * @return {ListNode}
 */
// 方法一：双指针
var getKthFromEnd = function (head, k) {
  if (!head || k === 0) return null;

  let first = head;
  let second = head;

  // 让一个先走 k 步
  while (k !== 0) {
    first = first.next;
    k--;
  }

  // 两个指针一起移动
  // 当第一个指针到最后一个节点处，第二个指针就在倒数第 K个节点
  while (first !== null) {
    first = first.next;
    second = second.next;
  }

  return second;
};
// 时间复杂度 O(n)
// 空间复杂度 O(1)
