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
 * @return {string[][]}
 */
// 方法一：深度优先搜索 DFS
var printTree = function (root) {
  const calDepth = (root) => {
    let h = 0;
    if (root.left) {
      h = Math.max(h, calDepth(root.left) + 1);
    }

    if (root.right) {
      h = Math.max(h, calDepth(root.right) + 1);
    }
    return h;
  };

  const dfs = (res, root, r, c, height) => {
    res[r][c] = root.val.toString();
    if (root.left) {
      dfs(res, root.left, r + 1, c - (1 << (height - r - 1)), height);
    }
    if (root.right) {
      dfs(res, root.right, r + 1, c + (1 << (height - r - 1)), height);
    }
  };

  // 首先通过 DFS 来得到二叉树的高度 height
  const height = calDepth(root);
  // 创建一个行数为 m = height + 1，列数为 n = 2^height - 1 的答案数组
  const m = height + 1;
  const n = (1 << (height + 1)) - 1;
  const res = new Array(m).fill(0).map(() => new Array(n).fill(""));
  dfs(res, root, 0, Math.floor((n - 1) / 2), height);
  return res;
};
// 时间复杂度：O(height x 2^height)
// 空间复杂度：O(height)

// 方法二：广度优先搜索 BFS
var printTree = function (root) {
  const height = calDepth(root);

  const m = height + 1;
  const n = (1 << (height + 1)) - 1;
  const res = new Array(m).fill(0).map(() => new Array(n).fill(""));

  const queue = [];
  queue.push([root, 0, Math.floor((n - 1) / 2)]);

  while (queue.length > 0) {
    const t = queue.shift();
    const node = t[0];

    let r = t[1];
    let c = t[2];
    res[r][c] = node.val.toString();
    if (node.left) {
      queue.push([node.left, r + 1, c - (1 << (height - r - 1))]);
    }
    if (node.right) {
      queue.push([node.right, r + 1, c + (1 << (height - r - 1))]);
    }
  }

  return res;
};
const calDepth = (root) => {
  let res = -1;
  const queue = [root];
  while (queue.length > 0) {
    let len = queue.length;
    res++;
    while (len > 0) {
      len--;
      const t = queue.shift();
      if (t.left) queue.push(t.left);
      if (t.right) queue.push(t.right);
    }
  }
  return res;
};
// 时间复杂度：O(height x 2^height)
// 空间复杂度：O(2^height)
