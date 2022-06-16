/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 方法一
var isStraight = function (nums) {
  nums.sort((a, b) => a - b);
  // 0 的个数,第一个非 0 的坐标
  let zero = nums.lastIndexOf(0) + 1;
  let count = 0;
  const n = nums.length;

  for (let i = zero; i < n - 1; i++) {
    let cut = nums[i + 1] - nums[i] - 1;
    // 这里等于 - 1代表两个数相等的，那肯定不是顺子
    if (cut == -1) return false;
    count += cut;
  }
  // 如果 0 >= 空缺的总数的个数，那么这个数组就是连续的；反之则不连续
  return zero >= count;
};

// 方法二
var isStraight = function (nums) {
  nums.sort((a, b) => a - b);
  let zeros = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === 0) {
      zeros++;
      continue;
    }
    if (nums[i + 1] === nums[i]) return false;
    if (nums[i + 1] - nums[i] > 1) {
      zeros -= nums[i + 1] - nums[i] - 1;
      if (zeros < 0) return false;
      continue;
    }
    if (nums[i + 1] !== nums[i] + 1) {
      return false;
    }
  }
  return true;
};
