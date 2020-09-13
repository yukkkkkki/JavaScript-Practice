// 给定两个（单向）链表，判定它们是否相交并返回交点。请注意相交的定义基于节点的引用，而不是基于节点的值。换句话说，如果一个链表的第k个节点与另一个链表的第j个节点是同一节点（引用完全相同），则这两个链表相交。

// 示例 1：
// 输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
// 输出：Reference of the node with value = 8
// 输入解释：相交节点的值为 8 （注意，如果两个列表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。

// 示例 2：
// 输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
// 输出：Reference of the node with value = 2
// 输入解释：相交节点的值为 2 （注意，如果两个列表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。

// 示例 3：
// 输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
// 输出：null
// 输入解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
// 解释：这两个链表不相交，因此返回 null。

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

// 方法一：双指针
// 思路：如果 A、B 两链表相交，则 A 、B 自相交点往后的链表是一致的。
// 步骤
// 同步遍历 A、B 链表 pA 、 pB ，直到遍历完其中一个链表（短链表），假设A为长链表
// 那么此时 A、B 两链表的长度差就为 pA 到链尾的长度，此时可以把 pB 指向长链表的表头 headA ，
// 继续同步遍历，直到遍历完长链表
// 此时，headA 到 pB 的长度就为两链表的长度差，pB 到链表的长度与 headB 到链尾的长度一致
// 此时，可将 pA 指向 headB ，然后同步遍历 pB 及 pA ，直到有相交节点，返回相交节点，否则返回 null
var getIntersectionNode = function (headA, headB) {
  let node1 = headA,
    node2 = headB;
  while (node1 || node2) {
    if (node1 == node2) return node1;
    node1 = node1 !== null ? node1.next : headB;
    node2 = node2 !== null ? node2.next : headA;
  }
  return null;
};

// 方法二：遍历 + 哈希表记录
var getIntersectionNode = function (headA, headB) {
  const map = new Map();
  let node = headA;
  while (node) {
    map.set(node, true);
    node = node.next;
  }

  node = headB;
  while (node) {
    if (map.has(node)) return node;
    node = node.next;
  }
  return null;
};

// 方法三：快慢指针