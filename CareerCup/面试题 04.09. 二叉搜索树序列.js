// 从左向右遍历一个数组，通过不断将其中的元素插入树中可以逐步地生成一棵二叉搜索树。给定一个由不同节点组成的二叉搜索树，输出所有可能生成此树的数组。

// 示例：
// 给定如下二叉树

//         2
//        / \
//       1   3
// 返回：
// [
//    [2,1,3],
//    [2,3,1]
// ]

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

// 方法一：回溯法
var BSTSequences = function (root) {
  let res = [];
  if (root == null) return [[]];
  let quenue = [];

  let dfs = (root, res, quenue, temp) => {
    if (root == null) return;
    if (root.left) quenue.push(root.left);
    if (root.right) quenue.push(root.right);
    if (quenue.length == 0) {
      res.push([...temp]);
      return;
    }
    let { length } = quenue;
    while (length--) {
      let cur = quenue.shift();
      dfs(cur, res, quenue.slice(), [...temp, cur.val]);
      quenue.push(cur);
    }
  };

  dfs(root, res, quenue, [root.val]);
  return res;
};
