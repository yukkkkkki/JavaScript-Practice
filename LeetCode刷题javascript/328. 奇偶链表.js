// 给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。

// 请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数。

// 示例 1:
// 输入: 1->2->3->4->5->NULL
// 输出: 1->3->5->2->4->NULL

// 示例 2:
// 输入: 2->1->3->5->6->4->7->NULL
// 输出: 2->3->6->7->1->5->4->NULL

// 说明:
//     应当保持奇数节点和偶数节点的相对顺序。
//     链表的第一个节点视为奇数节点，第二个节点视为偶数节点，以此类推。

// 方法一：奇偶链表分离法
// 将链表中所有元素按照奇数位置、偶数位置划分为两个链表：odd 链表、event 链表，遍历结束，直接将偶数链表挂在奇数链表之后。
// 思路
// 1. 如果链表中节点个数为 0、1、2 个时，链表自身已满足奇偶链表，直接返回 head 节点即可；
// 2. 定义 odd 变量指向头节点、even 和 evenHeadPointer 变量指向链表的第二个节点，
//    其中 head 即代表奇数链表的头节点、evenHeadPointer 即代表偶数链表的头节点；
// 3. while 循环遍历链表（利用 odd、even 变量遍历），利用原链表中奇数位置节点的子节点应该挂到偶链表中、
//    偶数位置节点的子节点应该挂到奇链表中交叉遍历赋值，odd、even 变量永远指向奇链表、偶链表最后一个节点；
// 4. 奇链表最后一个节点 odd 的子节点指向偶链表的头节点 evenHeadPointer；
// 5. 返回 head 头节点即可；
var oddEvenList = function (head) {
  if (!head || !head.next || !head.next.next) return head;
  let odd = head;
  let even = head.next;
  const evenHeadPointer = head.next;
  while (even && even.next) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHeadPointer;
  return head;
};
// 时间复杂度：O(n); 空间复杂度：O(1)

// 方法二：数组暂存法
// 遍历链表并利用数组暂存链表节点，然后在数组中对奇数、偶数位置的节点进行串联；
var oddEvenList = function (head) {
  // 如果链表中元素个数少于2个，直接返回链表
  if (!head || !head.next || !head.next.next) return head;
  // 为了防止链表节点丢失，利用一个数组暂存链表
  const linkArr = [];
  while (head) {
    linkArr.push(head);
    const len = linkArr.length;
    // 从第三个节点开始处理next
    if (len > 2) {
      linkArr[len - 3].next = linkArr[len - 1];
    }
    head = head.next;
    if (head == null) linkArr[len - 2].next = null;
    const isOdd = len % 2 !== 0;
    if (!isOdd) {
      linkArr[len - 2].next = linkArr[1];
    } else {
      linkArr[len - 1].next = linkArr[1];
    }
  }
  return linkArr[0];
};
// 时间复杂度：O(n); 空间复杂度：O(n)
