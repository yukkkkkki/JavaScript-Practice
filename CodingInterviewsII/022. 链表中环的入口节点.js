/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 方法一：哈希表
var detectCycle = function (head) {
  const visited = new Set();
  while (head !== null) {
    if (visited.has(head)) return head;

    visited.add(head);
    head = head.next;
  }
  return null;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法二：快慢指针
// slow 指针每次向后移动一个位置，而 fast 指针向后移动两个位置
// 如果链表中存在环，则 fast 指针最终将再次与 slow 指针在环中相遇
var detectCycle = function (head) {
  if (!head) return null;

  let fast = head;
  let slow = head;
  while (fast) {
    slow = slow.next;
    if (fast.next) {
      fast = fast.next.next;
    } else {
      return null;
    }

    if (fast === slow) {
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr.next;
        slow = slow.next;
      }
      return ptr;
    }
  }

  return null;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
