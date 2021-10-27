// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

// 示例：
// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4

// 方法一：递归法
// 依次比较两个链表中首项的大小，保留数值小的为链表当前值，直到一个链表参数为空则结束。
var mergeTwoLists = function (l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
// 时间复杂度：O(m + n); 空间复杂度：O(m + n)

// 方法二：迭代：双指针法
// 创建一个新链表，通过判断两个链表当前值，将较小值放到新链表的下个节点，较小值的链表重新赋值为其下一节点，直到参数链表都为空时结束
var mergeTwoLists = function (l1, l2) {
  const prevHead = new ListNode(-1);

  let prev = prevHead;
  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      prev.next = l1;
      l1 = l1.next;
    } else {
      prev.next = l2;
      l2 = l2.next;
    }
    prev = prev.next;
  }
  prev.next = l1 || l2;
  return prevHead.next;
};
// 时间复杂度：O(m + n); 空间复杂度：O(1)
