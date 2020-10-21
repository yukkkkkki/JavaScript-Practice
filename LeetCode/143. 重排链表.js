// 给定一个单链表 L：L0→L1→…→Ln-1→Ln ，
// 将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…

// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

// 示例 1:
// 给定链表 1->2->3->4, 重新排列为 1->4->2->3.

// 示例 2:
// 给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */

// 方法一：线性表
var reorderList = function (head) {
  if (!head) return;
  const list = new Array();
  let node = head;
  while (node !== null) {
    list.push(node);
    node = node.next;
  }
  let i = 0,
    j = list.length - 1;
  while (i < j) {
    list[i].next = list[j];
    i++;
    if (i == j) break;
    list[j].next = list[i];
    j--;
  }
  list[i].next = null;
  return head;
};

// 方法二：寻找链表中点 + 链表逆序 + 合并链表
// 思路：
// 1. 使用快慢指针，找到原链表的中点
// 2. 将原链表的右半端反转
// 3. 将原链表的两端合并
var reorderList = function (head) {
  if (!head) return;
  let mid = middleNode(head);
  let l1 = head;
  let l2 = mid.next;
  mid.next = null;
  l2 = reverseList(l2);
  mergeList(l1, l2);

  function middleNode(head) {
    let slow = head;
    let fast = head;
    while (fast.next !== null && fast.next.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  }

  function reverseList(head) {
    let prev = null;
    let curr = head;
    while (curr !== null) {
      let nextTemp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = nextTemp;
    }
    return prev;
  }

  function mergeList(l1, l2) {
    let l1_tmp;
    let l2_tmp;
    while (l1 && l2) {
      l1_tmp = l1.next;
      l2_tmp = l2.next;

      l1.next = l2;
      l1 = l1_tmp;

      l2.next = l1;
      l2 = l2_tmp;
    }
  }

  return head;
};
