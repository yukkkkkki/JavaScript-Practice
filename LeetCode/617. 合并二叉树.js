// 给定两个二叉树，想象当你将它们中的一个覆盖到另一个上时，两个二叉树的一些节点便会重叠。

// 你需要将他们合并为一个新的二叉树。合并的规则是如果两个节点重叠，那么将他们的值相加作为节点合并后的新值，否则不为 NULL 的节点将直接作为新二叉树的节点。

// 示例 1:

// 输入:
// 	Tree 1                     Tree 2
//           1                         2
//          / \                       / \
//         3   2                     1   3
//        /                           \   \
//       5                             4   7
// 输出:
// 合并后的树:
// 	     3
// 	    / \
// 	   4   5
// 	  / \   \
// 	 5   4   7

// 注意: 合并必须从两个树的根节点开始。
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

// 方法一：深度优先搜索 DFS
var mergeTrees = function (t1, t2) {
  // 如果两个二叉树的对应节点只有一个为空，则合并后的二叉树的对应节点为其中的非空节点
  if (!t1 && t2) return (t1 = t2);
  if (t1 && !t2) return t1;
  // 如果两个二叉树的对应节点都为空，则合并后的二叉树的对应节点也为空
  if (!t1 && !t2) return null;

  if (t1 && t2) t1.val += t2.val;
  t1.left = mergeTrees(t1.left, t2 && t2.left);
  t1.right = mergeTrees(t1.right, t2 && t2.right);

  return t1;
};
// O(min(m,n))
// O(min(m,n))

// 方法二：广度优先搜索
var mergeTrees = function (t1, t2) {
  if (!t1 || !t2) return t1 || t2;

  const stack = [[t1, t2]];
  while (stack.length) {
    const cur = stack.pop();
    cur[0].val += cur[1].val;

    if (cur[0].left && cur[1].left) {
      stack.push([cur[0].left, cur[1].left]);
    }

    if (cur[0].right && cur[1].right) {
      stack.push([cur[0].right, cur[1].right]);
    }

    if (!cur[0].left && cur[1].left) cur[0].left = cur[1].left;
    if (!cur[0].right && cur[1].right) cur[0].right = cur[1].right;
  }

  return t1;
};
// O(min(m,n))
// O(min(m,n))
