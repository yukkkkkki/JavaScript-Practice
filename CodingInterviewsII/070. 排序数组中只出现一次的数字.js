/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：全数组的二分查找
// 假设只出现一次的元素位于下标 x，由于其余每个元素都出现两次，因此下标 x 的左边和右边都有偶数个元素，数组的长度是奇数
// 由于数组是有序的，因此数组中相同元素一定相邻
// 对于下标 x 左边的下标 y，如果 nums[y] = nums[y + 1]，则 y 一定是偶数
// 对于下标 x 右边的下标 z，如果 nums[z] = nums[z + 1]，则 z 一定是奇数
// x 是相同元素的开始下标的奇偶性的分界
var singleNonDuplicate = function (nums) {
  let low = 0;
  let high = nums.length - 1;

  while (low < high) {
    let mid = Math.floor((high - low) / 2) + low;
    // ^ 按位异或
    // 当 mid 是偶数时，mid + 1 = mid ^ 1
    // 当 mid 是奇数时，mid - 1 = mid ^ 1
    if (nums[mid] === nums[mid ^ 1]) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return nums[low];
};
// 时间复杂度：O(logn)
// 空间复杂度：O(1)

// 方法二：偶数下标的二分查找
// 由于只出现一次的元素所在下标 x 的左边有偶数个元素，因此下标 x 一定是偶数，可以在偶数下标范围内二分查找
var singleNonDuplicate = function (nums) {
  let low = 0;
  let high = nums.length - 1;

  while (low < high) {
    // 如果 mid 是奇数则将 mid 减 1，确保 mid 是偶数
    let mid = Math.floor((high - low) / 2) + low;
    // & 按位与运算
    // 当 mid 是偶数时，mid & 1 = 0
    // 当 mid 是奇数时，mid & 1 = 1
    mid -= mid & 1;

    if (nums[mid] === nums[mid + 1]) {
      // 相等则 mid < x，调整左边界
      low = mid + 2;
    } else {
      // mid ≥ x，调整右边界
      high = mid;
    }
  }

  return nums[low];
};
// 时间复杂度：O(logn)
// 空间复杂度：O(1)
