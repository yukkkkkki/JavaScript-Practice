// 在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序。

// 示例 1:
// 输入: 4->2->1->3
// 输出: 1->2->3->4

// 示例 2:
// 输入: -1->5->3->4->0
// 输出: -1->0->3->4->5

// 方法一：归并排序
// 1. 先判断是否只有一个元素，若只有一个元素，直接返回；
// 2. 若不只有一个元素，首先找到链表的中间节点；
// 3. 然后递归的对前半部分链表和后半部分链表分别进行递归排序；
// 4. 最后对两个子链表进行归并操作。
var sortList = function (head) {
  if (!head || !head.next) return head;
  let slow = head,
    fast = head;
  while (slow.next && fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  const middle = slow.next;
  slow.next = null;
  const left = head;
  const right = middle;
  return merge(sortList(left), sortList(right));
};

const merge = function (left, right) {
  const tmp = new ListNode(null);
  let p1 = left, p2 = right;
  let p = tmp;
  while(p1 && p2) {
    if(p1.val < p2.val) {
      const s = p1;
      p1 = p1.next;
      s.next = null;
      p.next = s;
      p = s;
    } else {
      const s = p2;
      p2 = p2.next;
      s.next = null;
      p.next = s;
      p = s;
    }
  }
  if(p1) p.next = p1;
  if(p2) p.next = p2;
  return tmp.next;
};
// 时间复杂度：O(nlogn); 空间复杂对：O(1)

// 方法二：借助数组实现
// 1. 先判断是否只有一个元素，若只有一个元素，直接返回；
// 2. 若不只有一个元素，首先把链表转为数组；
// 3. 然后把数组排序后重建链表，方法取巧。
var sortList = function (head) {
  if (!head || !head.next) return head;
  let cur = head;
  let index = 0;
  const arr = [];
  while (cur) {
    arr[index] = cur.val;
    cur = cur.next;
    inde += 1;
  }
  arr.sort((a, b) => a - b);
  cur = head;
  index = 0;
  while (cur) {
    cur.val = arr[index];
    index += 1;
    cur = cur.next;
  }
  return head;
};
// 时间复杂度：O(nlogn); 空间复杂对：O(n)
