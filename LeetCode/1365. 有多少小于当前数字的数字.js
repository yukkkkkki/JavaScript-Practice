// 给你一个数组 nums，对于其中每个元素 nums[i]，请你统计数组中比它小的所有数字的数目。

// 换而言之，对于每个 nums[i] 你必须计算出有效的 j 的数量，其中 j 满足 j != i 且 nums[j] < nums[i] 。

// 以数组形式返回答案。

// 示例 1：
// 输入：nums = [8,1,2,2,3]
// 输出：[4,0,1,1,3]
// 解释：
// 对于 nums[0]=8 存在四个比它小的数字：（1，2，2 和 3）。
// 对于 nums[1]=1 不存在比它小的数字。
// 对于 nums[2]=2 存在一个比它小的数字：（1）。
// 对于 nums[3]=2 存在一个比它小的数字：（1）。
// 对于 nums[4]=3 存在三个比它小的数字：（1，2 和 2）。

// 示例 2：
// 输入：nums = [6,5,4,8]
// 输出：[2,1,0,3]

// 示例 3：
// 输入：nums = [7,7,7,7]
// 输出：[0,0,0,0]

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 方法一：暴力法
var smallerNumbersThanCurrent = function (nums) {
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    let count = 0;
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] < nums[i]) {
        count++;
      }
    }
    res.push(count);
  }
  return res;
};
// 时间复杂度：O(n^2)；空间复杂度：O(1)

// 方法二：快速排序
var smallerNumbersThanCurrent = function (nums) {
  const n = nums.length;
  let data = new Array(n).fill(0).map((item) => new Array(2).fill(0));
  for (let i = 0; i < n; ++i) {
    data[i] = [nums[i], i];
  }
  data.sort((a, b) => a[0] - b[0]);
  const res = new Array(n);
  let pre = -1;
  for (let i = 0; i < n; ++i) {
    if (pre == -1 || data[i][0] !== data[i - 1][0]) {
      pre = i;
    }
    res[data[i][1]] = pre;
  }
  return res;
};
// 时间复杂度：O(nlogn)；空间复杂度：O(n)

// 方法三：计数排序
var smallerNumbersThanCurrent = function (nums) {
  const count = new Array(101).fill(0);
  const n = nums.length;
  for (let i = 0; i < n; ++i) {
    count[nums[i]] += 1;
  }
  for (let i = 1; i <= 100; ++i) {
    count[i] += count[i - 1];
  }
  const res = [];
  for (let i = 0; i < n; i++) {
    res.push(nums[i] ? count[nums[i] - 1] : 0);
  }
  return res;
};
// 时间复杂度：O(n + k)；空间复杂度：O(k)

console.log(smallerNumbersThanCurrent([8, 1, 2, 2, 3]));
