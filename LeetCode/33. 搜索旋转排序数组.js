/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 方法一：Map
var search = function (nums, target) {
  let m = new Map();
  for (let i = 0; i < nums.length; i++) {
    m.set(nums[i], i);
  }
  if (m.has(target)) {
    return m.get(target);
  }
  return -1;
};

// 方法二：二分查询中间数
var search = function (nums, target) {
  // 根据数组的中间数和左右节点的大小对比，来确定升序部分的位置，然后用二分法查询目标节点在数组中的位置
  if (nums.length === 0) return -1;
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = parseInt((left + right) / 2);

    if (nums[mid] === target) return mid;
    else if (nums[mid] < nums[right]) {
      // 代表后半部分还处于升序
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    } else {
      // 代表前半部分数组处于升序
      if (nums[left] <= target && target < nums[mid]) {
        // 如果目标在前半数组中
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }

  return -1;
};
// 时间复杂度：O(log(n));
// 空间复杂度：O(1)
