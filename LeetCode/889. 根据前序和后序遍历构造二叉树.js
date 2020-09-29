// 返回与给定的前序和后序遍历匹配的任何二叉树。

// pre 和 post 遍历中的值是不同的正整数。

// 示例：
// 输入：pre = [1,2,4,5,3,6,7], post = [4,5,2,6,7,3,1]
// 输出：[1,2,3,4,5,6,7]

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} pre
 * @param {number[]} post
 * @return {TreeNode}
 */

//  方法一：递归
var constructFromPrePost = function (pre, post) {
  const n = pre.length;
  if (n == 0) return null;
  let root = new TreeNode(pre[0]);
  if (n == 1) return root;
  let l = post.indexOf(pre[1]) + 1;
  root.left = constructFromPrePost(pre.slice(1, l + 1), post.slice(0, l));
  root.right = constructFromPrePost(pre.slice(l + 1), post.slice(l, n - 1));
  return root;
};
// 时间复杂度：O(N^2); 空间复杂度：O(N^2)
