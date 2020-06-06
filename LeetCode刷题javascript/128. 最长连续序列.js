// 给定一个未排序的整数数组，找出最长连续序列的长度。

// 要求算法的时间复杂度为 O(n)。

// 示例:
// 输入: [100, 4, 200, 1, 3, 2]
// 输出: 4
// 解释: 最长连续序列是 [1, 2, 3, 4]。它的长度为 4。

// 方法一：排序
var longestConsecutive = function (nums) {
  if (nums.length === 0) return 0;
  nums.sort((a, b) => a - b);
  let max = 1,
    count = 1;
  for (let i = 0; i < nums.length - 1; i++) {
    let cur = i,
      next = i + 1;
    if (nums[cur] === nums[next]) continue; // 相同就跳过本次循环
    if (nums[cur] + 1 === nums[next]) {
      count++;
    } else {
      count = 1;
    }
    max = Math.max(max, count);
  }
  return max;
}

// 方法二：Set()的查找
var longestConsecutive = function (nums) {
  const s = new Set(nums);
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    if (!s.has(nums[i] - 1)) {
      let cur = nums[i];
      let count = 1;
      while (s.has(cur + 1)) {
        cur++;
        count++;
      }
      max = Math.max(max, count);
    }
  }
  return max;
}

// 方法三：哈希表
var longestConsecutive = function (nums) {
  let map = new Map();
  let max = 0;
  for (let num of nums) {
    if (!map.has(num)) { // 重复的数字不考虑，跳过

      let preLen = map.get(num - 1) || 0; // 获取左邻居所在序列的长度            
      let nextLen = map.get(num + 1) || 0; // 获取右邻居所在序列的长度
      let curLen = preLen + 1 + nextLen; // 新序列的长度

      map.set(num, curLen); // 将自己存入 map              
      max = Math.max(max, curLen);
      map.set(num - preLen, curLen);
      map.set(num + nextLen, curLen);
    }
  }
  return max;
};

// 参考链接： https: //leetcode-cn.com/problems/longest-consecutive-sequence/solution/fang-fa-cong-yi-dao-nan-bing-cha-ji-fang-fa-bu-hui/