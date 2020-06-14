// 给定一个二叉树，返回它的中序 遍历。

// 示例:
// 输入: [1,null,2,3]
//    1
//     \
//      2
//     /
//    3

// 输出: [1,3,2]

// 方法一：非递归(左子节点->根节点->右子节点)
// 借用辅助数组
// shift() 头删 unshift() 头插
// 用一个辅助数组来做
// 当辅助数组不为空 或者根节node不为空
//   若node不为空
//     根节点头插进辅助数组
//     并且node.left赋值给新的node
//   若node为空
//     辅助数组头删节点赋值给node
//     res.push(node)
//     node.left重新赋值给node
var inorderTraversal = function (root) {
  let arr = [],
    res = [],
    node = root;
  while (arr.length !== 0 || node !== null) {
    if (node !== null) {
      arr.unshift(node);
      node = node.left;
    } else {
      node = arr.shift();
      res.push(node.val);
      node = node.right;
    }
  }
  return res;
};

// 方法二：递归
var inorderTraversal = function (root) {
  let res = [];
  help(root, res);
  return res;
};

var help = function (root, res) {
  if (root !== null) {
    help(root.left, res);
    res.push(root.val);
    help(root.right, res);
  }
}

// 方法三：非递归
// 用栈来做(比前两个效果好)
var inorderTraversal = function (root) {
  let res = [],
    stack = [];
  while (root || stack.length) {
    while (root) { // 左子节点们入栈
      stack.push(root);
      root = root.left;
    }

    root = stack.pop(); // 直到左子节点没有左子节点，出栈
    res.push(root.val); // push进res
    root = root.right; // 看右子节点 
  }
  return res;
};