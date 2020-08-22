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

// 方法一：递归
var mergeTrees = function (t1, t2) {
  if (!t1 && t2) return (t1 = t2);
  if (!t1 && !t2) return null;
  if (t1 && t2) t1.val += t2.val;
  t1.left = mergeTrees(t1.left, t2 && t2.left);
  t1.right = mergeTrees(t1.right, t2 && t2.right);
  return t1;
};

// 方法二：迭代
var mergeTrees = function (t1, t2) {
  if (!t1 || !t2) return t1 || t2;
  const res = [[t1, t2]];
  while (res.length) {
    const temp = res.pop();
    temp[0].val += temp[1].val;
    if (temp[0].left && temp[1].left) {
      res.push([temp[0].left, temp[1].left]);
    }
    if (temp[0].right && temp[1].right) {
      res.push([temp[0].right, temp[1].right]);
    }

    if (!temp[0].left && temp[1].left) {
      temp[0].left = temp[1].left;
    }
    if (!temp[0].right && temp[1].right) {
      temp[0].right = temp[1].right;
    }
  }
  return t1;
};

// 方法三：递归
var mergeTrees = function (t1, t2) {
  var makeTree = (t1, t2) => {
    let node;
    if (t1 && t2) {
      node = new TreeNode(t1.val + t2.val);
      node.left = makeTree(t1.left, t2.left);
      node.right = makeTree(t1.right, t2.right);
    } else if (!t1 && t2) {
      return t2;
    } else if (t1 && !t2) {
      return t1;
    } else {
      return null;
    }
    return node;
  };
  return makeTree(t1, t2);
};
