/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 方法一：二分查找
// 计算子数组 [i, j] 的元素乘积 \prod_{l=i}^{j} {nums}[l]时，会出现整型溢出的情况
// 为了避免整型溢出，将不等式两边取对数
var numSubarrayProductLessThanK = function (nums, k) {
  // 当 k === 0
  // 由于元素均为正数，所有子数组乘积均大于 0，因此乘积小于 0 的子数组的数目为 0。
  if (k === 0) return 0;
  const n = nums.length;

  const logPrefix = new Array(n + 1).fill(0);
  // 预处理出数组的元素对数前缀和 logPrefix，即 logPrefix[i+1]= sum_{l=0}^{i} \log {nums}[l]
  for (let i = 0; i < n; i++) {
    logPrefix[i + 1] = logPrefix[i] + Math.log(nums[i]);
  }
  const logK = Math.log(k);

  // 在 logPrefix 的区间 [0, j] 内二分查找满足 logPrefix[j + 1] − logPrefix[l] < logk，即 logPrefix[l] > logPrefix[j + 1] − logk 的最小下标 l
  // 那么以 j 为右端点且元素乘积小于 k 的子数组数目为 j + 1 - l
  let res = 0;
  for (let j = 0; j < n; j++) {
    let l = 0,
      r = j + 1;
    let idx = j + 1;
    let val = logPrefix[j + 1] - logK + 1e-10;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      if (logPrefix[mid] > val) {
        idx = mid;
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }
    res += j + 1 - idx;
  }
  return res;
};
// 时间复杂度：O(nlogn)
// 空调复杂度：O(n)

// 方法二：滑动窗口
var numSubarrayProductLessThanK = function (nums, k) {
  const n = nums.length;
  let res = 0;
  let prod = 1;
  let i = 0;
  // 枚举子数组的右端点 j
  for (let j = 0; j < n; j++) {
    // 左端点从 i = 0 开始，用 prod 记录子数组 [i, j] 的元素乘积
    prod *= nums[j];
    // 如果当前子数组元素乘积 prod >= k
    while (i <= j && prod >= k) {
      // 右移 i 直到满足 prod < k or i > j
      prod /= nums[i];
      i++;
    }
    res += j - i + 1;
  }

  return res;
};
// 时间复杂度：O(n)
// 空调复杂度：O(1)
