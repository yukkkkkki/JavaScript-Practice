/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
// 方法一：中序遍历 递归
// 搜索二叉树的中序遍历是有序的
var kthLargest = function (root, k) {
  let arr = [];

  function dfs(node) {
    if (!node) return;

    dfs(node.left);
    arr.push(node.val);
    dfs(node.right);
  }

  dfs(root);
  return arr[arr.length - k];
};

// 方法二：迭代
var kthLargest = function (root, k) {
  let res = [];
  const stack = [];

  while (root || stack.length) {
    // 左子节点们入栈
    while (root) {
      stack.push(root);
      root = root.left;
    }

    root = stack.pop();
    res.push(root.val);
    root = root.right;
  }

  return res[res.length - k];
};
