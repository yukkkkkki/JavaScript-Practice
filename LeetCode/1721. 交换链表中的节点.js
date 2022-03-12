/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
// 方法一：快慢指针
// 首先将快指针移动 K 步，此时快指针指向正数第 K 个节点
// 同时移动快慢指针 直到链表末尾 即快指针为空 此时慢指针指向倒数第 K 个节点
// 交换两个节点的值 返回链表头
var swapNodes = function (head, k) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let slow = dummy;
  let fast = dummy;
  let nodeK;

  var i = 0;
  while (i++ < k) {
    fast = fast.next;
  }
  nodeK = fast;
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }

  i = nodeK.val;
  nodeK.val = slow.val;
  slow.val = i;
  return head;
};
