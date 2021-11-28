// 方法一：分离节点后合并
// 维护 odd 和 even 两个指针，初始时odd 变量指向头节点，even 指向第二个节点
// while循环：原链表中奇数位置节点的子节点应该挂到偶链表中、偶数位置节点的子节点应该挂到奇链表中交叉遍历赋值
// odd、even 变量永远指向奇链表、偶链表最后一个节点
var oddEvenList = function (head) {
  if (!head) return head;

  let evenHead = head.next;
  let odd = head;
  let even = evenHead;

  while (even && even.next) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }

  odd.next = evenHead;
  return head;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 方法二：数组暂存
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
// 时间复杂度：O(n)
// 空间复杂度：O(n)
