// 给出二叉 搜索 树的根节点，该二叉树的节点值各不相同，修改二叉树，使每个节点 node 的新值等于原树中大于或等于 node.val 的值之和。

// 提醒一下，二叉搜索树满足下列约束条件：

//     节点的左子树仅包含键 小于 节点键的节点。
//     节点的右子树仅包含键 大于 节点键的节点。
//     左右子树也必须是二叉搜索树。

// 示例：
// 输入：[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
// 输出：[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
// 方法一：反中序
// 在反中序过程中直接修改节点值
var bstToGst = function (root) {
  if (root === null) return null;
  let stack = [],
    sum = 0;
  let node = root;

  while (stack.length || node) {
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
var bstToGst = function (root) {
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
