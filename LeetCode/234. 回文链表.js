// 请判断一个链表是否为回文链表。

// 示例 1:
// 输入: 1->2
// 输出: false

// 示例 2:
// 输入: 1->2->2->1
// 输出: true

// 方法一：字符串拼接比较
// 通过正向、反向将链表节点值拼接成字符串，最后比较正向、反向字符串是否相同
var isPalindrome = function (head) {
  let positiveStr = '';
  let reverseStr = '';

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
// 时间复杂度：O(n)；空间复杂度：O(1)

// 方法二：递归解法
// 通过递归的方式逆序遍历链表，同时定义一个全局变量 pointer 从前往后正序遍历链表，如果正序和逆序遍历出来的值相等，则为回文链表
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
// 时间复杂度：O(n)；空间复杂度：O(1)

// 方法三：快慢指针
// 思路
// 找到链表的中间节点，将前半部分的链表反转，与后半部分链表数据进行比较。
// 为了找到中间位置，采用两个引用，步调速度相差 1，当快的引用到达最终节点时，慢的正好在中间。
// 详解
// 1. 分别定义快、慢指针，及前半部分的指针存储
// 2. 遍历链表，快指针走 2 步，慢指针走 1 步，同时将慢指针对应的前半部分链表进行反转
// 3. 链表结束后，慢指针指向中间，与前半部分反转的链表进行逐个比较
function isPalindrome(head) {
  // 空或者单节点
  if (!head || !head.next) {
    return true;
  }

  let slow = head; // 慢指针
  let fast = head; // 快指针
  let reverseRef; // 反转前半部分
  let reversePreRef; // 反转前一个节点
  // 连续 2 个节点都存在
  while (fast && fast.next) {
    fast = fast.next.next; // 快指针前进 2 步
    reverseRef = slow;
    slow = slow.next; // 慢指针前进 1 步

    reverseRef.next = reversePreRef; // 反转链表
    reversePreRef = reverseRef; // 记录上一个节点
  }

  // 奇数场景
  if (fast) slow = slow.next; // 中间值不用比较，慢指针直接前进一步

  while (reverseRef && slow) {
    if (reverseRef.val !== slow.val) {
      return false;
    }
    reverseRef = reverseRef.next;
    slow = slow.next;
  }
  return true;
}
