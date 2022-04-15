/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：排序 + 二分查找
var triangleNumber = function (nums) {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  let res = 0;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let left = j + 1;
      let right = n - 1;
      let k = j;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] < nums[i] + nums[j]) {
          k = mid;
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      res += k - j;
    }
  }

  return res;
};
// 时间复杂度：O(n^2logn)
// 空间复杂度：O(logn)
