// 给定一个按非递减顺序排序的整数数组 A，返回每个数字的平方组成的新数组，要求也按非递减顺序排序。

// 示例 1：
// 输入：[-4,-1,0,3,10]
// 输出：[0,1,9,16,100]

// 示例 2：
// 输入：[-7,-3,2,3,11]
// 输出：[4,9,9,49,121]

/**
 * @param {number[]} A
 * @return {number[]}
 */
// 方法一：直接排序
var sortedSquares = function (A) {
  for (let i = 0; i < A.length; i++) {
    A[i] = A[i] * A[i];
  }
  A.sort((a, b) => a - b);
  return A;
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(logn)

// 方法二：双指针 归并排序
var sortedSquares = function (nums) {
  const n = nums.length;
  // 设 neg 为数组中负数与非负数的分界线
  // 即 nums[0] 到 nums[neg] 均为负数，nums[neg + 1] 到 nums[n − 1] 均为非负数
  // 将数组 nums 中的数平方后，那么 nums[0] 到 nums[neg] 单调 ↓，nums[neg + 1] 到 nums[n − 1] 单调 ↑
  let neg = -1;
  for (let i = 0; i < n; i++) {
    if (nums[i] < 0) neg = i;
    else break;
  }

  let result = new Array(n).fill(0);
  let idx = 0;
  let i = neg;
  let j = neg + 1;
  while (i >= 0 || j < n) {
    if (i < 0) {
      // 全是正数的情况
      result[idx] = nums[j] * nums[j];
      ++j;
    } else if (j === n) {
      // 全是负数的情况
      result[idx] = nums[i] * nums[i];
      --i;
    } else if (nums[i] * nums[i] < nums[j] * nums[j]) {
      // 有正有负的情况，但负数平方 < 整数平方时
      result[idx] = nums[i] * nums[i];
      --i;
    } else {
      result[idx] = nums[j] * nums[j];
      ++j;
    }
    ++idx;
  }

  return result;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 方法三：双指针
var sortedSquares = function (A) {
  const n = A.length;
  let res = new Array(n).fill(0);
  let i = 0;
  let j = n - 1;
  let pos = n - 1;

  // 每次比较两个指针对应的数，选择交大的那个逆序放入答案并移动指针
  while (i <= j) {
    if (A[i] * A[i] > A[j] * A[j]) {
      res[pos] = A[i] * A[i];
      i++;
    } else {
      res[pos] = A[j] * A[j];
      j--;
    }
    pos--;
  }
  return res;
};
console.log(sortedSquares([-7, -3, 2, 3, 11]));
