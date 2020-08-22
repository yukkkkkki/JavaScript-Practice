// 给定两个二叉树，编写一个函数来检验它们是否相同。

// 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

// 示例 1:
// 输入:       1         1
//           / \       / \
//          2   3     2   3

//         [1,2,3],   [1,2,3]
// 输出: true

// 示例 2:
// 输入:      1          1
//           /           \
//          2             2

//         [1,2],     [1,null,2]
// 输出: false

// 示例 3:
// 输入:       1         1
//           / \       / \
//          2   1     1   2

//         [1,2,1],   [1,1,2]
// 输出: false

// 方法一：深度优先遍历(递归)
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

// 方法三：广度优先遍历
// 首先判断两个二叉树是否为空，如果两个二叉树都不为空，则从两个二叉树的根节点开始广度优先搜索。
// 使用两个队列分别存储两个二叉树的节点。初始时将两个二叉树的根节点分别加入两个队列。每次从两个队列各取出一个节点，进行如下比较操作。

//     比较两个节点的值，如果两个节点的值不相同则两个二叉树一定不同；
//     如果两个节点的值相同，则判断两个节点的子节点是否为空，如果只有一个节点的左子节点为空，或者只有一个节点的右子节点为空，则两个二叉树的结构不同，因此两个二叉树一定不同；
//     如果两个节点的子节点的结构相同，则将两个节点的非空子节点分别加入两个队列，子节点加入队列时需要注意顺序，如果左右子节点都不为空，则先加入左子节点，后加入右子节点。

// 如果搜索结束时两个队列同时为空，则两个二叉树相同。如果只有一个队列为空，则两个二叉树的结构不同，因此两个二叉树不同
var isSameTree = function (p, q) {
  if (!p && !q) return true;
  else if (!p || !q) return false;

  let queue1 = [];
  let queue2 = [];
  queue1.push(p);
  queue2.push(q);
  while (queue1.length && queue2.length) {
    let node1 = queue1.shift();
    let node2 = queue2.shift();
    if (node1.val !== node2.val) return false;
    let left1 = node1.left,
      right1 = node1.right;
    let left2 = node2.left,
      right2 = node2.right;
    if ((left1 == null) ^ (left2 == null)) return false;
    if ((right1 == null) ^ (right2 == null)) return false;
    if (left1) queue1.push(left1);
    if (left2) queue2.push(left2);
    if (right1) queue1.push(right1);
    if (right2) queue2.push(right2);
  }
  return queue1.length === 0 && queue2.length === 0;
};
