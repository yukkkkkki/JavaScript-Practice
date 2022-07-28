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
 */
// 方法一：队列
var CBTInserter = function (root) {
  this.cnt = 0;
  this.root = root;

  const queue = [root];

  while (queue.length) {
    this.cnt++;
    const node = queue.shift();

    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
};

/**
 * @param {number} val
 * @return {number}
 */
CBTInserter.prototype.insert = function (val) {
  this.cnt++;
  const child = new TreeNode(val);
  let node = this.root;
  const highbit = ('' + this.cnt.toString(2)).length - 1;
  for (let i = highbit - 1; i >= 1; i--) {
    if ((this.cnt & (1 << i)) !== 0) {
      node = node.right;
    } else {
      node = node.left;
    }
  }

  if ((this.cnt & 1) !== 0) {
    node.right = child;
  } else {
    node.left = child;
  }

  return node.val;
};

/**
 * @return {TreeNode}
 */
CBTInserter.prototype.get_root = function () {
  return this.root;
};

/**
 * Your CBTInserter object will be instantiated and called as such:
 * var obj = new CBTInserter(root)
 * var param_1 = obj.insert(val)
 * var param_2 = obj.get_root()
 */
// 时间复杂度：初始化 O(n); insert O(log(n + q)); get_root O(1)
// 空间复杂度：初始化 O(n); insert O(1); get_root O(1)
