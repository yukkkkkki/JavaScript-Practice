// 给定一个非空二叉树, 返回一个由每层节点平均值组成的数组。

// 示例 1：
// 输入：
//     3
//    / \
//   9  20
//     /  \
//    15   7
// 输出：[3, 14.5, 11]
// 解释：
// 第 0 层的平均值是 3 ,  第1层是 14.5 , 第2层是 11 。因此返回 [3, 14.5, 11] 。

// 方法一：BFS广度优先搜索
var averageOfLevels = function (root) {
  const res = [];
  const queue = [root];
  // res.push(root.val / level);
  while (queue.length) {
    const levelSize = queue.length;
    let levelSum = 0;
    for (let i = 0; i < levelSize; i++) {
      const cur = queue.shift();
      levelSum += cur.val;
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
    res.push(levelSum / levelSize);
  }
  return res;
};

// 方法二：深度优先搜索
var averageOfLevels = function (root) {
  const res = [];
  const map = new Map();

  const dfs = (node, levle) => {
    if (!node) return;
    map.set(level, (map.get(level) || 0) + 1);
    res[level] = (res[level] || 0) + node.val;
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  };

  dfs(root, 0);
  for (let i = 0; i < res.length; i++) {
    res[i] = res[i] / map.get(i);
  }
  return res;
};
