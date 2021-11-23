/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
// 方法一：模拟
// 维护两个链表 small 和 large 即可
// small 链表按顺序存储所有小于 x 的节点，large 链表按顺序存储所有大于等于 x 的节点
// 遍历完原链表后，我们只要将 small 链表尾节点指向 large 链表的头节点即能完成对链表的分隔
var partition = function (head, x) {
  let small = new ListNode(0);
  const smallHead = small;

  let large = new ListNode(0);
  const largeHead = large;

  while (head) {
    if (head.val < x) {
      small.next = head;
      small = small.next;
    } else {
      large.next = head;
      large = large.next;
    }
    head = head.next;
  }

  large.next = null;
  small.next = largeHead.next;
  return smallHead.next;
};
