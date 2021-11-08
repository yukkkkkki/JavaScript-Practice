// 存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除链表中所有存在数字重复情况的节点，只保留原始链表中 没有重复出现 的数字。

// 返回同样按升序排列的结果链表。

// 示例 1：
// 输入：head = [1,2,3,3,4,4,5]
// 输出：[1,2,5]

// 示例 2：
// 输入：head = [1,1,1,2,3]
// 输出：[2,3]

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
    } else {
      cur = cur.next;
    }
  }
  return dummy.next;
};
// 时间复杂度：o(n)
// 空间复杂度：o(1)
