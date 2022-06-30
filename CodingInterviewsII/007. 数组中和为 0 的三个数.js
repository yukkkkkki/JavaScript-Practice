/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 方法一：排序 + 双指针
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  const res = [];

  for (let i = 0; i < nums.length - 2; i++) {
    let n1 = nums[i];
    if (n1 > 0) break;
    if (n1 === nums[i - 1] && i > 0) continue;

    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      let n2 = nums[l];
      let n3 = nums[r];

      if (n1 + n2 + n3 === 0) {
        res.push([n1, n2, n3]);

        // 跳过重复的数
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
