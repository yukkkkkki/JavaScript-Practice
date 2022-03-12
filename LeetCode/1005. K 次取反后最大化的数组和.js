/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 方法一：
// 从小到大修改每个负数 且优先修改最小的负数
//   如果数组中存在 0，那么我们可以对它进行多次修改，直到把剩余的修改次数用完；
//   如果数组中不存在 0 并且剩余的修改次数是偶数，由于对同一个数修改两次等价于不进行修改，因此我们也可以在不减小数组的和的前提下，把修改次数用完；
//   如果数组中不存在 0 并且剩余的修改次数是奇数，那么我们必然需要使用单独的一次修改将一个正数变为负数（剩余的修改次数为偶数，就不会减小数组的和）。
//   为了使得数组的和尽可能大，我们就选择那个最小的正数。
// 注意：在之前将负数修改为正数的过程中，可能出现了（相较于原始数组中最小的正数）更小的正数，这一点不能忽略。

// 对数组进行升序排序 首先依次遍历每一个负数（将负数修改为正数），再遍历所有的数（将 0 或最小的正数进行修改）
// 然而注意到本题中数组元素的范围为 [-100, 100]，因此我们可以使用计数数组（桶）或者哈希表
// 直接统计每个元素出现的次数，再升序遍历元素的范围，这样就省去了排序需要的时间。
var largestSumAfterKNegations = function (nums, k) {
  const freq = new Map();
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  let ans = _.sum(nums);

  for (let i = -100; i < 0; ++i) {
    if (freq.has(i)) {
      const ops = Math.min(k, freq.get(i));
      ans += -i * ops * 2;
      freq.set(i, freq.get(i) - ops);
      freq.set(-i, (freq.get(-i) || 0) + ops);
      k -= ops;
      if (k === 0) break;
    }
  }

  if (k > 0 && k % 2 === 1 && !freq.has(0)) {
    for (let i = 1; i <= 100; ++i) {
      if (freq.has(i)) {
        ans -= i * 2;
        break;
      }
    }
  }
  return ans;
};

// 方法二：先排序 后遍历 维护一个变量存储绝对值最小的元素
// 最后判断 K 是否有盈余
var largestSumAfterKNegations = function (nums, k) {
  let min = Number.MAX_VALUE;
  let sum = 0;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i += 1) {
    min = Math.min(min, Math.abs(nums[i]));
    if (k && nums[i] < 0) {
      k--;
      sum -= nums[i];
    } else {
      sum += nums[i];
    }
  }
  return k % 2 === 0 ? sum : sum - 2 * min;
};
