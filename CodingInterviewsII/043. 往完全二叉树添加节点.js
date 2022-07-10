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
var CBTInserter = function (root) {
  this.queue = [];
  this.root = root;
  this.queue.push(root);
  while (this.queue[0] && this.queue[0].left && this.queue[0].right) {
    let node = this.queue.shift();
    this.queue.push(node.left);
    this.queue.push(node.right);
  }
};

/**
 * @param {number} v
 * @return {number} 返回插入的新节点的父节点的值
 */
CBTInserter.prototype.insert = function (v) {
  let parent = this.queue[0];
  let node = new TreeNode(v);
  // 如果左节点需要被插入就直接插入到左子树中，否则就插入到右子树中
  if (parent.left == null) {
    parent.left = node;
  } else {
    parent.right = node;
    // 当左右子树都满情况下，当前父节点就可以光荣退岗了
    this.queue.shift();
    // 左右子树都满情况下，将左右子节点加入队列，以便为后面新插入节点做准备
    this.queue.push(parent.left);
    this.queue.push(parent.right);
  }
  return parent.val;
};

/**
 * @return {TreeNode} 返回树的根节点
 */
CBTInserter.prototype.get_root = function () {
  return this.root;
};

/**
 * Your CBTInserter object will be instantiated and called as such:
 * var obj = new CBTInserter(root)
 * var param_1 = obj.insert(v)
 * var param_2 = obj.get_root()
 */
