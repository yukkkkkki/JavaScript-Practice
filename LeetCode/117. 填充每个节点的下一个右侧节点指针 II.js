// 给定一个二叉树

// struct Node {
//   int val;
//   Node *left;
//   Node *right;
//   Node *next;
// }
// 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

// 初始状态下，所有 next 指针都被设置为 NULL。

// 进阶：
// 你只能使用常量级额外空间。
// 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。

// 示例：
// 输入：root = [1,2,3,4,5,null,7]
// 输出：[1,#,2,3,#,4,5,7,#]
// 解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。

/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
// 方法一：BFS层次遍历(基于广度优先搜索)
var connect = function (root) {
  if (!root) return null;
  let queue = [root];
  while (queue.length) {
    let len = queue.length;
    let pre = null;
    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
      if (pre) pre.next = node;
      pre = node;
    }
  }
  return root;
};
// 时间复杂度：O(N) 空间复杂度：O(N)
