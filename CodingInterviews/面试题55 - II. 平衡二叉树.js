// 面试题55 - II. 平衡二叉树

// 输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。

// 示例 1:
// 给定二叉树 [3,9,20,null,null,15,7]
//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回 true 。

// 示例 2:
// 给定二叉树 [1,2,2,3,3,null,null,4,4]
//        1
//       / \
//      2   2
//     / \
//    3   3
//   / \
//  4   4
// 返回 false 。

// 方法一
// 后续遍历。从最底下进行查找
// 判断只要一次左右树相差为 -1；一直向上返回-1
// 判断的函数是，判断左右节点相减取绝对值，为0或者1都行，返回左右最深节点+1，向上返回
// 作者：ning-meng-jia-cu-5
// 链接：https://leetcode-cn.com/problems/ping-heng-er-cha-shu-lcof/solution/hou-xu-bian-li-by-ning-meng-jia-cu-5/

var isBalanced = function (root) {
  var dps = function (node) {
    if (!node) return 0;

    let left = dps(node.left);
    let right = dps(node.right);

    if (left == -1 || right == -1) {
      return -1;
    }

    if (Math.abs(left - right) <= 1) {
      return Math.max(left, right) + 1;
    } else {
      return -1;
    }
  };

  return dps(root) > -1;
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
