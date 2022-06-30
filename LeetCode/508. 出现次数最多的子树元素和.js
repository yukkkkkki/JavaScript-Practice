/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 方法一：深度优先搜索
// 对于每棵子树，其子树元素和等于子树根结点的元素值，加上左子树的元素和，以及右子树的元素和
// 用哈希表统计每棵子树的元素和的出现次数，计算出现次数的最大值 maxCnt，最后将出现次数等于 maxCnt 的所有元素和返回。
var findFrequentTreeSum = function (root) {
  const cnt = new Map();
  let maxCnt = 0;

  const dfs = (node) => {
    if (!node) return 0;

    const sum = node.val + dfs(node.left) + dfs(node.right);
    // key 为元素和，value 为出现次数
    cnt.set(sum, (cnt.get(sum) || 0) + 1);
    maxCnt = Math.max(maxCnt, cnt.get(sum));

    return sum;
  };

  dfs(root);
  const res = [];
  for (const [s, c] of cnt.entries()) {
    if (c === maxCnt) list.push(s);
  }

  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
