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
// 方法一：扁平化
var BSTIterator = function (root) {
  this.index = 0;
  this.arr = [];
  this.inorderTraversal(root, this.arr);
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  return this.arr[this.index++];
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.index < this.arr.length;
};

BSTIterator.prototype.inorderTraversal = function (root, arr) {
  if (!root) return;
  this.inorderTraversal(root.left, arr);
  arr.push(root.val);
  this.inorderTraversal(root.right, arr);
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
