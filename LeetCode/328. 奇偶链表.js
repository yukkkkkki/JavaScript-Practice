// 方法一：分离节点后合并
// 维护 odd 和 even 两个指针，初始时odd 变量指向头节点，even 指向第二个节点
// 通过迭代的方式 将奇数节点和偶数节点分离成两个链表，每一步首先更新奇数节点，然后更新偶数节点
// 最后将偶数链表连接在奇数链表之后
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
