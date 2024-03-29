/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 方法一：递归
// 二叉搜索树性质：
// 如果该二叉树的左子树不为空，则左子树上所有节点的值均小于它的根节点的值；
// 若它的右子树不空，则右子树上所有节点的值均大于它的根节点的值；它的左右子树也为二叉搜索树
// 我们设计一个递归函数 helper(root, lower, upper) 来递归判断，函数表示考虑以 root 为根的子树，判断子树中所有节点的值是否都在 (l,r)(l,r)(l,r) 的范围内（注意是开区间）。如果 root 节点的值 val 不在 (l,r)(l,r)(l,r) 的范围内说明不满足条件直接返回，否则我们要继续递归调用检查它的左右子树是否满足，如果都满足才说明这是一棵二叉搜索树
// 递归调用左子树时，我们需要把上界 upper 改为 root.val，即调用 helper(root.left, lower, root.val)，因为左子树里所有节点的值均小于它的根节点的值。同理递归调用右子树时，我们需要把下界 lower 改为 root.val，即调用 helper(root.right, root.val, upper)
var isValidBST = function (root) {
  return helper(root, -Infinity, Infinity);
};

function helper(root, lower, upper) {
  if (root === null) return true;
  if (root.val <= lower || root.val >= upper) {
    return false;
  }
  return (
    helper(root.left, lower, root.val) && helper(root.right, root.val, upper)
  );
}
// 时间复杂度 : O(n); 空间复杂度 : O(n)

// 方法二：中序遍历
var isValidBST = function (root) {
  let stack = [];
  let inorder = -Infinity;

  while (stack.length || root !== null) {
    while (root !== null) {
      stack.push(root);
      root = root.left;
    }

    root = stack.pop();
    // 如果中序遍历得到的节点的值小于等于前一个 inorder，说明不是二叉搜索树
    if (root.val <= inorder) return false;
    inorder = root.val;
    root = root.right;
  }
  return true;
};
// 时间复杂度 : O(n); 空间复杂度 : O(n)
