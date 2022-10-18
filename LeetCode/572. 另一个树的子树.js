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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
// 返回 true，因为 t 与 s 的一个子树拥有相同的结构和节点值。
// 递归
var isSubtree = function (s, t) {
  if (!s) return false;
  if (s.val === t.val) {
    if (compare(s, t)) return true;
  }
  return isSubtree(s.left, t) || isSubtree(s.right, t);
};

var compare = function (s, t) {
  if (!s && !t) return true;
  if (!s || !t || s.val !== t.val) return false;

  return compare(s.left, t.left) && compare(s.right, t.right);
};

// 方法二
// var isSubtree = (s, t) => (JSON.stringify(s).indexOf(JSON.stringify(t)))>-1?true:false
