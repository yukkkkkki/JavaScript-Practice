// 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

// 说明:
//     初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
//     你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

// 示例:
// 输入:
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6],       n = 3
// 输出: [1,2,2,3,5,6]

// 方法一：归并排序
// 思路：归并排序会开辟一个长度为nums1 + nums2的空间，用两个指针遍历两个数组，把小的放到新数组里
// 沿用归并排序的思路，用三个指针
// 先比较较大的数，只需要把大的数放到数组nums1的后面即可
// 如果先从小的比较，需要把数组nums1的所有数往后挪一位，时间复杂度较高
var merge = function (nums1, m, nums2, n) {
  let index1 = m - 1,
    index2 = n - 1,
    tail = m + n - 1;
  while (index2 >= 0) {
    if (nums1[index1] > nums2[index2]) {
      nums1[tail] = nums1[index1];
      index1--;
      tail--;
    } else {
      nums1[tail] = nums2[index2];
      index2--;
      tail--;
    }
  }
  return nums1;
};

// 方法二
var merge = function (nums1, m, nums2, n) {
  let length = m + n;
  while (n > 0) {
    if (m <= 0) {
      nums1[--length] = nums2[--n];
      continue;
    }
    nums1[--length] = nums1[m - 1] >= nums2[n - 1] ? nums1[--m] : nums2[--n];
  }
  return nums1;
};

// 方法三
var merge = function (nums1, m, nums2, n) {
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i];
  }
  nums1.sort((a, b) => a - b);
};
