/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
var kSmallestPairs = function (nums1, nums2, k) {
  const m = nums1.length;
  const n = nums2.length;

  /* 二分查找第 k 小的数对和的大小 */
  let left = nums1[0] + nums2[0];
  let right = nums1[m - 1] + nums2[n - 1];
  let pairSum = right;
  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    let cnt = 0;
    let start = 0;
    let end = n - 1;
    while (start < m && end >= 0) {
      if (nums1[start] + nums2[end] > mid) {
        end--;
      } else {
        cnt += end + 1;
        start++;
      }
    }

    if (cnt < k) {
      left = mid + 1;
    } else {
      pairSum = mid;
      right = mid - 1;
    }
  }

  const ans = [];
  let pos = n - 1;
  /* 找到小于目标值 pairSum 的数对 */
  for (let i = 0; i < m; i++) {
    while (pos >= 0 && nums1[i] + nums2[pos] >= pairSum) {
      pos--;
    }
    for (let j = 0; j <= pos && k > 0; j++, k--) {
      const list = [];
      list.push(nums1[i]);
      list.push(nums2[j]);
      ans.push(list);
    }
  }

  /*找到等于目标值 pairSum 的数对*/
  pos = n - 1;
  for (let i = 0; i < m && k > 0; i++) {
    let start1 = i;
    while (i < m - 1 && nums1[i] == nums1[i + 1]) {
      i++;
    }
    while (pos >= 0 && nums1[i] + nums2[pos] > pairSum) {
      pos--;
    }
    let start2 = pos;
    while (pos > 0 && nums2[pos] == nums2[pos - 1]) {
      pos--;
    }
    if (nums1[i] + nums2[pos] != pairSum) {
      continue;
    }
    let count = Math.min(k, (i - start1 + 1) * (start2 - pos + 1));
    for (let j = 0; j < count && k > 0; j++, k--) {
      const list = [];
      list.push(nums1[i]);
      list.push(nums2[pos]);
      ans.push(list);
    }
  }
  return ans;
};
// 时间复杂度：O(k + (m + n) x log(diff(nums1) + diff(nums2)))
// 空间复杂度：O(1)
