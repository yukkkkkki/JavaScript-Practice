// 检查子树。你有两棵非常大的二叉树：T1，有几万个节点；T2，有几万个节点。设计一个算法，判断 T2 是否为 T1 的子树。

// 如果 T1 有这么一个节点 n，其子树与 T2 一模一样，则 T2 为 T1 的子树，也就是说，从节点 n 处把树砍断，得到的树与 T2 完全相同。

// 示例1:
//  输入：t1 = [1, 2, 3], t2 = [2]
//  输出：true

// 示例2:
//  输入：t1 = [1, null, 2, 4], t2 = [3, 2]
//  输出：false
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {boolean}
 */
var checkSubTree = function (t1, t2) {
  return check(t1, t2, false);
};

function check(t1, t2, b1) {
  if (t1 == null && t2 == null) return true;
  if (t1 == null || t2 == null) return false;
  if (t1.val == t2.val) {
    b1 = true;
    return check(t1.left, t2.left, b1) && checkSubTree(t1.right, t2.right, b1);
  } else if (b1) {
    return false;
  } else {
    return check(t1.left, t2) || check(t1.right, t2);
  }
}
