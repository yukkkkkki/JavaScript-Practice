/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
// 方法一：递归 DFS
var mirrorTree = function (root) {
  if (!root) return null;

  // 交换当前节点的左右节点
  const leftCopy = root.left;
  root.left = root.right;
  root.right = leftCopy;

  // 递归处理左右子节点
  mirrorTree(root.left);
  mirrorTree(root.right);

  return root;
};

// 方法二：中序遍历
var mirrorTree = function (root) {
  if (!root) return null;

  let cur;
  let stack = [root];

  while (stack.length) {
    cur = stack.pop();

    // 交换左右子节点
    let temp = cur.left;
    cur.left = cur.right;
    cur.right = temp;

    cur.right && stack.push(cur.right);
    cur.left && stack.push(cur.left);
  }

  return root;
};
