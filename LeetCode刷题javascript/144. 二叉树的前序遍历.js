// 给定一个二叉树，返回它的 前序 遍历。

//  示例:

// 输入: [1,null,2,3]
//    1
//     \
//      2
//     /
//    3

// 输出: [1,2,3]

// 方法一：递归
var preorderTraversal = function (root) {
  let res = [];
  help(res, root);
  return res;
};

var help = function (res, root) {
  if (root) {
    res.push(root.val);
    help(res, root.left);
    help(res, root.right);
  }
};

// 方法二：非递归
// 用栈做，右子树先入栈，然后左子树入栈
var preorderTraversal = function (root) {
  if (!root) return [];

  let stack = [root], // 根节点不为空时，根节点入栈
    res = [],
    node = null;

  while (stack.length) {
    node = stack.pop();
    res.push(node.val);

    // 先打印左子树，然后右子树
    // 所以先入栈的是右子树，然后左子树
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return res;
};

// 方法二：栈方法2
var preorderTraversal = function (root) {
  const list = [];
  const stack = [];
  let node = root;
  while (node !== null || stack.length) {
    while (node !== null) {
      list.push(node.val);
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    node = node.right;
  }
  return list;
};
