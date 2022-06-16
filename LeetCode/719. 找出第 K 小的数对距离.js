/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 方法一：排序 + 二分查找
// 第 k 小的数对距离必然在区间 [0, max(nums) − min(nums)] 内
// 令 left = 0, right = max(nums) − min(nums)，在区间 [left, right] 上进行二分
var smallestDistancePair = function (nums, k) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let left = 0;
  let right = nums[n - 1] - nums[0];

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let cnt = 0;
    for (let j = 0; j < n; j++) {
      // 所有距离小于等于 mid 的数对数目 cnt
      const i = binarySearch(nums, j, nums[j] - mid);
      cnt += j - i;
    }
    if (cnt >= k) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
};

const binarySearch = (nums, end, target) => {
  let left = 0;
  let right = end;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
      left = left + 1;
    } else {
      right = mid;
    }
  }
  return left;
};
// 时间复杂度：O(nlogn×logD)
// 空间复杂度：O(logn)
