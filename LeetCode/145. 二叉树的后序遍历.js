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
  const res = [];

  const dfs = (root) => {
    if (root) {
      dfs(root.left);
      dfs(root.right);
      res.push(root.val);
    }
  };

  dfs(root);
  return res;
};

// 方法二：非递归
// 每次先入左节点, 然后入右节点
// 每次把值都插到数组的最前面
// 即：先进左节点再进右节点 + 结果倒序
var postorderTraversal = function (root) {
  if (!root) return [];

  const res = [];
  const helper = [root];

  while (stack.length) {
    let node = helper.pop();
    res.unshift(node.val); // 先进先出

    // 先进栈左子树，后进栈右子树，出栈顺序为向右后左
    // 先右子树头插入res，后左子树头插入res
    node.left && helper.push(node.left);
    node.right && helper.push(node.right);
  }
  return res;
};
