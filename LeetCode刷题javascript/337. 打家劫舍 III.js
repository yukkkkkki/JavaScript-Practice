// 在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为“根”。 除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。

// 计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。

// 示例 1:
// 输入: [3,2,3,null,3,null,1]
//      3
//     / \
//    2   3
//     \   \
//      3   1
// 输出: 7
// 解释: 小偷一晚能够盗取的最高金额 = 3 + 3 + 1 = 7.

// 示例 2:
// 输入: [3,4,5,1,3,null,1]
//      3
//     / \
//    4   5
//   / \   \
//  1   3   1
// 输出: 9
// 解释: 小偷一晚能够盗取的最高金额 = 4 + 5 = 9.

// 方法一：动态规划
// 我们可以用 f(o) 表示选择 o 节点的情况下，o 节点的子树上被选择的节点的最大权值和；
// g(o) 表示不选择 o 节点的情况下，o 节点的子树上被选择的节点的最大权值和；
// l 和 r 代表 o 的左右孩子。
//     当 o 被选中时，o 的左右孩子都不能被选中，故 o 被选中情况下子树上被选中点的最大权值和为 l 和 r 不被选中的最大权值和相加，
//       即 f(o)= g(l) + g(r)
//     当 o 不被选中时，o 的左右孩子可以被选中，也可以不被选中。
//     对于 o 的某个具体的孩子 x，它对 o 的贡献是 x 被选中和不被选中情况下权值和的较大值。
//       故 g(o)=max⁡{f(l),g(l)} + max⁡{f(r),g(r)}
// 至此，我们可以用哈希映射来存 f 和 g 的函数值，用深度优先搜索的办法后序遍历这棵二叉树，我们就可以得到每一个节点的 f 和 g。
// 根节点的 f 和 g 的最大值就是我们要找的答案。
var rob = function (root) {
  const f = new Map();
  const g = new Map();

  const dfs = (node) => {
    if (node == null) return;
    dfs(node.left);
    dfs(node.right);
    f.set(node, node.val + (g.get(node.left) || 0) + (g.get(node.right) || 0));
    g.set(
      node,
      Math.max(f.get(node.left) || 0, g.get(node.left) || 0) +
        Math.max(f.get(node.right) || 0, g.get(node.right) || 0)
    );
  };

  dfs(root);
  return Math.max(f.get(root) || 0, g.get(root) || 0);
};
// 时间复杂度：O(n); 空间复杂度：O(n)

// 优化：们可以设计一个结构，表示某个节点的 fff 和 ggg 值，在每次递归返回的时候，都把这个点对应的 fff 和 ggg 返回给上一级调用，这样可以省去哈希映射的空间
var rob = function (root) {
  const dfs = (node) => {
    if (node === null) return [0, 0];
    const l = dfs(node.left);
    const r = dfs(node.right);
    const selected = node.val + l[1] + r[1];
    const notSelected = Math.max(l[0], l[1]) + Math.max(r[0], r[1]);
    return [selected, notSelected];
  };
  const rootStatus = dfs(root);
  return Math.max(rootStatus[0], rootStatus[1]);
};
// 时间复杂度：O(n); 空间复杂度：O(n)

// 方法二：递归
// 打不打劫根节点，会影响打劫一棵树的收益：
//     打劫根节点，则不能打劫左右子节点，但是能打劫左右子节点的四个子树。
//     不打劫根节点，则能打劫左子节点和右子节点，收益是打劫左右子树的收益之和。
var rob = function (root) {
  if (root == null) return 0;
  let robIncludeRoot = root.val;
  if (root.left) {
    robIncludeRoot += rob(root.left.left) + rob(root.left.right);
  }
  if (root.right) {
    robIncludeRoot += rob(root.right.left) + rob(root.right.right);
  }
  const robExcludeRoot = rob(root.left) + rob(root.right);
  return Math.max(robIncludeRoot, robExcludeRoot);
};

// 记忆化递归
// 把计算过的结果存到 map。下次遇到相同的子问题时直接拿过来用，就不用做重复的递归
var rob = function (root) {
  const memo = new Map();
  const helper = (root) => {
    if (root === null) return 0;
    if (memo.has(root)) return memo.get(root);
    let robIncludeRoot = root.val;
    if (root.left) {
      robIncludeRoot += helper(root.left.left) + helper(root.left.right);
    }
    if (root.right) {
      robIncludeRoot += helper(root.right.left) + helper(root.right.right);
    }
    const robExcludeRoot = helper(root.left) + helper(root.right);
    const res = Math.max(robIncludeRoot, robExcludeRoot);
    memo.set(root, res);
    return res;
  };
  return helper(root);
};
