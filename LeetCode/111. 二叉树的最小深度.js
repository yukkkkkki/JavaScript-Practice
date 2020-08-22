// 给定一个二叉树，找出其最小深度。

// 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

// 说明: 叶子节点是指没有子节点的节点。

// 示例:
// 给定二叉树 [3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7

// 返回它的最小深度  2.

// 方法一：DFS
const minDepth = (root) => {
  if (root == null) return 0;
  if (root.left && root.right) {
    return 1 + Math.min(minDepth(root.left), minDepth(root.right));
  } else if (root.left) {
    return 1 + minDepth(root.left);
  } else if (root.right) {
    return 1 + minDepth(root.right);
  } else {
    return 1;
  }
};

// 写法二
const minDepth = (root) => {
  if (root == null) return 0;

  const left = minDepth(root.left);
  const right = minDepth(root.right);

  if (left > 0 && right > 0) {
    return 1 + Math.min(left, right);
  } else if (left > 0) {
    return 1 + left;
  } else if (right > 0) {
    return 1 + right;
  } else {
    return 1;
  }
};

// 写法三
const minDepth = (root) => {
  if (root == null) return 0;

  let depth = 1;

  if (root.left && root.right) {
    const left = minDepth(root.left);
    const right = minDepth(root.right);
    depth += Math.min(left, right);
  } else if (root.left) {
    depth += minDepth(root.left);
  } else if (root.right) {
    depth += minDepth(root.right);
  }
  return depth;
};

// 写法四
const minDepth = (root) => {
  if (root == null) return 0;

  let depth = Infinity;
  if (root.left) {
    depth = Math.min(depth, 1 + minDepth(root.left));
  }
  if (root.right) {
    depth = Math.min(depth, 1 + minDepth(root.right));
  }
  if (root.left == null && root.right == null) {
    depth = 1;
  }
  return depth;
};

// 方法二：BFS
const minDepth = (root) => {
  if (root == null) return 0;

  const queue = [root];
  let depth = 1;

  while (queue.length) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const cur = queue.shift();
      if (cur.left == null && cur.right == null) {
        return depth;
      }
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
    depth++; // 肯定有下一层，如果没有早就return了
  }
};

// 作者：xiao_ben_zhu
// 链接：https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/solution/tu-jie-dfs-xie-liao-si-ban-bfs-xie-liao-yi-ban-by-/
