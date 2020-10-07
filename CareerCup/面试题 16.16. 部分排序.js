// 给定一个整数数组，编写一个函数，找出索引m和n，只要将索引区间[m,n]的元素排好序，整个数组就是有序的。注意：n-m尽量最小，也就是说，找出符合条件的最短序列。函数返回值为[m,n]，若不存在这样的m和n（例如整个数组是有序的），请返回[-1,-1]。

// 示例：
// 输入： [1,2,4,7,10,11,7,12,6,7,16,18,19]
// 输出： [3,9]

/**
 * @param {number[]} array
 * @return {number[]}
 */

// 方法一：正反两次遍历
var subSort = function (array) {
  let r = -1,
    l = -1;
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < array.length; i++) {
    if (array[i] >= max) {
      max = array[i];
    } else {
      r = i;
    }
  }

  let min = Number.MAX_SAFE_INTEGER;
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] <= min) {
      min = array[i];
    } else {
      l = i;
    }
  }
  return [l, r];
};
