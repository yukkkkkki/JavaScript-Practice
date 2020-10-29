// 给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。

// 例如，从根到叶子节点路径 1->2->3 代表数字 123。

// 计算从根到叶子节点生成的所有数字之和。

// 说明: 叶子节点是指没有子节点的节点。

// 示例 1:
// 输入: [1,2,3]
//     1
//    / \
//   2   3
// 输出: 25
// 解释:
// 从根到叶子节点路径 1->2 代表数字 12.
// 从根到叶子节点路径 1->3 代表数字 13.
// 因此，数字总和 = 12 + 13 = 25.

// 示例 2:
// 输入: [4,9,0,5,1]
//     4
//    / \
//   9   0
//  / \
// 5   1
// 输出: 1026
// 解释:
// 从根到叶子节点路径 4->9->5 代表数字 495.
// 从根到叶子节点路径 4->9->1 代表数字 491.
// 从根到叶子节点路径 4->0 代表数字 40.
// 因此，数字总和 = 495 + 491 + 40 = 1026.

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
// 方法一：深度优先搜索
// 思路：
// 从根节点开始，遍历每个节点，如果遇到叶子节点，则将叶子节点对应的数字加到数字之和。
// 若当前节点不是叶子节点,则计算其子节点对应的数字,然后对子节点递归遍历
var sumNumbers = function (root) {
  const dfs = (root, prevSum) => {
    if (root == null) return 0;
    const sum = prevSum * 10 + root.val;
    if (root.left == null && root.right == null) {
      return sum;
    } else {
      return dfs(root.left, sum) + dfs(root.right, sum);
    }
  };
  return dfs(root, 0);
};
// 时间复杂度：O(n)；空间复杂度：O(n)

// 方法二：广度优先搜索
// 思路：
// 维护两个队列，分别存储节点和节点对于的数字
// 初始时，将根节点和根节点的值分别加入两个队列，每次从两个队列分别取出一个节点和一个数字：
//   如果当前节点是叶子节点，则将该节点对应的数字加到数字之和
//   如果当前节点不是叶子节点，则获得当前节点的非空子节点，并根据当前节点对应的数字和子节点的值计算子节点对应的数字，然后将子节点和子节点对应的数字分别加入两个队列
var sumNumbers = function (root) {
  if (root == null) return 0;
  let sum = 0;
  const nodeQueue = [];
  const numQueue = [];
  nodeQueue.push(root);
  numQueue.push(root.val);
  while (nodeQueue.length) {
    const node = nodeQueue.shift();
    const num = numQueue.shift();
    const left = node.left,
      right = node.right;
    if (left == null && right == null) {
      sum += num;
    } else {
      if (left !== null) {
        nodeQueue.push(left);
        numQueue.push(num * 10 + left.val);
      }
      if (right !== null) {
        nodeQueue.push(right);
        numQueue.push(num * 10 + right.val);
      }
    }
  }
  return sum;
};
// 时间复杂度：O(n)；空间复杂度：O(n)
