/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// 方法一：记录所有链表元素
/**
 * @param {ListNode} head
 */
var Solution = function (head) {
  this.list = [];
  while (head) {
    this.list.push(head.val);
    head = head.next;
  }
};

/**
 * @return {number}
 */
Solution.prototype.getRandom = function () {
  return this.list[Math.floor(Math.random() * this.list.length)];
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(head)
 * var param_1 = obj.getRandom()
 */
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法二：水塘抽样
// 从链表头开始，遍历整个链表
// 对遍历到的第 i 个节点，随机选择区间 [0,i) 内的一个整数，如果其等于 0，则将答案置为该节点值，否则答案不变
/**
 * @param {ListNode} head
 */
var Solution = function (head) {
  this.head = head;
};

/**
 * @return {number}
 */
Solution.prototype.getRandom = function () {
  let i = 1;
  let res = 0;
  let node = this.head;

  while (node) {
    // 1/i 的概率选中（替换为答案）
    if (Math.floor(Math.random() * i) === 0) {
      res = node.val;
    }

    node = node.next;
    i++;
  }

  return res;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(head)
 * var param_1 = obj.getRandom()
 */
// 时间复杂度：O(1)
// 空间复杂度：O(1)
