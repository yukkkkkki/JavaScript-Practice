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
// 方法一：迭代
var BSTIterator = function (root) {
  this.curr = root;
  this.stack = [];
};

/**
 * @return {number}
 */
// 中序遍历
BSTIterator.prototype.next = function () {
  while (this.curr) {
    this.stack.push(this.curr);
    this.curr = this.curr.left;
  }
  this.curr = this.stack.pop();
  const res = this.curr.val;
  this.curr = this.curr.right;
  return res;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.curr !== null || this.stack.length;
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
// 时间复杂度：O(n)
// 空间复杂度：O(n)
