// 设计并实现一个算法，找出二叉树中某两个节点的第一个共同祖先。不得将其他的节点存储在另外的数据结构中。注意：这不一定是二叉搜索树。

// 例如，给定如下二叉树: root = [3,5,1,6,2,0,8,null,null,7,4]

//     3
//    / \
//   5   1
//  / \ / \
// 6  2 0  8
//   / \
//  7   4

// 示例 1:
// 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// 输出: 3
// 解释: 节点 5 和节点 1 的最近公共祖先是节点 3。

// 示例 2:
// 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// 输出: 5
// 解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// 方法一：递归
// 思路：三种情况：
// p, q有一个是root
// p, q分别是左孩子和右孩子
// p, q都在root的同一侧
var lowestCommonAncestor = function (root, p, q) {
  if (!root || root == p || root == q) {
    return root;
  }
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left ? left : right;
};

// 方法二：迭代
// 使用两个栈，记录根节点到p、根节点到q的路径
var lowestCommonAncestor = function (root, p, q) {
  let l1 = [];
  let l2 = [];
  getPath(root, p, l1);
  getPath(root, q, l2);
  let l3 = l1.length < l2.length ? l1.length : l2.length;
  let commom = null;
  for (let i = 0; i < l3; i++) {
    if (l1[i].val == l2[i].val) {
      commom = l1[i];
    } else {
      break;
    }
  }
  return commom;
};

function getPath(root, v, path) {
  if (!root) return false;
  path.push(root);
  if (root.val == v.val) return true;
  if (getPath(root.left, v, path)) return true;
  if (getPath(root.right, v, path)) return true;
  path.pop();
  return false;
}
