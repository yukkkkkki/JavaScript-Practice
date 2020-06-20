// 面试题27. 二叉树的镜像
// 请完成一个函数，输入一个二叉树，该函数输出它的镜像。

// 例如输入：
//      4
//    /   \
//   2     7
//  / \   / \
// 1   3 6   9

// 镜像输出：
//      4
//    /   \
//   7     2
//  / \   / \
// 9   6 3   1

// 示例 1：
// 输入：root = [4,2,7,1,3,6,9]
// 输出：[4,7,2,9,6,3,1]

// 方法一：递归
var mirrorTree = function (root) {
  if (!root) return null;
  // 交换当前节点的左右节点
  const leftCopy = root.left;
  root.left = root.right;
  root.right = leftCopy;

  // 递归处理左右子节点
  mirrorTree(root.left);
  mirrorTree(root.right);

  return root;
};

// 方法二：中序遍历 + 交换左右子节点
var mirrorTree = function (root) {
  if (!root) return null;
  let cur;
  let stack = [root];
  while (stack.length) {
    cur = stack.pop();
    let temp = cur.left;
    cur.left = cur.right;
    cur.right = temp;

    cur.right && stack.push(cur.right);
    cur.left && stack.push(cur.left);
  }
  return root;
};
