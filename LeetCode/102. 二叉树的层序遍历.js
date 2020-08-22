// 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

// 示例：
// 二叉树：[3,9,20,null,null,15,7],
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

// 方法一：dfs(深度优先搜索)
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

// 方法二：BFS(宽度优先搜索)
// 用队列做
var levelOrder = function (root) {
  const ret = [];
  if (!root) return ret;

  const q = [];
  q.push(root);
  while (q.length !== 0) {
    const currentLevelSize = q.length;
    ret.push([]);
    for (let i = 1; i <= currentLevelSize; i++) {
      const node = q.shift();
      ret[ret.length - 1].push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }
  return ret;
};
