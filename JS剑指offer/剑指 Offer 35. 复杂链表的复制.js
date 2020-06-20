// 请实现 copyRandomList 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。

// 示例 1：
// 输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
// 输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]

// 示例 2：
// 输入：head = [[1,1],[2,1]]
// 输出：[[1,1],[2,1]]

// 示例 3：
// 输入：head = [[3,null],[3,0],[3,null]]
// 输出：[[3,null],[3,0],[3,null]]

// 示例 4：
// 输入：head = []
// 输出：[]
// 解释：给定的链表为空（空指针），因此返回 null。

// 方法一
// 用一个哈希表表示映射关系：键是原节点，值是复制的节点。
// 整体算法流程是：
// 第一次遍历，复制每个节点和 next 指针，并且保存"原节点-复制节点"的映射关系
// 第二次遍历，通过哈希表获得节点对应的复制节点，更新 random 指针

// 参考：https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/solution/si-lu-yu-jie-fa-yong-ha-xi-biao-lai-zuo-ying-she-j/
var copyRandomList = function (head) {
  if (!head) return null;
  const map = new Map();
  let node = head; // 当前节点
  const newHead = new Node(node.val);
  let newNode = newHead; // 当前节点的copy
  map.set(node, newNode);

  while (node.next) {
    newNode.next = new Node(node.next.val);
    node = node.next;
    newNode = newNode.next;
    map.set(node, newNode);
  }

  newNode = newHead;
  node = head;
  while (newNode) {
    newNode.random = map.get(node.random);
    newNode = newNode.next;
    node = node.next;
  }
  return newHead;
};

// 方法二：对象记录
var copyRandomList = function (head) {
  const mapping = new Map();

  // 递归函数
  function copy(node) {
    if (!node) return node; // 空结点
    if (mapping.has(node)) return mapping.get(node); // 取缓存

    const res = new Node();
    mapping.set(node, res); // 先放缓存

    res.val = node.val;
    res.next = copy(node.next); // 结点，要递归
    res.random = copy(node.random); // 结点，要递归

    return res;
  }
  return copy(head);
};
