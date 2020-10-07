// 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

// 此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

// 注意:
// 不能使用代码库中的排序函数来解决这道题。

// 示例:
// 输入: [2,0,2,1,1,0]
// 输出: [0,0,1,1,2,2]

// 进阶：
// 一个直观的解决方案是使用计数排序的两趟扫描算法。
// 首先，迭代计算出0、1 和 2 元素的个数，然后按照0、1、2的排序，重写当前数组。
// 你能想出一个仅使用常数空间的一趟扫描算法吗？

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 方法一：单指针
// 对数组进行两次遍历，第一次遍历将所有的0交换到数组的头部，第二次将所有的1交换到头部的0之后
var sortColors = function (nums) {
  const n = nums.length;
  let help = 0;
  for (let i = 0; i < n; ++i) {
    if (nums[i] == 0) {
      let tmp = nums[i];
      nums[i] = nums[help];
      nums[help] = tmp;
      ++help;
    }
  }

  for (let i = help; i < n; ++i) {
    if (nums[i] == 1) {
      let tmp = nums[i];
      nums[i] = nums[help];
      nums[help] = tmp;
      ++help;
    }
  }
  return nums;
};
// 时间复杂度：O(n) 空间复杂度：O(1)

// 方法二：双指针
// 一次遍历，用两个指针分别来交换0和1
// 指针 p0 用来交换1，指针 p1用来交换1，初始值都为0
var sortColors = function (nums) {
  const n = nums.length;
  let p0 = 0;
  let p1 = 0;
  for (let i = 0; i < n; ++i) {
    if (nums[i] == 1) {
      let tmp = nums[i];
      nums[i] = nums[p1];
      nums[p1] = tmp;
      ++p1;
    } else if (nums[i] == 0) {
      let tmp2 = nums[i];
      nums[i] = nums[p0];
      nums[p0] = tmp2;
      if (p0 < p1) {
        tmp2 = nums[i];
        nums[i] = nums[p1];
        nums[p1] = tmp2;
      }
      ++p0;
      ++p1;
    }
  }
  return nums;
};
// 时间复杂度：O(n) 空间复杂度：O(1)

// 方法三：双指针
// 用 p0 来交换0，用 p2 来交换2,
// p0 的初始值为0，从左向右移动
// p2的初始值为 n - 1，从右向左移动
var sortColors = function (nums) {
  var p0 = -1,
    p2 = nums.length;
  for (var i = 0; i < p2; i++) {
    // 找到 22 时，我们需要不断地将其与 nums[p2]进行交换，直到新的 nums[i] 不为 22
    while (i < p2 && nums[i] == 2) {
      p2--, ([nums[i], nums[p2]] = [nums[p2], nums[i]]);
    }
    nums[i] == 0 && i > ++p0 && ([nums[i], nums[p0]] = [nums[p0], nums[i]]);
  }
};

// console.log(sortColors([2, 0, 2, 1, 1, 0]));
