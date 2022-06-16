/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 方法一：双指针
var exchange = function (nums) {
  const n = nums.length;
  if (!n) return [];

  let i = 0;
  let j = n - 1;
  // 维护两个指针
  while (i < j) {
    // i 若指向奇数则前进直至指向偶数
    while (i < n && nums[i] % 2) i++;
    // j 若指向偶数则后退直至指向偶数
    while (j >= 0 && nums[j] % 2 === 0) j--;
    // 然后交换两个指针指向的数组值
    if (i < j) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
      j--;
    }
  }
  return nums;
};
