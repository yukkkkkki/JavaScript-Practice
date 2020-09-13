// 给定一棵二叉树，设计一个算法，创建含有某一深度上所有节点的链表（比如，若一棵树的深度为 D，则会创建出 D 个链表）。返回一个包含所有深度的链表的数组。

// 示例：
// 输入：[1,2,3,4,5,null,7,8]

//         1
//        /  \
//       2    3
//      / \    \
//     4   5    7
//    /
//   8
// 输出：[[1],[2,3],[4,5,7],[8]]

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {TreeNode} tree
 * @return {ListNode[]}
 */
var listOfDepth = function (tree) {
  if (!tree) return [];
  if (!tree.left && !tree.right) return [new ListNode(tree.val)];
  const res = [];
  const queue = [tree];
  while (queue.length) {
    let linkList = new ListNode(null);
    let p = linkList;
    let levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      let item = new ListNode(queue[0].val);
      if (queue[0].left) queue.push(queue[0].left);
      if (queue[0].right) queue.push(queue[0].right);
      p.next = item;
      p = p.next;
      queue.shift();
    }
    res.push(linkList.next);
  }
  return res;
};
