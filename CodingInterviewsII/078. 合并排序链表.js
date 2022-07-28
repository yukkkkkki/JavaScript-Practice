/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// 方法一：归并排序
// 两两依次合并
var mergeKLists = function (lists) {
  if (lists.length === 0) return null;

  let res = lists[0];
  for (let i = 1; i < lists.length; i++) {
    res = mergeTwoLists(res, lists[i]);
  }
  return res;
};
const mergeTwoLists = (l1, l2) => {
  const dummylist = new ListNode();
  let p = dummylist;
  let p1 = l1;
  let p2 = l2;
  while (p1 && p2) {
    if (p1.val < p2.val) {
      p.next = p1;
      p1 = p1.next;
    } else {
      p.next = p2;
      p2 = p2.next;
    }
    p = p.next;
  }
  p.next = p1 ? p1 : p2;
  return dummylist.next;
};
// 时间复杂度：O(NK^2)，N = lists.length，K = list[i].length
// 空间复杂度：O(1)
