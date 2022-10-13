/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number[]} nums
 * @return {number}
 */
var numComponents = function (head, nums) {
  const memo = new Set(nums);

  let cnt = 0;
  let inSet = false;
  while (head) {
    if (memo.has(head.val)) {
      if (!inSet) {
        inSet = true;
        cnt++;
      }
    } else {
      inSet = false;
    }

    head = head.next;
  }

  return cnt;
};
// 时间复杂度：O(n)
// 空间复杂度：O(m) m 是数组 nums 的长度
