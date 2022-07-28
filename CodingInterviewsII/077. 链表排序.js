/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 方法一：归并排序
// 将链表分成两个子链表，对两个子链表排序后再将它们合并成一个排序的链表
var sortList = function (head) {
  if (!head || !head.next) return head;

  // 使用快慢指针找到中间节点
  let slow = head;
  let fast = head.next;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  // 将链表分成两半，并返回后半部分链表的头节点
  let newList = slow.next;
  slow.next = null;

  // 对前后两个链表进行排序
  let left = sortList(head);
  let right = sortList(newList);
  let res = new ListNode(-1);
  let nHead = res;
  while (left && right) {
    if (left.val < right.val) {
      nHead.next = left;
      left = left.next;
    } else {
      nHead.next = right;
      right = right.next;
    }
    nHead = nHead.next;
  }
  nHead.next = left === null ? right : left;
  return res.next;
};
