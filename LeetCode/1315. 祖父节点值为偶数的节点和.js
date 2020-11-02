// 给你一棵二叉树，请你返回满足以下条件的所有节点的值之和：

// 该节点的祖父节点的值为偶数。（一个节点的祖父节点是指该节点的父节点的父节点。）
// 如果不存在祖父节点值为偶数的节点，那么返回 0 。

// 示例：
// 输入：root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
// 输出：18
// 解释：图中红色节点的祖父节点的值为偶数，蓝色节点为这些红色节点的祖父节点。

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

// 方法一：深度优先搜索 DFS
// 思路：在进行搜索时，搜索状态需要（祖父节点值，父节点值，当前节点）
var sumEvenGrandparent = function (root) {
  let res = 0;

  const dfs = (grandparent_val, parent_val, node) => {
    if (!node) return;
    if (grandparent_val % 2 == 0) {
      res += node.val;
    }
    dfs(parent_val, node.val, node.left);
    dfs(parent_val, node.val, node.right);
  };
  dfs(1, 1, root);
  return res;
};
// 时间复杂度：O(n)；空间复杂度：O(H)

// 方法二：广度优先搜索 BFS
var sumEvenGrandparent = function (root) {
  const queue = [root];
  let res = 0;
  while (queue.length) {
    let node = queue.shift();
    if (node.val % 2 == 0) {
      if (node.left) {
        if (node.left.left) {
          res += node.left.left.val;
        }
        if (node.left.right) {
          res += node.left.right.val;
        }
      }
      if (node.right) {
        if (node.right.left) {
          res += node.right.left.val;
        }
        if (node.right.right) {
          res += node.right.right.val;
        }
      }
    }
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return res;
};
// 时间复杂度：O(n)；空间复杂度：O(H)
