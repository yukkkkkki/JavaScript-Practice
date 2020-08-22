// 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。

// 示例：
// 输入：nums = [1,2,3,4]
// 输出：[1,3,2,4]
// 注：[3,1,2,4] 也是正确的答案之一。

// 双指针
// 维护两个指针，i若指向奇数则前进直至指向偶数，j若指向偶数则后退直至指向偶数
// 然后交换两个指针指向的数组值
var exchange = function (nums) {
  const length = nums.length;
  if (!length) return [];

  let i = 0,
    j = length - 1;
  while (i < j) {
    while (i < length && nums[i] % 2) i++;
    while (j >= 0 && nums[j] % 2 === 0) j--;

    if (i < j) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
      j--;
    }
  }
  return nums;
};
