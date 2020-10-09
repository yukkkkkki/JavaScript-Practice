// 编写程序以 x 为基准分割链表，使得所有小于 x 的节点排在大于或等于 x 的节点之前。如果链表中包含 x，x 只需出现在小于 x 的元素之后(如下所示)。分割元素 x 只需处于“右半部分”即可，其不需要被置于左右两部分之间。

// 示例:
// 输入: head = 3->5->8->5->10->2->1, x = 5
// 输出: 3->1->2->10->5->5->8

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */

// 方法一：双指针，合并大小链表
var partition = function (head, x) {
  if (!head || !head.next) return head;
  let smallHead = new ListNode(-1),
    largeHead = new ListNode(-1);
  let small = smallHead,
    large = largeHead;
  while (head) {
    if (head.val < x) {
      small.next = head;
      small = small.next;
    } else {
      large.next = head;
      large = large.next;
    }
    head = head.next;
  }
  small.next = largeHead.next;
  large.next = null;
  return smallHead.next;
};

// 方法二：头插法
var partition = function (head, x) {
  if (!head || !head.next) return head;
  let pre = head,
    post = head.next;
  while (post) {
    if (post.val < x) {
      let n = del(post, pre);
      n.next = head;
      head = n;
      post = pre.next;
    } else {
      pre = post;
      post = post.next;
    }
  }
  return head;
};

//辅助函数，删除节点并返回
function del(node, preNode) {
  preNode.next = node.next;
  node.next = null;
  return node;
}
