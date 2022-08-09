/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;

  while (head) {
    let tail = prev;
    // 查看剩余部分长度是否大于等于 k
    for (let i = 0; i < k; i++) {
      tail = tail.next;
      if (!tail) return dummy.next;
    }
    const next = tail.next;
    [head, tail] = myReverse(head, tail);

    // 把子链表重新接回原链表
    prev.next = head;
    tail.next = next;
    prev = tail;
    head = tail.next;
  }

  return dummy.next;
};

const myReverse = (head, tail) => {
  let prev = tail.next;
  let p = head;

  while (prev !== tail) {
    const next = p.next;
    p.next = prev;
    prev = p;
    p = next;
  }

  return [tail, head];
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
