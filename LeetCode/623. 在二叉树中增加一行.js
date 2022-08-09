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
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}
 */
// 方法一：深度优先搜索 DFS
var addOneRow = function (root, val, depth) {
  if (!root) return null;

  if (depth === 1) {
    return new TreeNode(val, root, null);
  }

  if (depth === 2) {
    root.left = new TreeNode(val, root.left, null);
    root.right = new TreeNode(val, null, root.right);
  } else {
    // 继续递归往下层搜索
    root.left = addOneRow(root.left, val, depth - 1);
    root.right = addOneRow(root.right, val, depth - 1);
  }

  return root;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法二：广度优先搜索
// 找到要加的一行的上一行，然后对这一行的每个节点 node，都新增两个节点 left 和 right 作为 node 的新子节点
// 并把原左子节点作为 left 的左子节点，把原右子节点作为 right 的右子节点
var addOneRow = function (root, val, depth) {
  if (depth === 1) {
    return new TreeNode(val, root, null);
  }

  let curLevel = [root];
  for (let i = 1; i < depth - 1; i++) {
    let size = curLevel.length;
    for (let j = 0; j < size; j++) {
      let node = curLevel.shift();

      node.left && curLevel.push(node.left);
      node.right && curLevel.push(node.right);
    }
  }

  for (const node of curLevel) {
    node.left = new TreeNode(val, node.left, null);
    node.right = new TreeNode(val, null, node.right);
  }
  return root;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
