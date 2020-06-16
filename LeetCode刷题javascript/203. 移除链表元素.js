// 删除链表中等于给定值 val 的所有节点。

// 示例:
// 输入: 1->2->6->3->4->5->6, val = 6
// 输出: 1->2->3->4->5

// 方法一：原地操作
var removeElements = function (head, val) {
  let cur = head,
    pre = null;

  while (cur) {
    if (cur.val === val && cur === head) { // 删除节点是头部的情况
      head = head.next;
      cur = head;
    } else if (cur.val === val) { // 找到相等，则改变pre的next指向，cur前进继续找相同元素
      pre.next = cur.next;
      cur = cur.next;
    } else { // 不相等则pre和cur都前进继续找
      pre = cur;
      cur = cur.next;
    }
  }
  return head;
};

// 方法二
var removeElements = function (head, val) {
  let newHead = new ListNode(null), //创建一个新链表头结点来辅助操作
    pre = newHead,
    cur = head;
  newHead.next = head; // 新链表头结点指向head

  while (cur) {
    if (cur.val === val) {
      pre.next = cur.next;
      cur = pre.next;
    } else {
      pre = cur;
      cur = cur.next;
    }
  }
  return newHead.next;
}