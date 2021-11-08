// 存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除所有重复的元素，使每个元素 只出现一次 。

// 返回同样按升序排列的结果链表。

// 示例 1：
// 输入：head = [1,1,2]
// 输出：[1,2]

// 示例 2：
// 输入：head = [1,1,2,3,3]
// 输出：[1,2,3]
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
// 方法一：一次遍历
var deleteDuplicates = function (head) {
  const dummy = new ListNode(0, head);

  let pre = dummy;
  let cur = pre.next;

  while (cur && cur.next) {
    if (cur.val === cur.next.val) {
      const x = cur.val;
      while (cur.next && cur.next.val === x) {
        cur.next = cur.next.next;
      }
    } else {
      cur = cur.next;
    }
  }
  return dummy.next;
};
// 时间复杂度：o(n)
// 空间复杂度：o(1)
