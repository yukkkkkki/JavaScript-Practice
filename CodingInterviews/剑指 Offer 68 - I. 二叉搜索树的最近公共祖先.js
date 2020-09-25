// 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。

// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

// 例如，给定如下二叉搜索树:  root = [6,2,8,0,4,7,9,null,null,3,5]

// 示例 1:
// 输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
// 输出: 6
// 解释: 节点 2 和节点 8 的最近公共祖先是 6。

// 示例 2:
// 输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
// 输出: 2
// 解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。

// 思路：
// p 和 q 相等,则直接返回 p || q
// 若不相等，则判断 p 和 q 在向左还是向右
// 若 p 和 q 都小于root， 则root = root.left
// 若 p 和 q 都大于root， 则root = root.right
// 如果 p 和 q 哥俩对下一步的路线出现了分歧，说明 p 和 q 在当前的节点上就要分道扬镳了，当前的 root 是哥俩临别前一起走的最后一站
// return root
var lowestCommonAncestor = function (root, p, q) {
  if (!root) return null;
  if (p.val === q.val) return q;
  while (root) {
    if (root.val < q.val && root.val < p.val) {
      root = root.right;
    } else if (root.val > q.val && root.val > p.val) {
      root = root.left;
    } else {
      return root;
    }
  }
};
