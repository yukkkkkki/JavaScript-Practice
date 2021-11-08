// 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。

// 示例 1：
// 输入：head = [1,2,3,4,5], k = 2
// 输出：[4,5,1,2,3]

// 示例 2：
// 输入：head = [0,1,2], k = 4
// 输出：[2,0,1]

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
// 方法一：闭合为环
// 先找到链表的tail，将链表连成环
// 然后找到从head开始第 k 个节点，并在此位置断开
var rotateRight = function (head, k) {
  if (k === 0 || !head || !head.next) {
    return head;
  }

  let n = 1;
  let cur = head;
  while (cur.next) {
    cur = cur.next;
    n++;
  }

  // 若k和链表长度一样，不用进行旋转操作了
  let add = n - (k % n);
  if (add === n) return head;

  // 连成环
  cur.next = head;
  // 找要断开的节点
  while (add) {
    cur = cur.next;
    add--;
  }
  // 断开节点
  const result = cur.next;
  cur.next = null;
  return result;
};
// 时间复杂度：o(n)；空间复杂度：o(1)
