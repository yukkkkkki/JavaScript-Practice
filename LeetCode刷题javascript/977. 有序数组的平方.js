// 给定一个按非递减顺序排序的整数数组 A，返回每个数字的平方组成的新数组，要求也按非递减顺序排序。

// 示例 1：
// 输入：[-4,-1,0,3,10]
// 输出：[0,1,9,16,100]

// 示例 2：
// 输入：[-7,-3,2,3,11]
// 输出：[4,9,9,49,121]

// 方法一：map() + sort()
var sortedSquares = function (A) {
  return A.map((item) => Math.pow(item, 2)).sort((a, b) => a - b);
};

// 方法二
var sortedSquares = function (A) {
  let ans = [];
  let left = 0,
    right = A.length - 1;
  while (left <= right) {
    if (Math.abs(A[left]) > Math.abs(A[right])) {
      ans.unshift(A[left] ** 2);
      left++;
    } else {
      ans.unshift(A[right] ** 2);
      right--;
    }
  }
  return ans;
};
