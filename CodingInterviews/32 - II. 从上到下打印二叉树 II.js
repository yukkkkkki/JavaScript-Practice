// 从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

// 例如:
// 给定二叉树: [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7

// 返回其层次遍历结果：
// [
//   [3],
//   [9,20],
//   [15,7]
// ]

// 方法一：BFS 广度优先遍历
var levelOrder = function (root) {
  if (!root) return [];

  const ret = [];
  const q = [root];

  while (q.length !== 0) {
    const levelSize = q.length;
    let curr = [];

    for (let i = 1; i <= levelSize; i++) {
      const node = q.shift();
      curr.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }

    ret.push(curr);
  }

  return ret;
};

// 方法二：dfs
var levelOrder = function (root) {
  if (!root) return [];
  let res = [];
  dfs(root, 0, res);
  return res;
};

function dfs(root, step, res) {
  if (root) {
    if (!res[step]) res[step] = [];
    res[step].push(root.val);
    dfs(root.left, step + 1, res);
    dfs(root.right, step + 1, res);
  }
}
