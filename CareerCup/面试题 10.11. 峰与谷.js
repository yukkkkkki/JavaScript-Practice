// 在一个整数数组中，“峰”是大于或等于相邻整数的元素，相应地，“谷”是小于或等于相邻整数的元素。例如，在数组{5, 8, 6, 2, 3, 4, 6}中，{8, 6}是峰， {5, 2}是谷。现在给定一个整数数组，将该数组按峰与谷的交替顺序排序。

// 示例:
// 输入: [5, 3, 1, 2, 3]
// 输出: [5, 1, 3, 2, 3]
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 方法一：
// 先降序排序，这时第一个是峰，从第二个开始间隔1，依次和后面的替换
var wiggleSort = function (nums) {
  nums.sort((a, b) => b - a);
  let tmp;
  for (let i = 1; i < nums.length - 1; i += 2) {
    tmp = nums[i];
    nums[i] = nums[i + 1];
    nums[i + 1] = tmp;
  }
  return nums;
};

// 方法二
var wiggleSort = function (nums) {
  const n = nums.length;
  if (n <= 1) return;
  nums = nums.sort((a, b) => a - b);
  const mid = n % 2 === 0 ? n / 2 : Math.floor(n / 2);
  const left = nums.slice(0, mid);
  const right = nums.slice(mid);
  let i = 0;
  while (i < n) {
    let item = null;
    if (i % 2 == 0) item = right[i / 2];
    else {
      item = left[Math.floor(i / 2)];
    }
    nums[i] = item;
    i++;
  }
};
