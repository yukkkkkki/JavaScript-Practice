// 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

// 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

// 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

// 示例：
// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807

// 方法一：游标法
// 使用游标变量来跟踪进位，并从包含最低有效位的表头开始模拟逐位相加的过程。
// 1. 设置游标变量 pointer1 和 pointer2，分别指向需要相加的两个链表 L1 和 L2 ；新建一个链表为sumListNode，存储 L1 和 L2逐位相加的结果。
// 2. 逐步移动 pointer1 和 pointer2，对 L1 和 L2 的每个节点相加得到两数之和 sumListNode 的链表节点
var addTwoNumbers = function (l1, l2) {
  const sumListNode = new ListNode(0);
  let pointer1 = l1;
  let pointer2 = l2;
  let current = sumListNode;
  let carry = 0;
  while (pointer1 || pointer2) {
    // 如果 pointer1 已经移动到链表 l1 的末尾，当前值为0
    const num1 = pointer1 ? pointer1.val : 0;
    // 如果 pointer2 已经移动到链表 l2 的末尾，当前值为0
    const num2 = pointer2 ? pointer2.val : 0;
    const sum = carry + num1 + num2;
    carry = Math.floor(sum / 10); // 存储进位
    // sumListNode添加一个当前 l1 和 l2 相加的node ，值为 sum的个位数
    current.next = new ListNode(sum % 10);
    current = current.next;
    if (pointer1) pointer1 = pointer1.next;
    if (pointer2) pointer2 = pointer2.next;
    if (carry > 0) current.next = new ListNode(carry);
  }
  return sumListNode.next;
};
// 时间复杂度：O(n); 空间复杂度：O(n)

// 方法二：数字相加法
var listNodeToNum = function (listNode) {
  let numString = "";
  let currentNode = listNode;
  while (currentNode) {
    numString = current.val + numString;
    currentNode = currentNode.next;
  }
  return BigInt(numString);
};

const numToListNode = function (num) {
  let listNode = null;
  const numString = num.toString();
  for (let i = 0; i < numString.length; i++) {
    const newNode = new ListNode(numString[i]);
    newNode.next = listNode;
    listNode = newNode;
  }
  return listNode;
};

const addTwoNumbers = function (l1, l2) {
  return numToListNode(listNodeToNum(l1) + listNodeToNum(l2));
};
