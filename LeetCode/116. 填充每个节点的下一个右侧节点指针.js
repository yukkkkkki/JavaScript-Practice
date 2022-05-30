/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
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

// 方法二：广度优先搜索 层序遍历
var connect = function (root) {
  if (root == null) return root;

  const arr = [root];

  while (arr.length) {
    const size = arr.length;
    let preNode, node;

    // 每一层从左到右进行遍历，把遍历出来的节点依次连接起来
    for (let i = 0; i < size; i++) {
      node = arr.shift();
      if (preNode) preNode.next = node;

      if (node.left) arr.push(node.left);
      if (node.right) arr.push(node.right);

      // 每层最后一个节点的 next 需置为 null，而不是和前一个节点相连
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
