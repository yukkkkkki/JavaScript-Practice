// 给定两个用链表表示的整数，每个节点包含一个数位。

// 这些数位是反向存放的，也就是个位排在链表首部。

// 编写函数对这两个整数求和，并用链表形式返回结果。

// 示例：
// 输入：(7 -> 1 -> 6) + (5 -> 9 -> 2)，即617 + 295
// 输出：2 -> 1 -> 9，即912
// 进阶：思考一下，假设这些数位是正向存放的，又该如何解决呢?

// 示例：
// 输入：(6 -> 1 -> 7) + (2 -> 9 -> 5)，即617 + 295
// 输出：9 -> 1 -> 2，即912

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let carry = 0;
  let root = new ListNode(0);
  let p = root;
  while (true) {
    let val = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
    // 进位
    carry = Math.floor(val / 10);
    val = val % 10; // 节点值
    // 新节点赋值
    p.next = new ListNode(val);
    p = p.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
    if (!l1 && !l2 && !carry) break;
  }
  return root.next;
};
