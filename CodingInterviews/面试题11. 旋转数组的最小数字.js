// 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。

// 示例 1：
// 输入：[3,4,5,1,2]
// 输出：1

// 示例 2：
// 输入：[2,2,2,0,1]
// 输出：0

// 方法一：二分查找 找两个单增区间的边界
// nums[mid] > nums[right]
//     最小元素肯定在mid的右边，所以 left = mid + 1
// nums[mid] == nums[right]
//     此时 mid 可能处于左边区间，也可能处于右边区间，即最小元素不确定在它的左边还是右边
//     所以 right-- ，换一个 nums[right] 再试
// nums[mid] < nums[right]
//     此时 mid 肯定处在右边的增区间，所以 right = mid
// 时间复杂度：O(logn)
const minArray = (nums) => {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = (left + right) >>> 1;
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else if (nums[mid] == nums[right]) {
      right--;
    } else {
      right = mid;
    }
  }
  return nums[left];
};

// 直接用Math.min()
var minArray = function (numbers) {
  return Math.min(...numbers);
};
