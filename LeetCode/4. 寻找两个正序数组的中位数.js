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

// 方法二：二分查找 + 分段
// 合并后的有序数组可以分成两部分，左边比中位数小，右边比它大
// 总长度 len 可求，左边部分的长度也可以求：(len + 1) >> 1
// 我们观察左边，它是由 nums1 和 nums2 中前排较小的数组成
// 我们假设来源于 nums1 的左分段的长度为 partLen1 ，剩下的就是来源于 nums2 左分段，长度是 ((len + 1) >> 1) - partLen1

// 中位数由什么产生:
// nums1 左分段的最右项，叫 L1，nums2 左分段的最右项，叫 L2，nums1 右分段的最左项叫 R1，nums2 右分段的最左项叫 R2
// 只要求出 partLen1 ，这些项都能确定，它们确定了，中位数就能确定：
//    如果 len 是偶数，中位数等于 (Math.max(L1, L2) + Math.min(R1, R2)) / 2 ，
//    如果是奇数，中位数等于Math.max(L1, L2)

// 求 partLen1 呢：在 nums1 把 partLen1 当做中位数求
// nums1 数组是有序的，用二分查找，找出中位数
// 这个中位数可能不是想要的 partLen1，可能在这个中位数左边或右边
// 什么时候才是想要的？要满足 L1 <= R2 && L2 <= R1
// 为什么？因为根据有序性，L1 是必定小于 L2，R1 是必定小于 R2 ，L1 和 L2 是处于合并后数组的左边的，它必然小于右侧的 R2 和 R1
// 二分查找的过程中满足该条件，就可以根据L1、L2、R2和R1求出中位数
// 如果不满足，就要移动指针，继续二分，直到找出满足条件的 L1、L2、R2、R1
var findMedianSortedArrays = function (nums1, nums2) {
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }
  const m = nums1.length;
  const n = nums2.length;
  let len = m + n;
  let start = 0,
    end = m;
  while (start <= end) {
    const i = (start + end) >> 1; // 左分段里nums1的长度
    const j = ((len + 1) >> 1) - i; // 左分段里nums2的长度

    const maxLeftA = i === 0 ? -Infinity : nums1[i - 1];
    const minRightA = i === m ? Infinity : nums1[i];
    const maxLeftB = j === 0 ? -Infinity : nums2[j - 1];
    const minRightB = j === n ? Infinity : nums2[j];

    if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
      return (m + n) % 2 === 1
        ? Math.max(maxLeftA, maxLeftB)
        : (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2;
    } else if (maxLeftA > minRightB) {
      // 说明大了，nums1的right往左来
      end = i - 1;
    } else {
      start = start + 1;
    }
  }
};
// 对nums1做二分查找，时间复杂度是O(log(n))，n是nums1的长度
