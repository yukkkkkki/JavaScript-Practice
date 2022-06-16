/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 方法一：排序 + 双指针
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
    // 遍历到重复的元素，跳过
    if (n1 == nums[i - 1] && i > 0) continue;

    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      let n2 = nums[l];
      let n3 = nums[r];
      if (n1 + n2 + n3 === 0) {
        res.push([n1, n2, n3]);

        // 直到指向不一样的数
        while (l < r && nums[l] === n2) {
          l++;
        }
        while (l < r && nums[r] === n3) {
          r--;
        }
      } else if (n1 + n2 + n3 < 0) {
        l++;
      } else {
        r--;
      }
    }
  }

  return res;
};
// 参考：https://leetcode-cn.com/problems/3sum/solution/zhi-zhen-yi-dong-guo-cheng-zhong-tiao-guo-zhong-fu/
