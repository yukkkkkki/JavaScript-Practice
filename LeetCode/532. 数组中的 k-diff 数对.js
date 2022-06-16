/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 方法一：哈希表
var findPairs = function (nums, k) {
  const visited = new Set();
  const res = new Set();
  for (const num of nums) {
    // 判断 j 左侧是否有满足条件的 i 来构成 k-diff 数对
    if (visited.has(num - k)) {
      res.add(num - k);
    }
    if (visited.has(num + k)) {
      res.add(num);
    }
    visited.add(num);
  }
  return res.size;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 方法二：排序 + 双指针
// 将原数组升序排序，并用新的指针 x 和 y 来搜索数对，即寻找不同的 (nums[x], nums[y]) 满足：
// - x < y
// - nums[x] + k = nums[y]
// 记录满足要求的 x 的个数并返回。
var findPairs = function (nums, k) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let res = 0;

  let y = 0;
  for (let x = 0; x < n; x++) {
    if (x === 0 || nums[x] !== nums[x - 1]) {
      while (y < n && (nums[y] < nums[x] + k || y <= x)) {
        y++;
      }
      if (y < n && nums[y] === nums[x] + k) {
        res++;
      }
    }
  }

  return res;
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(logn)
