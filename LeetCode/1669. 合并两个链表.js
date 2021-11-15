/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {number} a
 * @param {number} b
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeInBetween = function (list1, a, b, list2) {
  let cur = list1;

  // 遍历到 a 前一个节点
  for (let i = 0; i < a - 1; i++) {
    cur = cur.next;
  }

  // 找到 b 前面的节点
  let node = cur.next;
  for (let i = 0; i < b + 1 - a; i++) {
    node = node.next;
  }

  // 插入 list2
  cur.next = list2;
  while (cur.next) {
    cur = cur.next;
  }

  // list2.next指向node
  cur.next = node;
  return list1;
};
