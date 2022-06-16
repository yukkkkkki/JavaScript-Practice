/**
 * @param {number[]} nums
 * @return {string}
 */
// 方法一：排序
// 通过参数将自定义的「排序依据」作为函数传入 sort 中，这个函数的逻辑是：
// 如果 a + b < b + a，说明 ab 比 ba 小，a 应该在 b 前面，返回-1
// 如果 a + b > b + a，说明 ab 比 ba 大，a 应该在 b 后面，返回 1
// 如果相等，返回 0
var minNumber = function (nums) {
  nums.sort((a, b) => {
    const s1 = a + '' + b;
    const s2 = b + '' + a;

    if (s1 < s2) return -1;
    if (s1 > s2) return 1;
    return 0;
  });
  return nums.join('');
};
