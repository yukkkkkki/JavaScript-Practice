/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
// 方法一：桶
var containsNearbyAlmostDuplicate = function (nums, k, t) {
  const n = nums.length;
  const mp = new Map();

  for (let i = 0; i < n; i++) {
    const x = nums[i];
    const id = getID(x, t + 1);

    if (mp.has(id)) return true;
    if (mp.has(id - 1) && Math.abs(x - mp.get(id - 1)) <= t) {
      return true;
    }
    if (mp.has(id + 1) && Math.abs(x - mp.get(id + 1)) <= t) {
      return true;
    }

    mp.set(id, x);
    if (i >= k) {
      mp.delete(getID(nums[i - k], t + 1));
    }
  }
  return false;
};
const getID = (x, w) => {
  return x < 0 ? Math.floor((x + 1) / w) - 1 : Math.floor(x / w);
};
// 时间复杂度：O(n)
// 空间复杂度：O(min(n,k))
