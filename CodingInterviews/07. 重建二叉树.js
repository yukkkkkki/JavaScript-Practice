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

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
// 方法一：递归
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) return null;

  // 前序遍历的第一个元素为根节点
  const rootVal = preorder[0];
  const node = new TreeNode(rootVal);

  // i 有两个含义：
  // 根节点在中序遍历结果中的下标 & 当前左子树的节点个数
  let i = 0;
  for (; i < inorder.length; ++i) {
    if (inorder[i] === rootVal) break;
  }

  // 递归处理左右子树
  node.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));
  node.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));
  return node;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法二：迭代
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) return null;

  const root = new TreeNode(preorder[0]);
  const stack = [root];

  let inorderIdx = 0;
  for (let i = 1; i < preorder.length; i++) {
    let preorderVal = preorder[i];
    let node = stack[stack.length - 1];

    if (node.val !== inorder[inorderIdx]) {
      // 用前序数组一直构建左子树
      node.left = new TreeNode(preorderVal);
      stack.push(node.left);
    } else {
      // 碰到了 inorder[inorderIndex]，表示到了左下角
      // 需要往上走并处理右子树;
      while (
        stack.length &&
        stack[stack.length - 1].val === inorder[inorderIdx]
      ) {
        node = stack.pop();
        inorderIdx++;
      }
      node.right = new TreeNode(preorderVal);
      stack.push(node.right);
    }
  }
  return root;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
