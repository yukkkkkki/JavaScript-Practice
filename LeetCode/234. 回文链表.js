/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 方法一：字符串拼接比较
// 通过正向、反向将链表节点值拼接成字符串，最后比较正向、反向字符串是否相同
var isPalindrome = function (head) {
  let positiveStr = "";
  let reverseStr = "";

  while (head) {
    const nodeVal = head.val;
    // 正向字符串拼接
    positiveStr += nodeVal;
    // 反向字符串拼接
    reverseStr = nodeVal + reverseStr;
    // 下一个节点
    head = head.next;
  }
  return positiveStr === reverseStr;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 方法二：递归解法
// 通过递归的方式逆序遍历链表，同时定义一个全局变量 pointer 从前往后正序遍历链表
// 如果正序和逆序遍历出来的值相等，则为回文链表
let pointer;
var reverseLinkList = function (head) {
  if (!head) return true;
  const res = reverseLinkList(head.next) && pointer.val === head.val;
  pointer = pointer.next;
  return res;
};
function isPalindrome(head) {
  pointer = head;
  return reverseLinkList(head);
}
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 方法三：快慢指针
// 找到链表的中间节点，将后半部分的链表反转，与前半部分链表数据进行比较。
// 为了找到中间位置，采用两个引用，步调速度相差 1，当快的引用到达最终节点时，慢的正好在中间。
var isPalindrome = function (head) {
  if (!head || !head.next) return true;

  // 找到前半部分尾节点并反转后半部分链表
  const firstHalfEnd = endOfFirstHalf(head);
  const secondHalfStart = reverseLinkList(firstHalfEnd.next);

  // 判断是否是回文
  let p1 = head;
  let p2 = secondHalfStart;
  let result = true;
  while (result && p2) {
    if (p1.val !== p2.val) return false;
    p1 = p1.next;
    p2 = p2.next;
  }
  // 还原后半部分链表
  firstHalfEnd.next = reverseLinkList(secondHalfStart);
  return result;
};
// 快慢指针找中点
const endOfFirstHalf = (head) => {
  let fast = head;
  let slow = head;
  while (fast.next && fast.next.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
};
// 反转链表
const reverseLinkList = (root) => {
  let prev = null;
  let curr = root;

  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};
// 时间复杂度：O(n)；空间复杂度：O(1)
