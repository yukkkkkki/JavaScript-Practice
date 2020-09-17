// 226. 翻转二叉树

// 翻转一棵二叉树。

// 示例：

// 输入：
//      4
//    /   \
//   2     7
//  / \   / \
// 1   3 6   9

// 输出：
//      4
//    /   \
//   7     2
//  / \   / \
// 9   6 3   1

// 方法一：递归
var invertTree = function (root) {
  if (!root) return null;

  let temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);

  return root;
};

// 方法二：层序遍历 + 左右交换
var invertTree = function (root) {
  if (!root) return null;
  let queue = [root];

  while (queue.length) {
    let node = queue.pop();

    let temp = node.left;
    node.left = node.right;
    node.right = temp;

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return root;
};
