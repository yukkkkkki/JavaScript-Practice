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

// 方法一：递归法
// 使用树的先序遍历(递归方法)
// 第一步：同一父节点的左右节点的链接：同一父节点的左节点的next指向右节点
// 第二步：相近但非同一直系父节点的节点相连
var connect = function (root) {
  if (root === null) {
    return root;
  }

  // 同一父节点的左右节点的链接
  if (!!root.left && !!root.right) {
    root.left.next = root.right;
  }

  // 相近但非同一直系父节点的节点相连
  if (!!root.right && root.next && root.next.left) {
    root.right.next = root.next.left;
  }
  connect(root.left);
  connect(root.right);
  return root;
};
// 时间复杂度：O(n); 空间复杂度:O(1)

// 方法二：层序遍历法(队列方法)
// 使用层序遍历的方法，每一层按从左到右进行遍历，把遍历出来的节点依次连接起来，
// 但在连接的时候需要注意，每层的最后一个节点的 next 需要置为 null ，而不是和前一个节点相连
var connect = function (root) {
  const arr = [];
  if (root == null) return root;

  arr.push(root);
  while (arr.length) {
    const size = arr.length;
    let preNode, node;
    for (let i = 0; i < size; i++) {
      node = arr.shift();
      if (preNode && i < size) {
        preNode.next = node;
      }

      if (node.left) arr.push(node.left);
      if (node.right) arr.push(node.right);
      preNode = node;
    }
  }
  return root;
};
// 时间复杂度：O(n); 空间复杂度：O(1);

// 方法三：层序遍历法(指针方法)
// 使用 2 个指针 start 和 current 来进行层序遍历。
// 其中 start 用于标记每一层的第一个节点， current 用来遍历该层的其他节点
// 第一步：定义一个 start 指针，用于标记每一层的第一个节点，start 指针的初始化值为 root 节点，只需要 start = start.left ，就能获取到每一层的第一个节点
// 第二步：定义一个 current 指针，用来遍历该层的其他节点。然后，将同一父节点的左右节点的连接；将相近但非同一直系父节点的节点相连
var connect = function (root) {
  if (root == null) return root;

  let start = root;
  let current = null;
  while (start.left) {
    current = start;
    while (current) {
      // 同一父节点的左右节点相连
      current.left.next = current.right;
      // 相近但非同一直系父节点的节点相连
      if (current.next) {
        current.right.next = current.next.left;
      }
      current = current.next;
    }
    start = start.left;
  }
  return root;
};
// 时间复杂度：O(n); 空间复杂度：O(1);
