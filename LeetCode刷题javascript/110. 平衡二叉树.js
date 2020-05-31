// 110. 平衡二叉树
// 给定一个二叉树，判断它是否是高度平衡的二叉树。

// 本题中，一棵高度平衡二叉树定义为：
// 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。

// 示例 1:
// 给定二叉树 [3,9,20,null,null,15,7]
//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回 true 。

// 示例 2:
// 给定二叉树 [1,2,2,3,3,null,null,4,4]
//        1
//       / \
//      2   2
//     / \
//    3   3
//   / \
//  4   4
// 返回 false 。

// 方法一
var isBalanced = function(root) {
  if(!root) return true;

  let l = help(root.left);
  let r = help(root.right);
  if(Math.abs(l - r) > 1) return false;
  
  return isBalanced(root.left) && isBalanced(root.right);
};

function help(node) {
  if(!node) return 0;
  return Math.max(help(node.left) + 1, help(node.right) + 1);
}

// 方法二
var isBalanced = function(root) {
  var dps = function(node) {
    if(!node) return 0;
    
    let left = dps(node.left);
    let right = dps(node.right);

    if(left == -1 || right == -1) {
        return -1;
    }

    if(Math.abs(left - right) <= 1){
        return Math.max(left, right) + 1;
    } else {
        return -1;
    }
  } 
  return dps(root) > -1;
};