// 请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。

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
//   [20,9],
//   [15,7]
// ]

// 方法一：层序遍历
// 借助 level 变量标记层数，当 level 为偶数的时候，镜像翻转遍历结果
var levelOrder = function (root) {
  if (!root) return [];
  let queue = [root];
  let res = [];

  let level = 0;
  while (queue.length) {
    res[level] = [];

    let levelNum = queue.length;
    while (levelNum--) {
      const front = queue.shift();
      res[level].push(front.val);
      if (front.left) queue.push(front.left);
      if (front.right) queue.push(front.right);
    }
    // 行号是偶数时，翻转当前层的遍历结果
    if (level % 2 == 0) res[level].reverse();
    level++;
  }
  return res;
};

// 方法二：队列 + 数组
var levelOrder = function (root) {
  const res = [];
  if (!root) return [];

  const queue = [root];
  let level = 1;
  while (queue.length) {
    let temp = [];
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      if (level % 2 == 1) {
        temp.push(node.val);
      } else {
        temp.unshift(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(temp);
    level++;
  }
  return res;
};
