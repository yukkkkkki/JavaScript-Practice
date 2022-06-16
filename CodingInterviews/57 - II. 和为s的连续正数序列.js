/**
 * @param {number} target
 * @return {number[][]}
 */
// 方法一：滑动窗口
// 滑动窗口框架
// let left = 0, right = 0;
// while (right < s.size()) {
//     // 增大窗口
//     window.add(s[right]);
//     right++;

//     while (window needs shrink) {
//         // 缩小窗口
//         window.remove(s[left]);
//         left++;
//     }
// }
// 滑动窗口只有 右边界向右移动（扩大窗口） 和 左边界向右移动（缩小窗口） 两个操作
var findContinuousSequence = function (target) {
  let left = 1;
  let right = 1;
  let total = 0;
  let result = [];

  while (left <= target / 2) {
    if (total < target) {
      // 右窗口往右扩充
      total += right;
      right++;
    } else if (total > target) {
      // 左窗口往右移动，缩小滑动窗口
      target -= left;
      left++;
    } else {
      // 此时滑动窗口内数值总和等于 target, 返回当前滑动窗口数组
      let arr = [];
      for (let i = left; i < right; i++) {
        arr.push(i);
      }
      result.push(arr);
      total -= left;
      // 收录完当前滑动窗口数组后，右指针往右移动扩充即可
      left++;
    }
  }
  return result;
};

// 方法二：滑动窗口
/**
 * @param {number} target
 * @return {number[][]}
 */
// 没有参照物数组 但是可以根据下标
// 滑动窗口（双指针）
var findContinuousSequence = function (target) {
  let left = 1;
  let right = 2;
  let sum = 3;
  const res = [];

  // 滑动窗口框架
  while (left < right) {
    if (sum > target) {
      // 大于 target 则缩小窗口
      // sum 已经加过了
      sum = sum - left;
      left++;
    } else if (sum < target) {
      // 小于 target 则滑动窗口继续扩大
      right++;
      sum = sum + right;
    } else {
      // sum === target 时
      let ans = [];
      for (let k = left; k <= right; k++) {
        ans[k - left] = k;
      }
      res.push(ans);
      // 继续窗口往右搜索 同时缩小左边
      sum = sum - left;
      left++;
    }
  }

  return res;
};
