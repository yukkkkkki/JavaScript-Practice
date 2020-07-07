// 给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。

// 请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

// 你可以假设 nums1 和 nums2 不会同时为空。

// 示例 1:
// nums1 = [1, 3]
// nums2 = [2]
// 则中位数是 2.0

// 示例 2:
// nums1 = [1, 2]
// nums2 = [3, 4]
// 则中位数是 (2 + 3)/2 = 2.5

// 方法一：合并有序数组
// 用两个pointer（i，j），i 从数组A起始位置开始，即i=0开始，j 从数组B起始位置， 即j=0开始.
// 一一比较 A[i] 和 B[j],
//     1. 如果A[i] <= B[j], 则把A[i] 放入新的数组中，i往后移一位，即 i+1.
//     2. 如果A[i] > B[j], 则把B[j] 放入新的数组中，j往后移一位，即 j+1.
//     重复步骤1 和 2，直到i移到A最后，或者j移到B最后。
//     如果j移动到B数组最后，那么直接把剩下的所有A依次放入新的数组中.
//     如果i移动到A数组最后，那么直接把剩下的所有B依次放入新的数组中.
var findMedianSortedArrays = function (nums1, nums2) {
  const merged = [];
  let i = 0,
    j = 0;
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      merged.push(nums1[i++]);
    } else {
      merged.push(nums2[j++]);
    }
  }
  while (i < nums1.length) {
    merged.push(nums1[i++]);
  }

  while (j < nums2.length) {
    merged.push(nums2[j++]);
  }

  const { length } = merged;
  return length % 2 === 1
    ? merged[Math.floor(length / 2)]
    : (merged[length / 2] + merged[length / 2 - 1]) / 2;
};
// 时间复杂度：O(m+n); 空间复杂度： O(m+n)

// 方法二：二分查找
// 对数组长度小的做二分，保证数组A 和 数组B 做partition 之后
// len(Aleft)+len(Bleft)=(m+n+1)/2 - m是数组A的长度， n是数组B的长度
// 对数组A的做partition的位置是区间[0,m]

// partition后 A左边最大(maxLeftA), A右边最小（minRightA), B左边最大（maxLeftB), B右边最小（minRightB) 满足
// (maxLeftA <= minRightB && maxLeftB <= minRightA)
// 有了这两个条件，那么median就在这四个数中，根据奇数或者是偶数，
// 奇数：
// median = max(maxLeftA, maxLeftB)
// 偶数：
// median = (max(maxLeftA, maxLeftB) + min(minRightA, minRightB)) / 2WW
var findMedianSortedArrays = function (nums1, nums2) {
  // make sure to do binary search for shorten array
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }
  const m = nums1.length;
  const n = nums2.length;
  let low = 0;
  let high = m;
  while (low <= high) {
    const i = low + Math.floor((high - low) / 2);
    const j = Math.floor((m + n + 1) / 2) - i;

    const maxLeftA = i === 0 ? -Infinity : nums1[i - 1];
    const minRightA = i === m ? Infinity : nums1[i];
    const maxLeftB = j === 0 ? -Infinity : nums2[j - 1];
    const minRightB = j === n ? Infinity : nums2[j];

    if (maxLeftA <= minRightB && minRightA >= maxLeftB) {
      return (m + n) % 2 === 1
        ? Math.max(maxLeftA, maxLeftB)
        : (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2;
    } else if (maxLeftA > minRightB) {
      high = i - 1;
    } else {
      low = low + 1;
    }
  }
};
// 时间复杂度：O(log(min(m,n))); 空间复杂度：O(log(min(m,n)))

// 对nums1进行二分，找到nums1的中位数
// 要满足L1 < R2 && L2 < R1，直到找到合适的中位数

// 若两数组之和为奇数，中位数即所找到的两个中位数中最大的那个
// 否则是(Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2
