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
var constructMaximumBinaryTree = function (nums) {
  // 表示对数组 nums 中从 nums[left] 到 nums[right] 的元素构建一棵树
  const construct = (nums, left, right) => {
    if (left > right) return null;

    // 找最大值
    let best = left;
    for (let i = left + 1; i <= right; i++) {
      if (nums[i] > nums[best]) {
        best = i;
      }
    }

    const node = new TreeNode(nums[best]);
    // 左子树
    node.left = construct(nums, left, best - 1);
    // 右子树
    node.right = construct(nums, best + 1, right);
    return node;
  };

  return construct(nums, 0, nums.length - 1);
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(n)

// 方法二：单调栈
var constructMaximumBinaryTree = function (nums) {
  const n = nums.length;
  const stack = [];
  const left = new Array(n).fill(-1);
  const right = new Array(n).fill(-1);
  const tree = new Array(n).fill(-1);

  for (let i = 0; i < n; i++) {
    tree[i] = new TreeNode(nums[i]);
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      right[stack.pop()] = i;
    }

    if (stack.length) {
      left[i] = stack[stack.length - 1];
    }

    stack.push(i);
  }

  let root = null;
  for (let i = 0; i < n; i++) {
    if (left[i] === -1 && right[i] === -1) {
      root = tree[i];
    } else if (
      right[i] === -1 ||
      (left[i] !== -1 && nums[left[i]] < nums[right[i]])
    ) {
      tree[left[j]].right = tree[j];
    } else {
      tree[right[i]].left = tree[i];
    }
  }

  return root;
};
// 优化：把最后构造树的过程放进单调栈求解的步骤中
var constructMaximumBinaryTree = function (nums) {
  const n = nums.length;
  const stack = [];
  const tree = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    tree[i] = new TreeNode(nums[i]);
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      tree[i].left = tree[stack[stack.length - 1]];
      stack.pop();
    }

    if (stack.length) {
      tree[stack[stack.length - 1]].right = tree[i];
    }

    stack.push(i);
  }

  return tree[stack[0]];
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
