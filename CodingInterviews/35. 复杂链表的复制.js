/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */
// 方法一:哈希表
var copyRandomList = function (head) {
  if (!head) return null;

  // 当前节点
  let node = head;
  const newHead = new Node(node.val);
  // 当前节点的copy
  let newNode = newHead;

  // 键是原节点，值是复制的节点
  const map = new Map();
  map.set(node, newNode);

  // 复制每个节点和 next 指针
  // 并且保存 "原节点-复制节点" 的映射关系
  while (node.next) {
    newNode.next = new Node(node.next.val);
    node = node.next;
    newNode = newNode.next;
    map.set(node, newNode);
  }

  newNode = newHead;
  node = head;
  // 通过哈希表获得节点对应的复制节点，更新 random 指针
  while (newNode) {
    newNode.random = map.get(node.random);
    newNode = newNode.next;
    node = node.next;
  }
  return newHead;
};

// 方法二：哈希表 记忆化搜索
var copyRandomList = function (head) {
  const map = new Map();

  // 递归函数
  function copy(node) {
    // 空结点
    if (!node) return node;
    // 取缓存
    if (map.has(node)) return map.get(node);

    const res = new Node();
    // 先放缓存
    map.set(node, res);

    res.val = node.val;
    res.next = copy(node.next);
    res.random = copy(node.random);

    return res;
  }

  return copy(head);
};
