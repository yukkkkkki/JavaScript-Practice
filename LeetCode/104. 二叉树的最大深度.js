// 104. 二叉树的最大深度
// 给定一个二叉树，找出其最大深度。

// 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

// 说明: 叶子节点是指没有子节点的节点。

// 示例：
// 给定二叉树 [3,9,20,null,null,15,7]，

//     3
//    / \
//   9  20
//     /  \
//    15   7

// 返回它的最大深度 3 。

// 方法一：递归
var maxDepth = function (root) {
  if (!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
// 时间复杂度：O(n); 空间复杂度：O(n)

// 方法二：BFS
// 通过创建FIFO队列，迭代每一层元素，每迭代一层，level+1
// 不断的把待处理的节点入队，每次都将本级的节点进行判断是否对称，如果不对称则返回false，
// 对称则将下一级的节点全部入栈，然后再依次出队判断处理，再获取新的待处理节点入队，直到结束。
var maxDepth = function (root) {
  if (root === null) return 0;
  let queue = [root];
  let level = 0;
  while (queue.length > 0) {
    let len = queue.length;
    while (len--) {
      let first = queue.shift(); // 左出
      if (first.left) queue.push(first.left);
      if (first.right) queue.push(first.right);
    }
    level++;
  }
  return level;
};
// 时间复杂度：O(n); 空间复杂度：O(n)
