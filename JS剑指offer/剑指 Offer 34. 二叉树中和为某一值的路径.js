// 输入一棵二叉树和一个整数，打印出二叉树中节点值的和为输入整数的所有路径。从树的根节点开始往下一直到叶节点所经过的节点形成一条路径。

// 示例:
// 给定如下二叉树，以及目标和 sum = 22，

//               5
//              / \
//             4   8
//            /   / \
//           11  13  4
//          /  \    / \
//         7    2  5   1

// 返回:

// [
//    [5,4,11,2],
//    [5,8,4,5]
// ]

// 方法一：先序遍历 + 回溯
// 思路：
// 每次来到新节点，将节点放入当前保存的路径
// 检查节点是否是叶节点：
//    是：将路径放入结果中
//    不是：继续遍历左子树和右子树
// 上面整个过程就是一个前序遍历，但在遍历的过程中，动态地维护了当前路径与总和的信息。
// 在实现过程中需要注意的是，JavaScript 中传入数组做参数，函数内拿到的是数组的引用，不是深拷贝。
// 作者：xin-tan
// 链接：https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/solution/shuang-jie-fa-hui-su-fa-fei-di-gui-xie-fa-tuo-zhan/
var pathSum = function (root, sum) {
  if (!root) return [];
  const paths = [];
  help(root, sum, paths, []);
  return paths;
};

function help(root, sum, paths, path) {
  if (!root) return;

  path = [...path, root.val]; // 深拷贝
  if (!root.left && !root.right && root.val === sum) {
    paths.push(path);
    return;
  }

  help(root.left, sum - root.val, paths, path);
  help(root.right, sum - root.val, paths, path);
}

// 方法二：非递归遍历
// 整体的处理流程是：
//   取出栈顶的元祖：节点、剩余路径和、路径
//   如果当前节点是叶节点，且剩余路径和等于节点的 val，那么将路径放入结果中
//   如果右节点不为空，将（右节点，剩余路径和 - 右节点值，路径+右节点）放入栈中
//   如果做节点不为空，处理过程和右节点一样
var pathSum = function (root, sum) {
  if (!root) return [];

  const stack = [[root, sum, [root.val]]];
  const res = [];

  while (stack.length) {
    const [node, sum, path] = stack.pop();
    if (!node.left && !node.right && node.val === sum) {
      res.push(path);
    }

    if (node.right) {
      stack.push([node.right, sum - node.val, [...path, node.right.val]]);
    }

    if (node.left) {
      stack.push([node.left, sum - node.val, [...path, node.left.val]]);
    }
  }
  return res;
};
