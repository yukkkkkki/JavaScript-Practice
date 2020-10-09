// 数组中占比超过一半的元素称之为主要元素。给定一个整数数组，找到它的主要元素。若没有，返回-1。

// 示例 1：
// 输入：[1,2,5,9,5,9,5,5,5]
// 输出：5
//

// 示例 2：
// 输入：[3,2]
// 输出：-1
//

// 示例 3：
// 输入：[2,2,1,1,1,2,2]
// 输出：2

/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：Map
var majorityElement = function (nums) {
  const n = nums.length;
  const map = new Map();
  for (let i = 0; i < n; i++) {
    if (map.has(nums[i])) {
      map.set(nums[i], map.get(nums[i]) + 1);
    } else {
      map.set(nums[i], 1);
    }
  }

  for (let key of map.keys()) {
    if (map.get(key) > Math.floor(n / 2)) {
      return key;
    }
    // console.log(map.get(item));
  }
  return -1;
};

// 方法二：一次遍历
var majorityElement = function (nums) {
  const n = nums.length;
  if (n == 0) return -1;
  let count = 0,
    num = -1;
  for (let item of nums) {
    if (count == 0) {
      num = item;
      count++;
    } else {
      if (item == num) count++;
      else count--;
    }
  }
  return count == 0 ? -1 : num;
};
// console.log(majorityElement([1, 2, 5, 9, 5, 9, 5, 5, 5]));
