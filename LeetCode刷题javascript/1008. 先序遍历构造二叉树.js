// 返回与给定先序遍历 preorder 相匹配的二叉搜索树（binary search tree）的根结点。

// (回想一下，二叉搜索树是二叉树的一种，其每个节点都满足以下规则，对于 node.left 的任何后代，值总 < node.val，而 node.right 的任何后代，值总 > node.val。此外，先序遍历首先显示节点的值，然后遍历 node.left，接着遍历 node.right。）

// 示例：
// 输入：[8,5,1,7,10,12]
// 输出：[8,5,10,1,7,null,12]

var bstFromPreorder = function (preorder) {
  if (!preorder.length) return null;

  let mid = preorder[0]
  let node = new TreeNode(mid);
  //console.log(node.val);
  let left = [],
    right = [];
  for (let i = 1; i < preorder.length; i++) {
    if (preorder[i] > mid) right.push(preorder[i]);
    else left.push(preorder[i]);
  }
  node.left = bstFromPreorder(left);
  node.right = bstFromPreorder(right);
  return node;
};