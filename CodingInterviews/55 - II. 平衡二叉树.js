/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 方法一：DFS
// 从最底下进行查找
// 判断只要一次左右树相差为 -1；一直向上返回-1
// 判断的函数是，判断左右节点相减取绝对值，为 0 或者1都行，返回左右最深节点+1，向上返回
// 参考：https://leetcode-cn.com/problems/ping-heng-er-cha-shu-lcof/solution/hou-xu-bian-li-by-ning-meng-jia-cu-5/
var isBalanced = function (root) {
  var dfs = function (node) {
    if (!node) return 0;

    let left = dfs(node.left);
    let right = dfs(node.right);

    if (left == -1 || right == -1) return -1;

    if (Math.abs(left - right) <= 1) {
      return Math.max(left, right) + 1;
    } else {
      return -1;
    }
  };

  return dfs(root) > -1;
};

// 方法二
var isBalanced = function (root) {
  if (!root) return true;
  let leftHeight = getHeightNode(root.left);
  let rightHeight = getHeightNode(root.right);
  if (Math.abs(leftHeight - rightHeight) > 1) {
    return false;
  }
  return isBalanced(root.left) && isBalanced(root.right);
};

function getHeightNode(node) {
  if (!node) return 0;
  return Math.max(getHeightNode(node.left) + 1, getHeightNode(node.right) + 1);
}
