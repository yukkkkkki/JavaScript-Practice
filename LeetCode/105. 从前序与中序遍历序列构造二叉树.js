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
  const node = new TreeNode(preorder[0]);

  let i = 0;
  for (; i < inorder.length; i++) {
    if (inorder[i] === node.val) {
      break;
    }
  }
  node.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));
  node.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));
  return node;
};
// 时间复杂度：o(n)
// 空间复杂度：o(n)

// 方法二：迭代
// 1、用一个栈和一个指针辅助进行二叉树的构造。初始时栈中存放了根节点（前序遍历的第一个节点），指针指向中序遍历的第一个节点；

// 2、依次枚举前序遍历中除了第一个节点以外的每个节点。
// 如果 index 恰好指向栈顶节点，那么我们不断地弹出栈顶节点并向右移动 index，并将当前节点作为最后一个弹出的节点的右儿子；
// 如果 index 和栈顶节点不同，我们将当前节点作为栈顶节点的左儿子；

// 3、无论是哪一种情况，我们最后都将当前的节点入栈。
// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/solution/cong-qian-xu-yu-zhong-xu-bian-li-xu-lie-gou-zao-9/

var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) {
    return null;
  }

  let root = new TreeNode(preorder[0]);
  let stack = [root];
  let inorderIndex = 0;

  for (let i = 1; i < preorder.length; i++) {
    let currPreVal = preorder[i];
    let node = stack[stack.length - 1];
    if (node.val !== inorder[inorderIndex]) {
      node.left = new TreeNode(currPreVal);
      stack.push(node.left);
    } else {
      while (
        stack.length &&
        stack[stack.length - 1].val == inorder[inorderIndex]
      ) {
        node = stack.pop();
        inorderIndex++;
      }
      node.right = new TreeNode(currPreVal);
      stack.push(node.right);
    }
  }
  return root;
};
// 时间复杂度：o(n)
// 空间复杂度：o(n)
