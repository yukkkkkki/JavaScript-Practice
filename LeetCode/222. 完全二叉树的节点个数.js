// 给出一个完全二叉树，求出该树的节点个数。

// 说明：
// 完全二叉树的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1~ 2h 个节点。

// 示例:
// 输入:
//     1
//    / \
//   2   3
//  / \  /
// 4  5 6
// 输出: 6

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

// 方法一：二分查找 + 位运算
// 思路：规定根节点位于第 0 层，完全二叉树的最大层数为 h。
// 根据完全二叉树的特性可知，完全二叉树的最左边的节点一定位于最底层，因此从根节点出发，每次访问左子节点，直到遇到叶子节点，该叶子节点即为完全二叉树的最左边的节点，经过的路径长度即为最大层数 h。
// 对于最大层数为 hh 的完全二叉树，节点个数一定在 [2^h,2^{h+1}-1]的范围内，可以在该范围内通过二分查找的方式得到完全二叉树的节点个数。
// 根据节点个数范围的上下界得到当前需要判断的节点个数 k，如果第 k 个节点存在，则节点个数一定大于或等于 k，
// 如果第 k 个节点不存在，则节点个数一定小于 k，由此可以将查找的范围缩小一半，直到得到节点个数。
// 如何判断第 k 个节点是否存在呢？
// 如果第 k 个节点位于第 h 层，则 k 的二进制表示包含 h+1 位，其中最高位是 1，其余各位从高到低表示从根节点到第 k 个节点的路径，
// 0 表示移动到左子节点，1 表示移动到右子节点。通过位运算得到第 k 个节点对应的路径，判断该路径对应的节点是否存在，即可判断第 k 个节点是否存在。
const exists = (root, level, k) => {
  let bits = 1 << (level - 1);
  let node = root;
  while (node !== null && bits > 0) {
    if (!(bits & k)) {
      node = node.left;
    } else {
      node = node.right;
    }
    bits >>= 1;
  }
  return node !== null;
};
var countNodes = function (root) {
  if (root === null) return 0;
  let level = 0;
  let node = root;
  while (node.left !== null) {
    level++;
    node = node.left;
  }
  let low = 1 << level,
    high = (1 << (level + 1)) - 1;
  while (low < high) {
    const mid = Math.floor((high - low + 1) / 2) + low;
    if (exists(root, level, mid)) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }
  return low;
};
// 时间复杂度：O(h^2) (h = logn)
// 空间复杂度：O(1)

// 方法二：
// 思路：
// 对于一个完全二叉树：
// 它的所有子树都是完全二叉树
// 有的子树是 perfect binary tree，其节点个数为：2^h-1，h为高度
// 如果不是 perfect binary tree，那就是规模小一点的完全二叉树，递归处理
// 所以对于每个节点root，都判断一下它是否是满二叉树 —— 左侧的高度 == 右侧的高度
var countNodes = function (root) {
  if (root == null) return 0;
  let lH = 0,
    rH = 0;
  let lNode = root,
    rNode = root;
  while (lNode) {
    lH++;
    lNode = lNode.left;
  }
  while (rNode) {
    rH++;
    rNode = rNode.right;
  }
  if (lH == rH) {
    return 2 ** lH - 1;
  }
  return 1 + countNodes(root.left) + countNodes(root.right);
};
// 时间复杂度：O(logN∗logN)
