// 面试题28. 对称的二叉树

// 请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。

// 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3
// 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
//     1
//    / \
//   2   2
//    \   \
//    3    3

// 示例 1：
// 输入：root = [1,2,2,3,4,4,3]
// 输出：true

// 示例 2：
// 输入：root = [1,2,2,null,3,null,3]
// 输出：false

// 方法一：递归
var isSymmetric = function (root) {
  if (!root) return null;
  var help = function (left, right) {
    if (!left && !right) return true;
    if (!left || !right) return false;
    return (
      left.val === right.val &&
      help(left.left, right.right) &&
      help(left.right, right.left)
    );
  };
  return help(root.left, root.right);
};

// 方法二：BFS法
var isSymmetric = function (root) {
  let queue = [root, root];
  while (queue.length) {
    let len = queue.length;
    // 一次循环出列两个，所以每次+2
    for (let i = 0; i < len; i += 2) {
      // 左右子树分别出列
      let left = queue.shift();
      let right = queue.shift();
      // 不满足对称
      if ((left && !right) || (!left && right)) return false;
      if (left && right) {
        if (left.val !== right.val) return false;
        queue.push(left.left, right.right);
        queue.push(left.right, right.left);
      }
    }
  }
  return true;
};
