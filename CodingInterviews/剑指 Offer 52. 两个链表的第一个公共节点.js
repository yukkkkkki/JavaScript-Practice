/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
// 方法一：遍历 + 哈希表记录
var getIntersectionNode = function (headA, headB) {
  const map = new Map();
  // 遍历 headA ，设置 map[节点] = true
  let node = headA;
  while (node) {
    map.set(node, true);
    node = node.next;
  }

  // 遍历 headB，如果节点在 map 中出现过，那么说明这是两个链表的公共节点
  node = headB;
  while (node) {
    if (map.has(node)) return node;
    node = node.next;
  }
  return null;
};
// 时间复杂度：O(N)
// 空间复杂度：O(N)

// 方法二：双指针
// 思路：如果 A、B 两链表相交，则 A 、B 自相交点往后的链表是一致的
var getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) return null;

  let pa = headA;
  let pb = headB;

  // 同步遍历 A、B 链表
  while (pa || pb) {
    // 直到有相交节点，返回相交节点
    if (pa === pb) return pa;
    // 遍历完 A，则 pA 指向 headB
    pa = pa ? pa.next : headB;
    // 遍历完 B，则 pB 指向 headA
    pb = pb ? pb.next : headA;
  }

  return null;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
// 这方法好美妙，牛逼
