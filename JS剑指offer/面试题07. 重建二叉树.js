// 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

// 例如，给出
// 前序遍历 preorder = [3,9,20,15,7]
// 中序遍历 inorder = [9,3,15,20,7]

// 返回如下的二叉树：
//     3
//    / \
//   9  20
//     /  \
//    15   7

// 递归
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) return null;

  // 前序遍历的第一个元素为根节点
  const rootVal = preorder[0];
  const node = new TreeNode(rootVal);

  let i = 0;
  // i有两个含义，一个是根节点在中序遍历结果中的下标，
  // 另一个是当前左子树的节点个数
  for (; i < inorder.length; ++i) {
    if (inorder[i] === rootVal) {
      break;
    }
  }
  // 递归处理左右子树
  node.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));
  node.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));
  return node;
};
