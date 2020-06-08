// 实现一种算法，找出单向链表中倒数第 k 个节点。返回该节点的值。

// 注意：本题相对原题稍作改动

// 示例：
// 输入： 1->2->3->4->5 和 k = 2
// 输出： 4

// 方法一：把链表值存入数组，然后取值
var kthToLast = function (head, k) {
  let arr = [];
  while (head != null) {
    arr.push(head.val);
    head = head.next;
  }
  return arr[arr.length - k];
};

// 方法二：双指针方法
// 右指针先走k步，然后左右指针一起走，直到右指针遇到链表尾，就返回左指针
var kthToLast = function (head, k) {
  var left = head,
    right = head;
  while (k > 0) {
    right = right.next;
    k--;
  }

  while (right !== null) {
    left = left.next;
    right = right.next;
  }
  return left.val;
};