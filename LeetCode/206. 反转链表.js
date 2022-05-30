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
// 方法一：双指针
var reverseList = function (head) {
  let prev = null;
  let cur = head;
  let temp;

  while (cur) {
    // 修改前先记住下一个节点
    temp = cur.next;
    // 改变指向，第一个节点prev是null
    cur.next = prev;
    // 记录前一个节点，供下次循环使用
    prev = cur;
    // cur通过temp指向下一节点
    cur = temp;
  }
  // cur会多循环直到null
  return prev;
};

// 方法二：递归
var reverseList = function (head) {
  if (head == null || head.next == null) return head;

  const curr = reverseList(head.next);
  // 例如，1，2，3，4，5,null
  // current是5
  // head是4
  // head.next 是 5
  // head.next.next 就是5指向的指针，指向当前的head（4）
  // 5-4-3-2-1-null
  head.next.next = head; // 让5指向4
  head.next = null; // head.next设置为null，切断4链接5的指针
  // 每层递归返回当前的节点，也就是最后一个节点。
  // 因为head.next.next改变了，所以下一层current变4，head变3
  return curr;
};
