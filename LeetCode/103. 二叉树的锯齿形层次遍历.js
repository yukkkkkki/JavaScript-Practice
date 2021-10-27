// 给定一个二叉树，返回其节点值的锯齿形层次遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

// 例如：
// 给定二叉树 [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7

// 返回锯齿形层次遍历如下：
// [
//   [3],
//   [20,9],
//   [15,7]
// ]

// 方法一：BFS 广度优先遍历
// 根节点所在层为0 偶数层从左往右输出 奇数层从右往左输出
// 用一个isOrderLeft来标识是否从左往右
var zigzagLevelOrder = function (root) {
  if (!root) return [];

  const res = [];
  const queue = [root];
  let isOrderLeft = true;

  while (queue.length) {
    const levelList = [];
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (isOrderLeft) levelList.push(node.val);
      else levelList.unshift(node.val);

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    res.push(levelList);
    isOrderLeft = !isOrderLeft;
  }
  return res;
};
// 时间复杂度：O(n); 空间复杂度：O(n)

// 方法二：递归
// 采用递归，一层层遍历。
// 每一层创建一个数组，奇数层元素从左向右插入数组，偶数层元素从右向左插入数组。
// & 与操作符 判断奇偶
var zigzagLevelOrder = function (root) {
  const res = [];
  dfs(0, root);
  return res;
  function dfs(i, current) {
    if (!current) return;
    if (!Array.isArray(res[i])) res[i] = [];
    if (i & 1) res[i].unshift(current.val);
    else res[i].push(current.val);
    dfs(i + 1, current.left);
    dfs(i + 1, current.right);
  }
};
