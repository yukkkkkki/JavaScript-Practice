// 给定二叉搜索树的根结点 root，返回 L 和 R（含）之间的所有结点的值的和。

// 二叉搜索树保证具有唯一的值。

// 示例 1：
// 输入：root = [10,5,15,3,7,null,18], L = 7, R = 15
// 输出：32

// 示例 2：
// 输入：root = [10,5,15,3,7,13,18,1,null,6], L = 6, R = 10
// 输出：23

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} L
 * @param {number} R
 * @return {number}
 */

// 方法一：深度优先搜索DFS
// 思路：
// 对于当前节点 node，若：
// 1. node.val < L，则搜索器右子树；
// 2. node.val >= L，搜索器左子树
// 3. node.val 在区间[L, R]之间，则搜索其所有子树
var rangeSumBST = function (root, L, R) {
  let res = 0;

  const dfs = (node, L, R) => {
    if (node !== null) {
      if (L <= node.val && node.val <= R) {
        res += node.val;
      }
      if (L < node.val) dfs(node.left, L, R);
      if (R > node.val) dfs(node.right, L, R);
    }
  };

  dfs(root, L, R);
  return res;
};

// 方法二：迭代实现深度优先搜索
var rangeSumBST = function (root, L, R) {
  let res = 0;
  let stack = [root];
  while (stack.length) {
    let node = stack.pop();
    if (node !== null) {
      if (L <= node.val && node.val <= R) {
        res += node.val;
      }
      if (L < node.val) stack.push(node.left);
      if (node.val < R) stack.push(node.right);
    }
  }
  return res;
};
