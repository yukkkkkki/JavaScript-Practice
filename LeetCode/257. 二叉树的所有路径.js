// 给定一个二叉树，返回所有从根节点到叶子节点的路径。

// 说明: 叶子节点是指没有子节点的节点。

// 示例:
// 输入:
//    1
//  /   \
// 2     3
//  \
//   5

// 输出: ["1->2->5", "1->3"]
// 解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3

// 方法一：DFS回溯
var binaryTreePaths = function (root) {
  if (root === null) return [];
  const res = [];

  const backTrack = (node, tmpStr) => {
    if (node.left == null && node.right == null) {
      tmpStr += node.val; // 处理叶子节点
      res.push(tmpStr);
      return;
    }
    tmpStr += node.val + '->';
    if (node.left) {
      backTrack(node.left, tmpStr);
    }
    if (node.right) {
      backTrack(node.right, tmpStr);
    }
  };
  backTrack(root, '');
  return res;
};

// 方法二：BFS
var binaryTreePaths = function (root) {
  const res = [];
  if (!root) return res;
  const node_queue = [root];
  const path_queue = [root.val.toString()];

  while (node_queue.length) {
    const node = node_queue.shift();
    const path = path_queue.shift();

    if (!node.left && !node.right) {
      res.push(path);
    } else {
      if (node.left) {
        node_queue.push(node.left);
        path_queue.push(path + '->' + node.left.val.toString());
      }
      if (node.right) {
        node_queue.push(node.right);
        path_queue.push(path + '->' + node.right.val.toString());
      }
    }
  }
  return res;
};
