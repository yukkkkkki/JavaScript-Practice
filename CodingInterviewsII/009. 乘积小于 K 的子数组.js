/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 方法一：滑动窗口
// 枚举子数组的右端点 j，并且左端点从 i = 0 开始
var numSubarrayProductLessThanK = function (nums, k) {
  const n = nums.length;
  let res = 0;
  // 记录子数组 [i, j] 的元素乘积
  let prod = 1;
  let i = 0;
  for (let j = 0; j < n; j++) {
    prod *= nums[j];
    // 移动窗口，乘积去掉 nums[i]
    while (i <= j && prod >= k) {
      // 右移左端点 i 直到满足当前子数组元素乘积小于 k 或者 i > j
      prod /= nums[i];
      i++;
    }
    res += j - i + 1;
  }
  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 方法二：二分查找
var numSubarrayProductLessThanK = function (nums, k) {
  if (k === 0) return 0;
  const n = nums.length;

  // 预处理出数组的元素对数前缀和
  // logPrefix[i + 1] = ∑_{l = 0}^i lognums[l]
  const logPrefix = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    logPrefix[i + 1] = logPrefix[i] + Math.log(nums[i]);
  }

  const logk = Math.log(k);
  let ret = 0;
  for (let j = 0; j < n; j++) {
    let l = 0;
    let r = j + 1;
    let idx = j + 1;
    const val = logPrefix[j + 1] - logk + 1e-10;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      if (logPrefix[mid] > val) {
        idx = mid;
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }
    ret += j + 1 - idx;
  }
  return ret;
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(n)
