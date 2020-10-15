// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

// 示例 1：
// 输入：head = [1,2,3,4]
// 输出：[2,1,4,3]

// 示例 2：
// 输入：head = []
// 输出：[]

// 示例 3：
// 输入：head = [1]
// 输出：[1]

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
// 方法一：递归
var swapPairs = function (head) {
  if (!head || !head.next) return head;
  const newHead = head.next;
  head.next = swapPairs(newHead.next);
  newHead.next = head; // 表示将其余节点进行两两交换，交换后的新的头节点为 head 的下一个节点
  return newHead;
};
// 时间复杂度：O(n); 空间复杂度：O(n)

// 方法二：迭代
// 思路：
// 设置虚拟头结点 dummy，使得dummy.next始终指向第一个结点
// 开启while循环,三步完成一对结点的交换
//     head.next = next.next;
//     next.next = head;
//     pre.next = next;
// 指针更新,在下一轮迭代中,完成下一对结点的交换
//     pre = head;
//     head = head.next;
var swapPairs = function (head) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let pre = dummy;
  while (head && head.next) {
    const next = head.next;
    head.next = next.next;
    next.next = head;
    pre.next = next;
    // 指针更新
    pre = head;
    head = head.next;
  }
  return dummy.next;
};
// 时间复杂度：O(n); 空间复杂度：O(1)
