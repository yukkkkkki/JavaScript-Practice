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
 * @return {TreeNode}
 */
// 方法一：中序遍历后生成新的树
var increasingBST = function (root) {
  const res = [];
  inorder(root, res);

  const dummyNode = new TreeNode(-1);
  let curr = dummyNode;
  for (const value of res) {
    curr.right = new TreeNode(value);
    curr = curr.right;
  }

  return dummyNode.right;
};

const inorder = (node, res) => {
  if (!node) return;

  inorder(node.left, res);
  res.push(node.val);
  inorder(node.right, res);
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法二：中序遍历的过程中改变节点指向
var increasingBST = function (root) {
  const dummyNode = new TreeNode(-1);
  let resNode = dummyNode;

  const inorder = (node) => {
    if (!node) return;
    inorder(node.left);

    resNode.right = node;
    node.left = null;
    resNode = node;

    inorder(node.right);
  };

  inorder(root);
  return dummyNode.right;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
