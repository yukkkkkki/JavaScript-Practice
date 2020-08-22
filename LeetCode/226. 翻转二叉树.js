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

// 方法二：中序遍历 + 左右交换
var invertTree = function (root) {
  if (!root) return null;
  let cur;
  let stack = [root];
  while (stack.length) {
    cur = stack.pop();
    // 左右交换
    let temp = root.left;
    root.left = root.right;
    cur.right = temp;

    // 栈依次存入右、左节点
    cur.right && stack.push(cur.right);
    cur.left && stack.push(cur.left);
  }
  return root;
};
