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
// 方法一：快慢指针
var detectCycle = function (head) {
  if (!head) return null;

  let fast = head;
  let slow = head;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;

    // 快慢指针相遇 存在环
    if (fast === slow) {
      // 任一节点指向 head
      fast = head;
      while (fast !== slow) {
        fast = fast.next;
        slow = slow.next;
      }
      return fast;
    }
  }

  return null;
};
// 时间复杂度：O(n); 空间复杂度：O(1)

// 方法二：哈希表
var detectCycle = function (head) {
  const visited = new Set();

  let temp = head;
  while (temp) {
    if (visited.has(temp)) {
      return temp;
    }

    visited.add(temp);
    temp = temp.next;
  }

  return null;
};
// 时间复杂度：O(n); 空间复杂度：O(n)
