// 将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。

// 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

// 示例:

// 给定有序数组: [-10,-3,0,5,9],

// 一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：

//       0
//      / \
//    -3   9
//    /   /
//  -10  5

// 方法一：二分递归
var sortedArrayToBST = function (nums) {
  if (nums.length == 0) return null;
  let mid = Math.floor(nums.length / 2);
  let node = new TreeNode(nums[mid]);
  node.left = sortedArrayToBST(nums.slice(0, mid));
  node.right = sortedArrayToBST(nums.slice(mid + 1));
  return node;
};

// 方法二
var sortedArrayToBST = function (nums) {
  if (!nums.length) return null;

  function dfs(left, right) {
    if (left > right) return null;
    let mid = Math.floor((left + right) / 2);
    let cur = new TreeNode(nums[mid]);
    cur.left = dfs(left, mid - 1);
    cur.right = dfs(mid + 1, right);
    return cur;
  }
  return dfs(0, nums.length - 1);
}