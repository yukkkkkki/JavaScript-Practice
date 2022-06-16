/**
 * // Definition for a Node.
 * function Node(val,left,right) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
// 中序遍历
// 方法一：广度优先搜索 BFS
var treeToDoublyList = function (root) {
  if (!root) return root;

  const stack = [];
  let node = root;
  let pre = null;
  let head = null;

  while (stack.length || node) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      const top = stack.pop();
      if (!pre) head = top;
      else pre.right = top;

      top.left = pre;
      pre = top;

      node = top.right;
    }
  }

  head.left = pre;
  pre.right = head;
  return head;
};

// 方法二：递归
/**
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyList = function (root) {
  if (!root) return;

  let head = null;
  let pre = head;
  /**
   * @param {Node} node
   */
  const inorder = (node) => {
    if (!node) return;
    // 遍历左子树
    inorder(node.left, pre);

    // 处理当前节点
    if (!pre) {
      // 遍历到最左边节点，此时节点就是双向链表的head
      head = node;
    } else {
      pre.right = node;
    }
    node.left = pre;
    pre = node;

    // 遍历右子树
    inorder(node.right, pre);
  };

  inorder(root);
  // 完成中序遍历后，pre指向了最后一个节点
  // 将其闭合成环状结构
  head.left = pre;
  pre.right = head;
  return head;
};
