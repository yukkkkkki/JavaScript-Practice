// 输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历结果。如果是则返回 true，否则返回 false。假设输入的数组的任意两个数字都互不相同。

// 参考以下这颗二叉搜索树：

//      5
//     / \
//    2   6
//   / \
//  1   3

// 示例 1：
// 输入: [1,6,3,2,5]
// 输出: false

// 示例 2：
// 输入: [1,3,2,6,5]
// 输出: true

// 方法一：递归
// 思路：
// 最后一个元素是根节点
// 左子树都小于根节点
// 剩下的元素就是右子树
// 再分别递归检查左右子树是否满足后序遍历顺序
var verifyPostorder = function (postorder) {
  const n = postorder.length;
  if (n < 2) return true;
  let root = postorder[n - 1]; // 后序遍历的最后一个元素为根节点

  let index = postorder.findIndex((item) => item > root); //找到右子树的开始节点
  let left = postorder.slice(0, index); //左子树
  let right = postorder.slice(index, -1); //右子树

  return (
    verifyPostorder(left) &&
    verifyPostorder(right) &&
    left.every((item) => item < root) &&
    right.every((item) => item > root)
  );
};

// 方法二
var verifyPostorder = function (postorder) {
  if (!postorder.length) return true;

  // 后序遍历的最后一个元素为根节点
  let root = postorder.pop();
  let i = postorder.length;

  while (postorder[i - 1] > root) i--;
  const left = postorder.slice(0, i);

  if (left.some((i) => i > root)) return false;

  return verifyPostorder(left) && verifyPostorder(postorder.slice(i));
};
