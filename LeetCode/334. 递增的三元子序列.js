// 给定一个未排序的数组，判断这个数组中是否存在长度为 3 的递增子序列。

// 数学表达式如下:

// 如果存在这样的 i, j, k,  且满足 0 ≤ i < j < k ≤ n-1，
// 使得 arr[i] < arr[j] < arr[k] ，返回 true ; 否则返回 false 。
// 说明: 要求算法的时间复杂度为 O(n)，空间复杂度为 O(1) 。

// 示例 1:
// 输入: [1,2,3,4,5]
// 输出: true

// 示例 2:
// 输入: [5,4,3,2,1]
// 输出: false

/**
 * @param {number[]} nums
 * @return {boolean}
 */

// 方法一：动态规划
var increasingTriplet = function (nums) {
  let longest = [],
    count;
  for (let i = 0; i < nums.length; i++) {
    count = 1;
    for (let j = 0; j < longest.length; j++) {
      if (nums[i] > nums[j] && count <= longest[j]) {
        count = longest[j] + 1;
      }
    }
    longest.push(count);
    if (count >= 3) return true;
  }
  return false;
};

// console.log(increasingTriplet([1, 2, 3, 4, 5]));

// 方法二：双向遍历
// 在 nums[i] 的左边存在一个元素小于 nums[i] 等价于在 nums[i] 的左边的最小元素小于 nums[i]
// 在 nums[i] 的右边存在一个元素大于 nums[i] 等价于在 nums[i] 的右边的最大元素大于 nums[i]
// 因此可以维护数组 nums 中的每个元素左边的最小值和右边的最大值

// 创建两个长度为 n 的数组 leftMin 和 rightMax
// 对于 0 ≤ i < n，leftMin[i] 表示 nums[0] 到 nums[i] 中的最小值，rightMax[i] 表示 nums[i] 到 nums[n−1] 中的最大值
// 数组 leftMin 的计算方式如下：
// leftMin[0] = nums[0]；
// 从左到右遍历数组 nums，对于 1 ≤ i < n，leftMin[i] = min(leftMin[i−1], nums[i])
// 数组 rightMax 的计算方式如下：
// rightMax[n−1] = nums[n−1]；
// 从右到左遍历数组 nums，对于 0 ≤ i < n−1，rightMax[i] = max(rightMax[i+1], nums[i])
var increasingTriplet = function (nums) {
  const n = nums.length;
  if (n < 3) return false;

  const leftMin = new Array(n).fill(0);
  leftMin[0] = nums[0];
  for (let i = 1; i < n; i++) {
    leftMin[i] = Math.min(leftMin[i - 1], nums[i]);
  }

  const rightMax = new Array(n).fill(0);
  rightMax[n - 1] = nums[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], nums[i]);
  }

  for (let i = 1; i < n - 1; i++) {
    if (nums[i] > leftMin[i - 1] && nums[i] < rightMax[i + 1]) {
      return true;
    }
  }

  return false;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法三：贪心
// 从左到右遍历数组 nums，遍历过程中维护两个变量 first 和 second，分别表示递增的三元子序列中的第一个数和第二个数，任何时候都有 first<second。
// 初始时，first = nums[0]，second = +∞。对于 1 ≤ i < n，当遍历到下标 i 时，令 num = nums[i]，进行如下操作：
// 如果 num > second，则找到了一个递增的三元子序列，返回 true
// 否则，如果 num > first，则将 second 的值更新为 num
// 否则，将 first 的值更新为 num
// 如果遍历结束时没有找到递增的三元子序列，返回 false
var increasingTriplet = function (nums) {
  const n = nums.length;
  if (n < 3) return false;

  let first = nums[0];
  let second = Number.MAX_VALUE;
  for (let i = 1; i < n; i++) {
    const num = nums[i];
    if (num > second) {
      return true;
    } else if (num > first) {
      second = num;
    } else {
      first = num;
    }
  }
  return false;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)