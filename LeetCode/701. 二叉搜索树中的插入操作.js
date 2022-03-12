// 给定二叉搜索树（BST）的根节点和要插入树中的值，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。 输入数据保证，新值和原始二叉搜索树中的任意节点值都不同。

// 注意，可能存在多种有效的插入方式，只要树在插入后仍保持为二叉搜索树即可。 你可以返回任意有效的结果。

// 例如,
// 给定二叉搜索树:
//         4
//        / \
//       2   7
//      / \
//     1   3
// 和 插入的值: 5
// 你可以返回这个二叉搜索树:
//          4
//        /   \
//       2     7
//      / \   /
//     1   3 5
// 或者这个树也是有效的:
//          5
//        /   \
//       2     7
//      / \
//     1   3
//          \
//           4

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
 * @param {number} val
 * @return {TreeNode}
 */

// 思路：将 val 插入到以 root 为根的子树上时，根据 val 与 root.val 的大小关系，确定将 val 插入到哪个子树中
// 如果该子树不为空，则问题转化成了将 val 插入到对应子树上。
// 否则，在此处新建一个以 val 为值的节点，并链接到其父节点 root 上
var insertIntoBST = function (root, val) {
  if (!root) return new TreeNode(val);
  let node = root;
  while (node) {
    if (val < node.val) {
      if (!node.left) {
        node.left = new TreeNode(val);
        break;
      } else {
        node = node.left;
      }
    } else {
      if (!node.right) {
        node.right = new TreeNode(val);
        break;
      } else {
        node = node.right;
      }
    }
  }
  return root;
};
