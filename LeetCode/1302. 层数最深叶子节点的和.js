// 给你一棵二叉树，请你返回层数最深的叶子节点的和。

// 示例：
// 输入：root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
// 输出：15

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
// 思路：
// 从根节点开始进行搜索，在搜索的同时记录当前节点的深度 dep，我们维护两个全局变量maxdep和total
// 当我们搜索到一个新的节点：
// 1. 节点 x 的深度 dep 小于maxdep，则忽略该节点，继续进行搜索
// 2. 节点 x 的深度 dep == maxdep，则将节点 x 的权重添加到 total中
// 3. 节点 x 的深度 dep > maxdep，则将maxdep设置为 dep，并将total置为节点x的权值
var deepestLeavesSum = function (root) {
  let maxdep = -1;
  let total = 0;

  const dfs = (node, dep) => {
    if (!node) return;
    if (dep > maxdep) {
      maxdep = dep;
      total = node.val;
    } else if (dep == maxdep) {
      total += node.val;
    }
    dfs(node.left, dep + 1);
    dfs(node.right, dep + 1);
  };

  dfs(root, 0);
  return total;
};
// 时间复杂度：O(N)；空间复杂度：O(H), H 是树的高度（最大深度）

// 方法二：广度优先搜索
var deepestLeavesSum = function (root) {
  const queue = [];
  queue.push([root, 0]);
  let maxdep = -1,
    total = 0;
  while (queue.length) {
    let [node, dep] = queue.pop();
    if (dep > maxdep) {
      maxdep = dep;
      total = node.val;
    } else if (dep == maxdep) {
      total += node.val;
    }
    if (node.left) queue.push([node.left, dep + 1]);
    if (node.right) queue.push([node.right, dep + 1]);
  }
  return total;
};
