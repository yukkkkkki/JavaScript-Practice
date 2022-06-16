/**
 * @param {number[]} postorder
 * @return {boolean}
 */
// 方法一：递归分治
// 最后一个元素是根节点，左子树都小于根节点，剩下的元素就是右子树
// 再分别递归检查左右子树是否满足后序遍历顺序
var verifyPostorder = function (postorder) {
  const n = postorder.length;
  if (n < 2) return true;

  // 后序遍历的最后一个元素为根节点
  let root = postorder[n - 1];
  // 找右子树的开始节点
  let idx = postorder.findIndex((item) => item > root);
  let left = postorder.slice(0, idx); //左子树
  let right = postorder.slice(idx, -1); //右子树

  return (
    verifyPostorder(left) &&
    verifyPostorder(right) &&
    left.every((item) => item < root) &&
    right.every((item) => item > root)
  );
};
