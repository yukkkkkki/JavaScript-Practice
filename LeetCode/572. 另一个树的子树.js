// 给定两个非空二叉树 s 和 t，检验 s 中是否包含和 t 具有相同结构和节点值的子树。s 的一个子树包括 s 的一个节点和这个节点的所有子孙。s 也可以看做它自身的一棵子树。

// 示例 1:
// 给定的树 s:

//      3
//     / \
//    4   5
//   / \
//  1   2

// 给定的树 t：

//    4
//   / \
//  1   2

// 返回 true，因为 t 与 s 的一个子树拥有相同的结构和节点值。
// 递归
var isSubtree = function (s, t) {
  if (!s) return false;
  if (s.val === t.val) {
    if (compare(s, t)) {
      return true;
    }
  }
  return isSubtree(s.left, t) || isSubtree(s.right, t);
};

var compare = function (s, t) {
  if (!s && !t) return true;
  if (!s || !t || s.val !== t.val) {
    return false;
  }
  return compare(s.left, t.left) && compare(s.right, t.right);
};

// 方法二
// var isSubtree = (s, t) => (JSON.stringify(s).indexOf(JSON.stringify(t)))>-1?true:false
