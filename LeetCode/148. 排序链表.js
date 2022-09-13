/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

// 方法一：归并排序
var sortList = function (head) {
  return mergeSort(head, null);
};
const mergeSort = function (head, tail) {
  if (!head) return head;
  if (head.next === tail) {
    head.next = null;
    return head;
  }

  // 找到链表的中点，以中点为分界，将链表拆分成两个子链表
  let slow = head;
  let fast = head;
  while (fast !== tail) {
    fast = fast.next;
    slow = slow.next;
    if (fast !== tail) {
      fast = fast.next;
    }
  }
  const mid = slow;
  // 对两个子链表分别排序
  // 将两个排序后的子链表合并，得到完整的排序后的链表
  return merge(mergeSort(head, mid), mergeSort(mid, tail));
};
const merge = function (head1, head2) {
  const dummyHead = new ListNode(0);
  let tmp = dummyHead;
  let tmp1 = head1;
  let tmp2 = head2;

  while (tmp1 && tmp2) {
    if (tmp1.val <= tmp2.val) {
      tmp.next = tmp1;
      tmp1 = tmp1.next;
    } else {
      tmp.next = tmp2;
      tmp2 = tmp2.next;
    }
    tmp = tmp.next;
  }

  if (tmp1) tmp.next = tmp1;
  else if (tmp2) tmp.next = tmp2;

  return dummyHead.next;
};
// 时间复杂度：O(nlogn);
// 空间复杂对：O(logn)

// 方法二：借助数组实现
// 若不只有一个元素，
// 3. 然，方法取巧。
var sortList = function (head) {
  // 只有一个元素，直接返回
  if (!head || !head.next) return head;

  // 首先把链表转为数组
  let cur = head;
  let index = 0;
  const arr = [];
  while (cur) {
    arr[index] = cur.val;
    cur = cur.next;
    inde += 1;
  }
  // 数组排序后
  arr.sort((a, b) => a - b);

  // 重建链表
  cur = head;
  index = 0;
  while (cur) {
    cur.val = arr[index];
    index += 1;
    cur = cur.next;
  }
  return head;
};
// 时间复杂度：O(nlogn); 空间复杂对：O(n)
