// 如果二叉树每个节点都具有相同的值，那么该二叉树就是单值二叉树。

// 只有给定的树是单值二叉树时，才返回 true；否则返回 false。

// 示例 1：
// 输入：[1,1,1,1,1,null,1]
// 输出：true

// 示例 2：
// 输入：[2,2,2,5,2]
// 输出：false

// 方法一：队列层序遍历判断节点值
var isUnivalTree = function (root) {
  let queue = [root];

  while (queue.length) {
    let node = queue.shift();
    if (node.val !== root.val) return false;

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return true;
};
