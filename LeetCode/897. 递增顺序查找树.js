// 给你一个树，请你 按中序遍历 重新排列树，使树中最左边的结点现在是树的根，并且每个结点没有左子结点，只有一个右子结点。

// 示例 ：

// 输入：[5,3,6,2,4,null,8,1,null,null,null,7,9]

//        5
//       / \
//     3    6
//    / \    \
//   2   4    8
//  /        / \
// 1        7   9

// 输出：[1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]

//  1
//   \
//    2
//     \
//      3
//       \
//        4
//         \
//          5
//           \
//            6
//             \
//              7
//               \
//                8
//                 \
//                  9
var increasingBST = function (root) {
  let temp = [],
    stack = [];
  while (root || stack.length) {
    while (root) {
      // 左子节点们入栈
      stack.push(root);
      root = root.left;
    }

    root = stack.pop(); // 直到左子节点没有左子节点，出栈
    temp.push(root.val);
    root = root.right;
  }

  let newNode = new TreeNode(temp[0]);
  let curNode = newNode;
  for (let i = 0; i < temp.length - 1; i++) {
    curNode.left = null;
    curNode.right = new TreeNode(temp[i + 1]);
    curNode = curNode.right;
  }
  return newNode;
};
