// 设计一个算法，找出二叉搜索树中指定节点的“下一个”节点（也即中序后继）。

// 如果指定节点没有对应的“下一个”节点，则返回null。

// 示例 1:
// 输入: root = [2,1,3], p = 1
//   2
//  / \
// 1   3
// 输出: 2

// 示例 2:
// 输入: root = [5,3,6,2,4,null,null,1], p = 6

//       5
//      / \
//     3   6
//    / \
//   2   4
//  /
// 1
// 输出: null

// 方法一：二分法
var inorderSuccessor = function (root, p) {
  if (!root) return null;
  let cur = root;
  let res;
  while (cur) {
    if (cur.val <= p.val) {
      cur = cur.right;
    } else {
      res = cur;
      cur = cur.left;
    }
  }
  return res;
};

// 方法二：中序遍历
var inorderSuccessor = function (root, p) {
  const stack = [];
  let pre;
  while (stack.length || root) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    if (pre) return root;
    else if (root.val == p.val) {
      pre = true;
    }
    root = root.right;
  }
  return null;
};
