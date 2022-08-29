/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
// 方法一：深度优先遍历 DFS
var isSameTree = function (p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
// 时间复杂度：O(min(m, n)); 空间复杂度：O(min(m, n));

// 方法二： JSON.stringify()
var isSameTree = function (p, q) {
  return JSON.stringify(p) === JSON.stringify(q);
};

// 方法三：广度优先遍历 BFS
var isSameTree = function (p, q) {
  if (!p && !q) return true;
  else if (!p || !q) return false;

  let queue1 = [p];
  let queue2 = [q];

  while (queue1.length && queue2.length) {
    let node1 = queue1.shift();
    let node2 = queue2.shift();

    if (node1.val !== node2.val) return false;

    let left1 = node1.left;
    let right1 = node1.right;
    let left2 = node2.left;
    let right2 = node2.right;

    if ((left1 == null) ^ (left2 == null)) return false;
    if ((right1 == null) ^ (right2 == null)) return false;

    left1 && queue1.push(left1);
    left2 && queue2.push(left2);
    right1 && queue1.push(right1);
    right2 && queue2.push(right2);
  }

  return queue1.length === 0 && queue2.length === 0;
};
