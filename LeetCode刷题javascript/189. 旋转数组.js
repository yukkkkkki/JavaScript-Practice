// 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

// 示例 1:

// 输入: [1,2,3,4,5,6,7] 和 k = 3
// 输出: [5,6,7,1,2,3,4]
// 解释:
// 向右旋转 1 步: [7,1,2,3,4,5,6]
// 向右旋转 2 步: [6,7,1,2,3,4,5]
// 向右旋转 3 步: [5,6,7,1,2,3,4]

// 示例 2:

// 输入: [-1,-100,3,99] 和 k = 2
// 输出: [3,99,-1,-100]
// 解释:
// 向右旋转 1 步: [99,-1,-100,3]
// 向右旋转 2 步: [3,99,-1,-100]

// 方法一
// 数据元素向右移动 1 个位置，相当于将数组元素的最后一项截取，然后放到第一项的位置，
// 因此向右移动 k 个位置，就是循环执行上述操作 k 次。
// 而当 k 为数组长度的倍数时，实际相当于没有移动，所以实际需要循环操作的次数为 k % l。

// 详细：
// 1. 首先计算出需要循环移动的次数；
// 2. 通过数组的 unshift() 和 pop() 方法实现旋转，循环执行 k 次。
var rotate = function (nums, k) {
  let n = nums.length;
  k = k % n;
  for (let i = 0; i < k; i++) {
    nums.unshift(nums.pop());
  }
  return nums;
};

// 方法二
// 一次性将最后的 k % l 项全部截取，通过扩展运算符'...'将截取的值放到数组的前边，实现旋转
// 详细思路
// 1. 首先还是计算出需要截取的数组元素的长度；
// 2. 通过数组的 splice() 方法截取需要移动的元素
// 然后使用扩展运算符'...'将截取的元素当作参数，通过 unshift() 方法将截取的 元素放到数组的前边
var rotate = function (nums, k) {
  let n = nums.length;
  k = k % n;
  return nums.unshift(...nums.splice(n - k, k));
};

// 方法三
// 思路:
// 先将原数组的所有元素整体往后移动 k 个位置，给需要旋转的元素预留出位置
// 然后通过替换和删除，实现数组的旋转。
// 详解：
// 1. 先将原数组原有的元素从最后一位开始，依次移动到（原下标 + k）的位置；
// 2. 然后再从改变后的新数组的下标为 (k - 1) 的元素开始，依次将最后一位赋值给新数组下标为 (k - 1) 的元素，然后删除掉最后一位元素。
var rotate = function (nums, k) {
  let n = nums.length;
  k = k % n;
  for (let i = n - 1; i >= 0; i--) {
    nums[i + k] = nums[i];
  }
  for (let j = k - 1; j >= 0; j--) {
    nums[j] = nums[n + j];
    nums.pop();
  }
  return nums;
};
