// 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

// 例如，给定如下二叉树:  root = [3,5,1,6,2,0,8,null,null,7,4]

// 示例 1:
// 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// 输出: 3
// 解释: 节点 5 和节点 1 的最近公共祖先是节点 3。

// 示例 2:
// 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// 输出: 5
// 解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。

// 说明:
//     所有节点的值都是唯一的。
//     p、q 为不同节点且均存在于给定的二叉树中。

// 方法一：递归
var lowestCommonAncestor = function (root, p, q) {
  let ans;
  const dfs = (root, p, q) => {
    if (root === null) return false;
    const lson = dfs(root.left, p, q);
    const rson = dfs(root.right, p, q);
    // 满足以下任一情况时，父节点满足要求
    // 1. (left && right)： left、right 均为 true，说明 p、q 分别处于左右子树中
    // 2. ((left || right) && (node.val === p.val || node.val === q.val))：
    //    (left || right)： left 或 right 为 true
    //    (node.val === p.val || node.val === q.val)：且 p 或 q 的值等于父节点的值
    //    此时说明 p 或 q 为父节点
    if (
      (lson && rson) ||
      ((root.val === p.val || root.val === q.val) && (lson || rson))
    ) {
      ans = root;
    }
    return lson || rson || root.val === p.val || root.val === q.val;
  };
  dfs(root, p, q);
  return ans;
};

// 方法二：DFS，深度优先遍历，从根节点开始
var lowestCommonAncestor = function (root, p, q) {
  if (root === null || root === p || root === q) return root;
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  if (left && right) {
    return root;
  }
  return left ? left : right;
};

// 方法三：直接套用 DFS 模版解决 LCA 问题
var lowestCommonAncestor = function (root, p, q) {
  let res;
  dfs(root, p, q);
  return res;

  function dfs(node, p, q) {
    // 节点为空，则直接返回 false
    if (!node) {
      return null;
    }
    const left = dfs(node.left, p, q);
    const right = dfs(node.right, p, q);
    // 满足以下任一情况时，父节点满足要求
    // 1. (left && right)： left、right 均为 true，说明 p、q 分别处于左右子树中
    // 2. ((left || right) && (node.val === p.val || node.val === q.val))：
    //    (left || right)： left 或 right 为 true
    //    (node.val === p.val || node.val === q.val)：且 p 或 q 的值等于父节点的值
    //    此时说明 p 或 q 为父节点
    if (
      (left && right) ||
      ((left || right) && (node.val === p.val || node.val === q.val))
    ) {
      res = node;
    }
    // 否则
    // 若当前节点不是叶子节点，则返回左子树或右子树(左右子树不可能同时存在)
    // 若当前节点为叶子节点，则返回 p 或 q 的值是否为当前节点的值，这里决定了父节点的值为 True / False
    return left || right || node.val === p.val || node.val === q.val;
  }
};
