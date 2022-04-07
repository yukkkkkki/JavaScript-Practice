/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：位运算
var countMaxOrSubsets = function (nums) {
  let maxOr = 0,
    cnt = 0;
  for (let i = 0; i < 1 << nums.length; i++) {
    let orVal = 0;
    for (let j = 0; j < nums.length; j++) {
      if (((i >> j) & 1) === 1) {
        orVal |= nums[j];
      }
    }
    if (orVal > maxOr) {
      maxOr = orVal;
      cnt = 1;
    } else if (orVal === maxOr) {
      cnt++;
    }
  }
  return cnt;
};
