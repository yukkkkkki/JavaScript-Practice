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
// 时间复杂度：O(nlogn)；空间复杂度：O(logn)

// 方法二：双指针 归并排序
// 思路：
// 设 neg 为数组A中负数与非负数的分界线
// 即，A[0] 到 A[neg]均为负数，而A[neg + 1]到A[n-1]均为非负数
// 那么数组平方后，A[0] 到 A[neg] 单调递减，A[neg + 1] 到 A[n - 1] 单调递增
var sortedSquares = function (A) {
  const n = A.length;
  let negative = -1;
  for (let i = 0; i < n; ++i) {
    if (A[i] < 0) {
      negative = i;
    } else {
      break;
    }
  }
  let res = new Array(n);
  let index = 0,
    i = negative,
    j = negative + 1;
  while (i >= 0 || j < n) {
    if (i < 0) {
      res[index] = A[j] * A[j];
      ++j;
    } else if (j == n) {
      res[index] = A[i] * A[i];
      --i;
    } else if (A[i] * A[i] < A[j] * A[j]) {
      res[index] = A[i] * A[i];
      --i;
    } else {
      res[index] = A[j] * A[j];
      ++j;
    }
    ++index;
  }
  return res;
};
// 时间复杂度：O(n)；空间复杂度：O(1)

// 方法三：双指针
// 思路：
// 使用两个指针分别指向位置 0 和 n - 1，每次比较两个指针对应的数,选择交大的那个逆序放入答案并移动指针
var sortedSquares = function (A) {
  const n = A.length;
  let res = [];
  let i = 0,
    j = n - 1,
    pos = n - 1;
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
