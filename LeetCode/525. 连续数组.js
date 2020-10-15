// 给定一个二进制数组, 找到含有相同数量的 0 和 1 的最长连续子数组（的长度）。

// 示例 1:
// 输入: [0,1]
// 输出: 2
// 说明: [0, 1] 是具有相同数量0和1的最长连续子数组。

// 示例 2:
// 输入: [0,1,0]
// 输出: 2
// 说明: [0, 1] (或 [1, 0]) 是具有相同数量0和1的最长连续子数组。

/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：暴力法
var findMaxLength = function (nums) {
  let maxLen = 0;
  for (let start = 0; start < nums.length; start++) {
    let zeros = 0,
      ones = 0;
    for (let end = start; end < nums.length; end++) {
      if (nums[end] == 0) {
        zeros++;
      } else {
        ones++;
      }
      if (zeros == ones) {
        maxLen = Math.max(maxLen, end - start + 1);
      }
    }
  }
  return maxLen;
};
// 时间复杂度：O(n^2)；空间复杂度：O(1)

// 方法二：使用额外的数组
// 思路：
// 使用一个变量count，用来保存遍历数组过程中到目前为止遇到的0和1的相对数量
// 遇到1的时候，count += 1，遇到0的时候， count -= 1
// 若我们在遍历数组的过程中，遇到了相同的count 2次，这意味着这两个位置之间0和1的数目一样多
var findMaxLength = function (nums) {
  const arr = new Array(2 * nums.length + 1);
  arr.fill(-2);
  arr[nums.length] = -1;
  let maxLen = 0,
    count = 0;
  for (let i = 0; i < nums.length; i++) {
    count = count + (nums[i] == 0 ? -1 : 1);
    if (arr[count + nums.length] >= -1) {
      maxLen = Math.max(maxlen, i - arr[count + nums.length]);
    } else {
      arr[count + nums.length] = i;
    }
  }
  return maxLen;
};
// 时间复杂度：O(n)；空间复杂度：O(1)

// 方法三：HashMap
var findMaxLength = function (nums) {
  const map = new Map();
  map.set(0, -1);
  let maxLen = 0,
    count = 0;
  for (let i = 0; i < nums.length; i++) {
    count = count + (nums[i] == 1 ? 1 : -1);
    if (map.has(count)) {
      maxLen = Math.max(maxLen, i - map.get(count));
    } else {
      map.set(count, i);
    }
  }
  return maxLen;
};
