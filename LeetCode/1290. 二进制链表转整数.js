// 给你一个单链表的引用结点 head。链表中每个结点的值不是 0 就是 1。已知此链表是一个整数数字的二进制表示形式。

// 请你返回该链表所表示数字的 十进制值 。

// 示例 1：
// 输入：head = [1,0,1]
// 输出：5
// 解释：二进制数 (101) 转化为十进制数 (5)

// 示例 2：
// 输入：head = [0]
// 输出：0

// 示例 3：
// 输入：head = [1]
// 输出：1

// 示例 4：
// 输入：head = [1,0,0,1,0,0,1,1,1,0,0,0,0,0,0]
// 输出：18880

// 示例 5：
// 输入：head = [0,0]
// 输出：0

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
// 方法一：模拟
// 思路：用二进制转十进制的方法，在遍历一遍链表的同时得到数字的十进制值
var getDecimalValue = function (head) {
  let cur = head;
  let res = 0;
  while (cur) {
    res = res * 2 + cur.val;
    cur = cur.next;
  }
  return res;
};

// 方法二：先把 head 转成字符串，再用parseInt(string, 2)转为2进制
var getDecimalValue = function (head) {
  let number = '';
  while (head) {
    number += head.val;
    head = head.next;
  }
  return parseInt(number, 2);
};
