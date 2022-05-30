/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 方法一：DFS
// 后序遍历的访问顺序为：左子树——右子树——根节点。我们对根节点 root 进行后序遍历：
// 如果节点是叶子节点，返回它对应的数字 val
// 如果节点是非叶子节点，返回它的左子树和右子树对应的结果之和
var sumRootToLeaf = function (root) {
  const dfs = (root, val) => {
    if (!root) return 0;

    val = (val << 1) | root.val;
    if (!root.left && !root.right) return val;

    return dfs(root.left, val) + dfs(root.right, val);
  };
  return dfs(root, 0);
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法二：BFS
var sumRootToLeaf = function (root) {
  const stack = [];
  let val = 0;
  let result = 0;
  let prev = null; // 记录先前访问的节点

  while (root || stack.length) {
    // root 非空，则不断左子节点入栈
    while (root) {
      val = (val << 1) | root.val;
      stack.push(root);
      root = root.left;
    }

    // 从栈中获取节点
    root = stack[stack.length - 1];
    if (!root.right || root.right === prev) {
      // 说明该节点的左子树及右子树都已经被访问，则令其出栈
      // 若该节点是叶子节点，将它对应的数字 val 加入结果中
      if (!root.left && !root.right) result += val;
      val >>= 1;
      stack.pop();
      prev = root;
      root = null;
    } else {
      root = root.right;
    }
  }
  return result;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
