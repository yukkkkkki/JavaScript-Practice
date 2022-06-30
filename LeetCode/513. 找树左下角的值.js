/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 方法一：广度优先遍历 BFS
var findBottomLeftValue = function (root) {
  if (!root) return 0;
  const queue = [root];
  let leftVal = root.val;

  while (queue.length) {
    let count = queue.length;
    leftVal = queue[0].val;

    for (let i = 0; i < count; i++) {
      let node = queue.shift();
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }

  return leftVal;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法二：深度优先搜索 DFS
var findBottomLeftValue = function (root) {
  const dfs = (root, height) => {
    if (!root) return;

    height++;
    dfs(root.left, height);
    dfs(root.right, height);

    if (height > curHeight) {
      curHeight = height;
      curVal = root.val;
    }
  };

  let curHeight = 0;
  dfs(root, 0);
  return curVal;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
