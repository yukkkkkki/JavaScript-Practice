/**
 * @param {number[]} arr
 * @return {number}
 */
// 方法一：枚举
var peakIndexInMountainArray = function (arr) {
  const n = arr.length;
  let res = -1;

  for (let i = 1; i < n - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      res = i;
      break;
    }
  }

  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 方法二：二分查找
// 记满足题目要求的下标 i 为 i_ans，则：
// 当 i < i_ans 时，arr_i < arr_i+1 恒成立
// 当 i >= i_ans 时，arr_i > arr_i+1 恒成立
// i_ans 为【最小的满足 arr_i > arr_i+1 的下标 i】
var peakIndexInMountainArray = function (arr) {
  const n = arr.length;
  let left = 1;
  let right = n - 2;
  let res = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] > arr[mid + 1]) {
      res = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return res;
};
// 时间复杂度：O(logn)
// 空间复杂度：O(1)
