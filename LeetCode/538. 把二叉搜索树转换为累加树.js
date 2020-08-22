// 给定一个二叉搜索树（Binary Search Tree），把它转换成为累加树（Greater Tree)，使得每个节点的值是原来的节点值加上所有大于它的节点值之和。

// 例如：
// 输入: 原始二叉搜索树:
//               5
//             /   \
//            2     13

// 输出: 转换为累加树:
//              18
//             /   \
//           20     13

// 方法一：反中序
// 在反中序过程中直接修改节点值
var convertBST = function (root) {
  if (root === null) return null;
  let stack = [],
    sum = 0;
  let node = root;
  while (stack.length > 0 || node !== null) {
    if (node) {
      stack.push(node);
      node = node.right;
    } else {
      node = stack.pop();
      sum += node.val;
      node.val = sum;
      node = node.left;
    }
  }
  return root;
};

// 方法二：反中序递归写法
var convertBST = function (root) {
  let sum = 0;
  function help(root) {
    if (root !== null) {
      help(root.right);
      sum += root.val;
      root.val = sum;
      help(root.left);
    }
    return root;
  }
  help(root);
  return root;
};
