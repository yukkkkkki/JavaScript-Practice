// 输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。例如，一个链表有6个节点，从头节点开始，它们的值依次是1、2、3、4、5、6。这个链表的倒数第3个节点是值为4的节点。

// 示例：
// 给定一个链表: 1->2->3->4->5, 和 k = 2.
// 返回链表 4->5.

// 双指针
// 用两个指针，让第一个先走k步, 然后两个指针一起移动
// 当第一个指针到最后一个节点处，第二个指针就在倒数第K个节点
var getKthFromEnd = function (head, k) {
  if (head == null || k == 0) return null;
  let first = head,
    second = head;
  while (k !== 0) {
    first = first.next;
    k--;
  }
  while (first !== null) {
    first = first.next;
    second = second.next;
  }
  return second;
};
