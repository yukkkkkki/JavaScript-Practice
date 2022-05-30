/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
// 方法一：递归法
// 依次比较两个链表中首项的大小，保留数值小的为链表当前值，直到一个链表参数为空则结束。
var mergeTwoLists = function (list1, list2) {
  if (!list1) return list2;
  if (!list2) return list1;

  if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
};
// 时间复杂度：O(m + n)
// 空间复杂度：O(m + n)

// 方法二：迭代 双指针法
var mergeTwoLists = function (l1, l2) {
  // 创建一个新链表
  const prevHead = new ListNode(-1);
  let prev = prevHead;

  // 判断两个链表当前值
  // 将较小值放到新链表的下个节点，较小值的链表重新赋值为其下一节点，直到参数链表都为空时结束
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
// 时间复杂度：O(m + n)
// 空间复杂度：O(1)
