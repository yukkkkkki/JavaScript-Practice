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
 * @return {number}
 */
// 方法一：深度优先搜索 DFS
var deepestLeavesSum = function (root) {
  let maxdep = -1;
  let total = 0;

  // 从根节点开始进行搜索，在搜索的同时记录当前节点的深度 dep
  const dfs = (node, dep) => {
    if (!node) return;

    if (dep > maxdep) {
      // 将 maxdep设置为 dep，并将 total 置为节点 x 的权值
      maxdep = dep;
      total = node.val;
    } else if (dep == maxdep) {
      // 将节点 x 的权重添加到 total中
      total += node.val;
    }

    // dep < maxdep，忽略该节点继续进行搜索
    dfs(node.left, dep + 1);
    dfs(node.right, dep + 1);
  };

  dfs(root, 0);
  return total;
};
// 时间复杂度：O(n)；
// 空间复杂度：O(H), H 是树的高度（最大深度）

// 方法二：广度优先搜索 BFS
var deepestLeavesSum = function (root) {
  let maxdep = -1;
  let total = 0;

  const queue = [[root, 0]];

  while (queue.length) {
    let [node, dep] = queue.shift();

    if (dep > maxdep) {
      maxdep = dep;
      total = node.val;
    } else if (dep == maxdep) {
      total += node.val;
    }

    node.left && queue.push([node.left, dep + 1]);
    node.right && queue.push([node.right, dep + 1]);
  }

  return total;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

var deepestLeavesSum = function (root) {
  let sum = 0;
  const queue = [root];

  while (queue.length) {
    sum = 0;
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      sum += node.val;

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }

  return sum;
};
