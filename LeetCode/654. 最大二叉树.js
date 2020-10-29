// 给定一个不含重复元素的整数数组。一个以此数组构建的最大二叉树定义如下：

// 二叉树的根是数组中的最大元素。
// 左子树是通过数组中最大值左边部分构造出的最大二叉树。
// 右子树是通过数组中最大值右边部分构造出的最大二叉树。
// 通过给定的数组构建最大二叉树，并且输出这个树的根节点。

// 示例 ：
// 输入：[3,2,1,6,0,5]
// 输出：返回下面这棵树的根节点：

//       6
//     /   \
//    3     5
//     \    /
//      2  0
//        \
//         1

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
// 方法一：递归
// 思路：创建construct(nums, l, r)，用于找出在数组nums中从l到r索引中最大二叉树的根节点
// 1. 首先调用 construct(nums, 0, n)
// 2. 在索引范围(l : r - 1)内找到最大值的索引，将nums[max_i]作为根节点
var constructMaximumBinaryTree = function (nums) {
  const construct = (nums, left, right) => {
    if (left == right) return null;
    let max_i = max(nums, left, right);
    let root = new TreeNode(nums[max_i]);
    root.left = construct(nums, left, max_i);
    root.right = construct(nums, max_i + 1, right);
    return root;
  };

  const max = (nums, left, right) => {
    let max_i = left;
    for (let i = left; i < right; i++) {
      if (nums[max_i] < nums[i]) {
        max_i = i;
      }
    }
    return max_i;
  };
  return construct(nums, 0, nums.length);
};
