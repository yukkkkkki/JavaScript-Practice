// 给定一个二叉树，返回它的 后序 遍历。

// 示例:
// 输入: [1,null,2,3]
//    1
//     \
//      2
//     /
//    3
// 输出: [3,2,1]

// 方法一：递归
var postorderTraversal = function (root) {
  let res = [];
  const help = (root) => {
    if (root) {
      help(root.left);
      help(root.right);
      res.push(root.val);
    }
  };
  help(root);
  return res;
};

// 方法二：非递归(用栈来做)
// 每次先入左节点, 然后入右节点
// 每次把值都插到数组的最前面
// 即：先进左节点再进右节点 + 结果倒序
var postorderTraversal = function (root) {
  let stack = [],
    res = [];
  while (stack.length || root) {
    res.unshift(root.val);
    if (root.left) stack.push(root.left);
    if (root.right) stack.push(root.right);
    root = stack.pop();
  }
  return res;
};
