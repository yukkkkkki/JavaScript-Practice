// 给定一个二叉树，原地将它展开为一个单链表。

// 例如，给定二叉树
//     1
//    / \
//   2   5
//  / \   \
// 3   4   6

// 将其展开为：
// 1
//  \
//   2
//    \
//     3
//      \
//       4
//        \
//         5
//          \
//           6

// 方法一：前序遍历(非递归)
var flatten = function (root) {
  // 先序遍历二叉树
  const list = [];
  const stack = [];
  let node = root;
  while (node !== null || stack.length) {
    while (node !== null) {
      // 如果node不为null,则找node.left
      list.push(node);
      stack.push(node);
      node = node.left;
    }
    // 如果node为null，出栈，找node.right
    node = stack.pop();
    node = node.right;
  }

  // 遍历结果连城链表
  const size = list.length;
  for (let i = 1; i < size; i++) {
    const prev = list[i - 1],
      cur = list[i];
    prev.left = null;
    prev.right = cur;
  }
};
// 时间复杂度O(n); 空间复杂度:O(n)

// 方法二：前序遍历和展开同步进行
// 每次从栈内弹出一个节点作为当前访问的节点，获得该节点的子节点，
// 如果子节点不为空，则依次将右子节点和左子节点压入栈内
// 展开为单链表的做法是
// 维护上一个访问的节点 prev，每次访问一个节点时，令当前访问的节点为 curr，
// 将 prev 的左子节点设为 null 以及将 prev 的右子节点设为 curr，然后将 curr 赋值给 prev，进入下一个节点的访问，直到遍历结束。
// 需要注意的是，初始时 prev 为 null，只有在 prev 不为 null 时才能对 prev 的左右子节点进行更新。
var flatten = function (root) {
  if (root === null) return;

  const stack = [];
  stack.push(root);
  let prev = null;
  while (stack.length) {
    const curr = stack.pop();
    if (prev !== null) {
      prev.left = null;
      prev.right = curr;
    }

    const left = curr.left,
      right = curr.right;
    if (right !== null) {
      stack.push(right);
    }
    if (left !== null) {
      stack.push(left);
    }
    prev = curr;
  }
};
// 时间复杂度O(n); 空间复杂度:O(n)

// 方法三：寻找前驱节点
// 注意到前序遍历访问各节点的顺序是根节点、左子树、右子树。如果一个节点的左子节点为空，则该节点不需要进行展开操作。
// 如果一个节点的左子节点不为空，则该节点的左子树中的最后一个节点被访问之后，该节点的右子节点被访问。
// 该节点的左子树中最后一个被访问的节点是左子树中的最右边的节点，也是该节点的前驱节点。因此，问题转化成寻找当前节点的前驱节点。
// 具体做法是，对于当前节点，如果其左子节点不为空，则在其左子树中找到最右边的节点，作为前驱节点，
// 将当前节点的右子节点赋给前驱节点的右子节点，然后将当前节点的左子节点赋给当前节点的右子节点，并将当前节点的左子节点设为空。
// 对当前节点处理结束后，继续处理链表中的下一个节点，直到所有节点都处理结束。
var flatten = function (root) {
  let curr = root;
  while (curr !== null) {
    if (curr.left !== null) {
      const next = curr.left;
      let predecessor = next;
      while (predecessor.right !== null) {
        predecessor = predecessor.right;
      }
      predecessor.right = curr.right;
      curr.left = null;
      curr.right = next;
    }
    curr = curr.right;
  }
};
// 时间复杂度O(n); 空间复杂度:O(1)
