/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
// BFS
var serialize = function (root) {
  if (!root) return [];
  let res = [];
  let queue = [root];

  while (queue.length > 0) {
    let node = queue.shift();
    if (node != null) {
      res.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      res.push(null);
    }
  }

  return res;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  if (!data.length) return null;

  let root = new TreeNode(data[0]);
  let queue = [root];
  let i = 1;
  while (queue.length > 0) {
    let node = queue.shift();
    if (data[i] !== null) {
      node.left = new TreeNode(data[i]);
      queue.push(node.left);
    }
    i++;
    if (data[i] !== null) {
      node.right = new TreeNode(data[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
