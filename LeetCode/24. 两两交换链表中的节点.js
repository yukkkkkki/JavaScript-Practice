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
  // 表示将其余节点进行两两交换，交换后的新的头节点为 head 的下一个节点
  newHead.next = head;
  return newHead;
};
// 时间复杂度：O(n); 空间复杂度：O(n)

// 方法二：迭代
// 思路：
// 设置虚拟头结点 dummy，使得dummy.next = head
// 令 prev 表示当前到达的节点，初始时 prev = dummyHead, 每次需要交换 prev 后面的两个节点
// 若 prev 后无节点，则没有更多的节点需要交换，因此结束交换
// 否则 获得 prev 后的 node1 和 node2 更新指针关系两两交换节点
// prev.next = node2;
// node1.next = node2.next;
// node2.next = node1
var swapPairs = function (head) {
  const dummy = new ListNode(-1);
  dummy.next = head;
  let prev = dummy;

  while (head && head.next) {
    const next = head.next;
    head.next = next.next;
    next.next = head;
    prev.next = next;

    // 指针更新
    prev = head;
    head = head.next;
  }

  return dummy.next;
};
// 时间复杂度：O(n); 空间复杂度：O(1)
