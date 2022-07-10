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
 * @return {number}
 */
// 方法一：深度优先搜搜
var sumNumbers = function (root) {
  const dfs = (root, preSum) => {
    if (root === null) return 0;
    const sum = preSum * 10 + root.val;
    if (root.left === null && root.right === null) {
      return sum;
    } else {
      return dfs(root.left, sum) + dfs(root.right, sum);
    }
  };

  return dfs(root, 0);
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法二：广度优先搜搜
var sumNumbers = function (root) {
  if (root === null) {
    return 0;
  }

  let sum = 0;
  const nodeQueue = [root];
  const numQueue = [root.val];

  while (nodeQueue.length) {
    const node = nodeQueue.shift();
    const num = numQueue.shift();
    const left = node.left;
    const right = node.right;
    if (left === null && right === null) {
      sum += num;
    } else {
      if (left !== null) {
        nodeQueue.push(left);
        numQueue.push(left.val + num * 10);
      }
      if (right !== null) {
        nodeQueue.push(right);
        numQueue.push(num * 10 + right.val);
      }
    }
  }

  return sum;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
