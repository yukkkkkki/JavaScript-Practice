/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
// 方法一：记忆化搜索 哈希表
var copyRandomList = function (head) {
  const map = new Map();

  function copy(node) {
    if (!node) return node;
    if (map.has(node)) return map.get(node);

    const res = new Node();
    map.set(node, res);
    res.val = node.val;
    res.next = copy(node.next);
    res.random = copy(node.random);

    return res;
  }

  return copy(head);
};
