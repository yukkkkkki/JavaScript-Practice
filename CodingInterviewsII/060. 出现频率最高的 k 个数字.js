/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// 方法一：map + 转二维数组
var topKFrequent = function (nums, k) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (!map.has(nums[i])) {
      map.set(nums[i], 1);
    } else {
      map.set(nums[i], map.get(nums[i]) + 1);
    }
  }

  // 将map转换为二维数组，对二维数组的第二个值进行排序
  let arr = Array.from(map);
  arr.sort((a, b) => b[1] - a[1]);

  let res = [];
  for (let i = 0; i < k; i++) {
    res.push(arr[i][0]);
  }
  return res;
};
