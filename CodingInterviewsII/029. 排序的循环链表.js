/**
 * // Definition for a Node.
 * function Node(val, next) {
 *     this.val = val;
 *     this.next = next;
 * };
 */

/**
 * @param {Node} head
 * @param {number} insertVal
 * @return {Node}
 */
// 方法一：一次遍历
var insert = function (head, insertVal) {
  const node = new Node(insertVal);
  // 如果循环链表为空，则插入一个新节点并将新节点的 next 指针指向自身
  if (!head) {
    node.next = node;
    return node;
  }

  if (head.next === head) {
    // 说明循环链表中只有一个节点，在头节点之后插入新节点
    head.next = node;
    node.next = head;
    // 此时循环链表中有两个节点且一定是有序的，返回头节点
    return head;
  }

  let curr = head;
  let next = head.next;
  while (next !== head) {
    // 判断值为 insertVal 的新节点是否可以在 curr 和 next 之间插入
    if (insertVal >= curr.val && insertVal <= next.val) {
      break;
    }

    if (curr.val > next.val) {
      if (insertVal > curr.val || insertVal < next.val) {
        // 此时 curr 和 next 分别是循环链表中的值最大的节点和值最小的节点
        // insertVal 大于 curr.val，小于 next.val
        // 因此新节点应该在 next 的前面插入
        break;
      }
    }

    // 将 curr 和 next 同时向后移动，直到找到插入新节点的位置或者遍历完循环链表中的所有节点
    curr = curr.next;
    next = next.next;
  }

  curr.next = node;
  node.next = next;
  return head;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
