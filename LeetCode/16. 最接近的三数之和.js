/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// 方法一：排序 + 双指针
// 先将数组从小到大排序，从左到右先固定一个数，头尾双指针进行扫描
// 如果 sum 大于 target，就左移右指针，否则右移左指针
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b);
  const n = nums.length;

  let res = nums[0] + nums[1] + nums[n - 1];
  for (let i = 0; i < n - 2; i++) {
    const n1 = nums[i];
    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      const n2 = nums[left];
      const n3 = nums[right];
      const sum = n1 + n2 + n3;

      sum > target ? right-- : left++;
      if (Math.abs(sum - target) < Math.abs(res - target)) {
        res = sum;
      }
    }
  }

  return res;
};
