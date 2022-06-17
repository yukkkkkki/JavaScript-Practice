/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {TreeNode} tree
 * @return {ListNode[]}
 */
// 方法一：广度优先搜搜 BFS
var listOfDepth = function (tree) {
  if (!tree) return [];
  const result = [];
  const queue = [tree];

  while (queue.length) {
    let size = queue.length;
    const head = new ListNode(0);
    let cur = head;

    while (size) {
      const node = queue.shift();
      cur.next = new ListNode(node.val);
      cur = cur.next;

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);

      size--;
    }
    result.push(head.next);
  }

  return result;
};
