// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。

// 示例：

// 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

// 满足要求的三元组集合为：
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

// 方法一：排序 + 双指针
// 思路：
// 层循环主指针 i 遍历数组。内层循环，双指针去寻找满足三数和 === 0 的项
// 排序的意义：
// 因为不能有重复的解，为简化操作，先对数组预排序
// 则我们判断一个元素是否重复，只需看它和它之前位置的元素是否相等即可

// 双指针移动时，避免出现重复解
// 得到一个解后，需要左右指针向“内”移动，为了避免指向重复的元素
// 左指针要在 left < right 的前提下，一直向右移动到不重复的元素上
// 右指针要在 left < right 的前提下，一直向左移动到不重复的元素上
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    let n1 = nums[i];
    if (n1 > 0) break;
    if (n1 == nums[i - 1] && i > 0) continue; // 遍历到重复的元素，跳过
    let left = i + 1,
      right = nums.length - 1;
    while (left < right) {
      let n2 = nums[left];
      let n3 = nums[right];
      if (n1 + n2 + n3 === 0) {
        res.push([n1, n2, n3]);
        while (left < right && nums[left] === n2) left++; // 直到指向不一样的数
        while (left < right && nums[right] === n3) right--;
      } else if (n1 + n2 + n3 < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return res;
};

// 参考作者：hyj8
// 链接：https://leetcode-cn.com/problems/3sum/solution/zhi-zhen-yi-dong-guo-cheng-zhong-tiao-guo-zhong-fu/
