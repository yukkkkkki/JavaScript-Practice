// 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。

// 示例 1：
// 输入：head = [1,2,3,4,5], left = 2, right = 4
// 输出：[1,4,3,2,5]

// 示例 2：
// 输入：head = [5], left = 1, right = 1
// 输出：[5]

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */

// 方法一：穿针引线
// 先找到left之前的pre节点，再找到right之后的succ节点
// 截取left和right节点 并切断原链表的链接
// 反转截取链表
// 将反转后链表连接回原链表
var reverseBetween = function (head, left, right) {
  const dummyNode = new ListNode(-1);
  dummyNode.next = head;
  let pre = dummyNode;

  // pre走left - 1步 走到left之前
  for (let i = 0; i < left - 1; i++) {
    pre = pre.next;
  }

  // 走right - left + 1步 走到right节点
  let rightNode = pre;
  for (let i = 0; i < right - left + 1; i++) {
    rightNode = rightNode.next;
  }

  // 切断一个子链表（截取链表）
  let leftNode = pre.next;
  let succ = rightNode.next;
  // 切断链接
  pre.next = null;
  rightNode.next = null;

  // 反转截取下来的链表
  reverseLinkedList(leftNode);

  // 链接回原来的链表
  pre.next = rightNode;
  leftNode.next = succ;
  return dummyNode.next;
};

const reverseLinkedList = (head) => {
  let prev = null;
  let curr = head;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
};
// 时间复杂度：o(n)
// 空间复杂度：o(1)

// 方法二：一次遍历 [穿针引线] 反转链表头插法
// prev：永远指向待反转区域的第一个节点left的前一个节点
// curr：指向待反转区域的第一个节点left
// next：永远指向curr 的下一个节点，循环中会发生变化
var reverseBetween = function (head, left, right) {
  const dummyNode = new ListNode(-1);
  dummyNode.next = head;
  // 先走 left-1 步 找到left节点之前的 pre
  let prev = dummyNode;
  for (let i = 0; i < left - 1; i++) {
    prev = pre.next;
  }

  let curr = pre.next;
  // 处理反转链表部分
  for (let i = 0; i < right - left; i++) {
    const next = cur.next;
    curr.next = next.next;
    next.next = prev.next;
    prev.next = next;
  }
  return dummyNode.next;
};
