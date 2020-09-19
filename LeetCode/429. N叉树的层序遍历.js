// 给定一个 N 叉树，返回其节点值的层序遍历。 (即从左到右，逐层遍历)。

// 例如，给定一个 3叉树 :

// 返回其层序遍历:
// [
//      [1],
//      [3,2,4],
//      [5,6]
// ]

// 方法一：BFS
var levelOrder = function (root) {
  if (!root) return [];
  const res = [];
  const queue = [root];
  while (queue.length) {
    let levelSize = queue.length; // 当前层节点数
    let cur = [];
    for (let i = 0; i < levelSize; i++) {
      let node = queue.shift();
      cur.push(node.val);
      if (node.children) queue.push(...node.children);
    }

    res.push(cur);
  }
  return res;
};
