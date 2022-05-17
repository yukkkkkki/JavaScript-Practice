// 给定一个完美二叉树，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：

// struct Node {
//   int val;
//   Node *left;
//   Node *right;
//   Node *next;
// }

// 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
// 初始状态下，所有 next 指针都被设置为 NULL。

// 示例：
// 输入：{"$id":"1","left":{"$id":"2","left":{"$id":"3","left":null,"next":null,"right":null,"val":4},"next":null,"right":{"$id":"4","left":null,"next":null,"right":null,"val":5},"val":2},"next":null,"right":{"$id":"5","left":{"$id":"6","left":null,"next":null,"right":null,"val":6},"next":null,"right":{"$id":"7","left":null,"next":null,"right":null,"val":7},"val":3},"val":1}
// 输出：{"$id":"1","left":{"$id":"2","left":{"$id":"3","left":null,"next":{"$id":"4","left":null,"next":{"$id":"5","left":null,"next":{"$id":"6","left":null,"next":null,"right":null,"val":7},"right":null,"val":6},"right":null,"val":5},"right":null,"val":4},"next":{"$id":"7","left":{"$ref":"5"},"next":null,"right":{"$ref":"6"},"val":3},"right":{"$ref":"4"},"val":2},"next":null,"right":{"$ref":"7"},"val":1}
// 解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。

// 方法一：递归
var connect = function (root) {
  if (root === null) return root;

  // 同一父节点的左右节点的链接
  if (!!root.left && !!root.right) {
    root.left.next = root.right;
  }

  // 相近但非同一直系父节点的节点相连：即节点存在右子节点，节点的next存在左子节点
  if (!!root.right && root.next && root.next.left) {
    root.right.next = root.next.left;
  }

  connect(root.left);
  connect(root.right);
  return root;
};
// 时间复杂度：O(n)
// 空间复杂度:O(1)

// 方法二：层序遍历 (队列方法)
var connect = function (root) {
  if (root == null) return root;

  const arr = [];
  arr.push(root);

  while (arr.length) {
    const size = arr.length;
    let preNode, node;

    // 每一层从左到右进行遍历，把遍历出来的节点依次连接起来
    // 每层的最后一个节点的 next 需要置为 null ，而不是和前一个节点相连
    for (let i = 0; i < size; i++) {
      node = arr.shift();
      if (preNode) preNode.next = node;

      if (node.left) arr.push(node.left);
      if (node.right) arr.push(node.right);

      preNode = node;
    }
  }

  return root;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1);

// 方法三：层序遍历法 (指针方法)
var connect = function (root) {
  if (root == null) return root;

  // start 用于标记每一层的第一个节点
  let start = root;
  // current 用来遍历该层的其他节点
  let current = null;

  while (start.left) {
    current = start;

    while (current) {
      // 同一父节点的左右节点相连
      current.left.next = current.right;
      // 相近但非同一直系父节点的节点相连
      if (current.next) current.right.next = current.next.left;
      current = current.next;
    }

    // 获取到下一层的第一个节点
    start = start.left;
  }
  return root;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1);
