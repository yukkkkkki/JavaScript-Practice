/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：贪心
// 要保证所有的累加和 accSum 满足 accSum + startValue ≥ 1
// 只需保证累加和的最小值 accSumMin 满足 accSumMin + startValue ≥ 1
var minStartValue = function (nums) {
  let accSum = 0;
  let accSumMin = 0;

  for (const num of nums) {
    accSum += num;
    accSumMin = Math.min(accSum, accSumMin);
  }

  return 1 - accSumMin;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 方法二：二分查找
var minStartValue = function (nums) {
  const m = _.min(nums);
  if (m >= 0) return 1;

  let left = 1;
  let right = -m * nums.length + 1;
  while (left < right) {
    const medium = Math.floor((left + right) / 2);
    if (valid(medium, nums)) {
      right = medium;
    } else {
      left = medium + 1;
    }
  }

  return left;
};
const valid = (startValue, nums) => {
  for (const num of nums) {
    startValue += num;
    if (startValue <= 0) return false;
  }

  return true;
};
// 时间复杂度：O(n x log(mn))
// 空间复杂度：O(1)
