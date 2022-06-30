/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
// 方法一：深度优先搜索
// 为了能够将扁平化的链表插入 node 与 node 的下一个节点之间，我们需要知道扁平化的链表的最后一个节点 last，随后进行如下的三步操作：
//   将 node 与 node 的下一个节点 next 断开：
//   将 node 与child 相连；
//   将 last 与 next 相连。
var flatten = function (head) {
  const dfs = (node) => {
    let cur = node;
    // 记录链表的最后一个节点
    let last = null;

    // 如果有子节点，那么首先处理子节点
    while (cur) {
      let next = cur.next;

      // 先处理 child 指向的链表结构
      if (cur.child) {
        const childLast = dfs(cur.child);

        next = cur.next;
        // 将 node 与 child 相连
        cur.next = cur.child;
        cur.child.prev = cur;

        // 如果 next 不为空，就将 last 与 next 相连
        if (next !== null) {
          childLast.next = next;
          next.prev = childLast;
        }

        // 将 child 置为空
        cur.child = null;
        last = childLast;
      } else {
        last = cur;
      }
      cur = next;
    }
    return last;
  };

  dfs(head);
  return head;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
