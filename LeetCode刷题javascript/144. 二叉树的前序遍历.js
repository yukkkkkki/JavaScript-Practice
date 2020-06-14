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
}

// 方法二：非递归
var preorderTraversal = function (root) {
  if (!root) return [];

  let stack = [],
    res = [],
    node = null;
  stack.push(root); // 根节点不为空时，根节点入栈

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