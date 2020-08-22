// 假设按照升序排序的数组在预先未知的某个点上进行了旋转。

// ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。

// 搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

// 你可以假设数组中不存在重复的元素。

// 你的算法时间复杂度必须是 O(log n) 级别。

// 示例 1:
// 输入: nums = [4,5,6,7,0,1,2], target = 0
// 输出: 4

// 示例 2:
// 输入: nums = [4,5,6,7,0,1,2], target = 3
// 输出: -1

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

// 方法二：二分查询最大值最小值
// 先算出 数组中最大最小值，利用 indexOf 计算之后要旋转位置，然后二分计算目标 target 位置
// 1. 计算数组中的最大最小值
// 2. 定义变量，数组长度等
// 3. 目标值大于数组最后一位时，数组查询位置从 0 到数字中在最大位置
// 4. 目标值小于等于数组最后一位时，数组查询位置从数组中最小值的位置开始，到数组的最后一位，3.4 两部为了定位数组查询区间
// 5. 循环二分查询，计算定位数组的中间值，数组的值等于目标查询结束
// 6. 不等于的情况，如果目标大于中间值，则定位数组最小值等于中间值+1，目标小于中间值，则
// 定位数组中最大值等于中间值-1，继续循环查询即可，知道定位数组查询完毕，没有结果的
// 话，返回 -1 代表不存在
var search = function (nums, target) {
  const min = Math.min.apply(null, nums);
  const max = Math.max.apply(nums, nums);
  const len = nums.length;
  let pos;
  let lo;
  let hi;
  let mid;
  if (target > nums[len - 1]) {
    // 说明在max左侧
    pos = nums.indexOf(max);
    lo = 0;
    hi = pos;
  } else {
    // 说明在min右侧
    pos = nums.indexOf(min);
    lo = pos;
    hi = len - 1;
  }

  while (lo <= hi) {
    mid = Math.ceil((lo + hi) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return -1;
};
// 时间复杂度：O(log(n)); 空间复杂度：O(1)

// 方法三：二分查询中间数
// 1. 计算数组长度，数组为0 直接返回-1
// 2. 定义左右值分别为数组第一个和最后一个的下标
// 3. 中间下标值为最大最小值的平均数
// 4. 如果数组中间数等于目标直接返回下标
// 5. 数组的中间值小于数组最后一个值，后半部分还处于升序，如果目标值在这部分数组中，则左
// 下标等于中间值+1，代表目标值在后半部分数组，反着重新定义右下标为中间值-1，目标在前
// 半数组
// 6. 数组中间值大于数组最后一个值，代表前半部分数组处于升序，如果目标在前半数组中，右标
// 更新为中间值-1，反之，左下标更新为中间值+1
// 7. 二分查询到最后没找到目标值，则返回 -1 代表不存在
var search = function (nums, target) {
  // 根据数组的中间数和左右节点的大小对比，来确定升序部分的位置，然后用二分法查询目标节点在数组中的位置
  if (nums.length === 0) return -1;
  let left = 0;
  let right = nums.length - 1;
  let mid;

  while (left <= right) {
    mid = parseInt((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < nums[right]) {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    } else {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }
  return -1;
};
// 时间复杂度：O(log(n)); 空间复杂度：O(1)
