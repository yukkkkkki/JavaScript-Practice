/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 方法一
var rotate = function (nums, k) {
  let n = nums.length;
  // 计算出需要循环移动的次数
  k = k % n;
  for (let i = 0; i < k; i++) {
    nums.unshift(nums.pop());
  }
  return nums;
  // return nums.unshift(...nums.splice(n - k, k));
};

// 方法二
// 思路:
// 先将原数组的所有元素整体往后移动 k 个位置，给需要旋转的元素预留出位置，然后通过替换和删除，实现数组的旋转。
var rotate = function (nums, k) {
  let n = nums.length;
  k = k % n;
  // 将原数组原有的元素从最后一位开始，依次移动到（原下标 + k）的位置
  for (let i = n - 1; i >= 0; i--) {
    nums[i + k] = nums[i];
  }
  // 从改变后的新数组的下标为 k - 1 的元素开始
  for (let j = k - 1; j >= 0; j--) {
    // 依次将最后一位赋值给新数组下标为 k - 1 的元素
    nums[j] = nums[n + j];
    // 然后删除掉最后一位元素。
    nums.pop();
  }
  return nums;
};
