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
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 方法二：双指针
// 一次遍历，用两个指针分别来交换0和1
// 指针 p0 用来交换 0，指针 p1用来交换 1，初始值都为0
var sortColors = function (nums) {
  let p0 = 0;
  let p1 = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      swap(i, p1, nums);
      p1++;
    } else if (nums[i] === 0) {
      swap(i, p0, nums);
      // 将 0 与 nums[p0]进行交换，可能会把一个 1 交换出去
      // 当 p0 < p1，已经将一些 1 连续地放在头部，此时一定会把一个 1 交换出去，导致答案错误
      if (p0 < p1) swap(i, p1, nums);
      p0++;
      p1++;
    }
  }

  return nums;
};

function swap(i, j, nums) {
  [nums[i], nums[j]] = [nums[j], nums[i]];
}
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 方法三：双指针
// 用 p0 来交换 0，用 p2 来交换2,
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
