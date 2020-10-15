// 给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数。

// 示例 1 :
// 输入:nums = [1,1,1], k = 2
// 输出: 2 , [1,1] 与 [1,1] 为两种不同的情况。

// 说明 :
// 数组的长度为 [1, 20,000]。
// 数组中元素的范围是 [-1000, 1000] ，且整数 k 的范围是 [-1e7, 1e7]。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 方法一：枚举
var subarraySum = function (nums, k) {
  let count = 0;
  for (let start = 0; start < nums.length; ++start) {
    let sum = 0;
    for (let end = start; end >= 0; --end) {
      sum += nums[end];
      if (sum == k) {
        count++;
      }
    }
  }
  return count;
};
// 时间复杂度：O(n^2); 空间复杂度：O(1)

// 方法二：前缀和 + 哈希表优化
// 思路
// pre[i] 为[0...i]里所有数的和，则pre[i]可以由pre[i - 1]递推而来
//      即 pre[i] = pre[i - 1] + nums[i]
// 那么「[j..i] 这个子数组和为 k 」这个条件我们可以转化为
//      pre[i] = pre[j - 1] == k
//      即 pre[j - 1] = pre[i] - k
// 建立哈希表 map
//     key：前缀和的值；value：该前缀和出现的次数
// 从左往右边更新 map 边计算答案，那么以 i 结尾的答案 map[pre[i]−k] 即可在 O(1) 时间内得到
// 最后的答案即为所有下标结尾的和为 k 的子数组个数之和。
var subarraySum = function (nums, k) {
  if (nums.length == 0) return 0;
  const map = new Map();
  map.set(0, 1);
  let count = 0,
    prefixSum = 0;
  for (const x of nums) {
    prefixSum += x;
    if (map.has(prefixSum - k)) {
      count += map.get(prefixSum - k);
    }
    if (map.has(prefixSum)) {
      map.set(prefixSum, map.get(prefixSum) + 1);
    } else {
      map.set(prefixSum, 1);
    }
  }
  return count;
};

// console.log(subarraySum([1, 1, 1], 2));
