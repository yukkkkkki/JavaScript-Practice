/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
// 方法一：递归 DFS
var preorder = function (root) {
  const res = [];

  const dfs = (root) => {
    if (root === null) return;

    res.push(root.val);
    for (const ch of root.children) {
      dfs(ch);
    }
  };

  dfs(root);
  return res;
};
// 时间复杂度：O(m)
// 空间复杂度：O(m)

// 方法二：迭代
var preorder = function (root) {
  const res = [];
  if (root === null) return res;

  const stack = [root];

  while (stack.length) {
    let first = stack.shift();
    res.push(first.val);

    if (first.children) {
      for (let i = 0; i < first.children.length; i++) {
        stack.splice(i, 0, first.children[i]);
      }
    }
  }

  return res;
};
// 时间复杂度：O(m)
// 空间复杂度：O(m)
