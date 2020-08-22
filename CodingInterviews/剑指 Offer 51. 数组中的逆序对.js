// 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。

// 示例 1:
// 输入: [7,5,6,4]
// 输出: 5

// 方法一：暴力双层for循环 -> 超时了
var reversePairs = function (nums) {
  let count = 0;
  const n = nums.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] > nums[j]) {
        count++;
      }
    }
  }
  return count;
};

// 方法二：归并排序
