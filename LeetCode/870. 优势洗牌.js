/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// 方法一：贪心算法
var advantageCount = function (nums1, nums2) {
  const n = nums1.length;
  const idx1 = new Array(n).fill(0);
  const idx2 = new Array(n).fill(0);
  for (let i = 0; i < n; ++i) {
    idx1[i] = i;
    idx2[i] = i;
  }
  idx1.sort((i, j) => nums1[i] - nums1[j]);
  idx2.sort((i, j) => nums2[i] - nums2[j]);

  let res = new Array(n).fill(0);
  let left = 0;
  let right = n - 1;
  // 使用一个循环依次遍历 nums1 中的每个元素
  for (let i = 0; i < n; i++) {
    // 如果 nums1 的首个元素可以增加「优势」
    if (nums1[idx1[i]] > nums2[idx2[left]]) {
      // 配对 left 对应的元素并向右移动一个位置
      res[idx2[left]] = nums1[idx1[i]];
      ++left;
    } else {
      // 否则配对 right 对应的元素并向左移动一个位置
      res[idx2[right]] = nums1[idx1[i]];
      --right;
    }
  }

  return res;
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(n)
