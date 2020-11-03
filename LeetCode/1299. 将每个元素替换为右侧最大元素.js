// 给你一个数组 arr ，请你将每个元素用它右边最大的元素替换，如果是最后一个元素，用 -1 替换。

// 完成所有替换操作后，请你返回这个数组。

// 示例
// 输入：arr = [17,18,5,4,6,1]
// 输出：[18,6,6,6,1,-1]
/**
 * @param {number[]} arr
 * @return {number[]}
 */
// 方法一：暴力法
var replaceElements = function (arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    let max = -1;
    for (let j = i + 1; j < arr.length; j++) {
      max = Math.max(max, arr[j]);
    }
    // console.log(i, ':', max);
    if (max !== -1) {
      res[i] = max;
    } else {
      res[i] = -1;
    }
  }
  return res;
};

// 方法二：逆序遍历
var replaceElements = function (arr) {
  const n = arr.length;
  let res = new Array(n);
  res[n - 1] = -1;
  for (let i = n - 2; i >= 0; --i) {
    res[i] = Math.max(res[i + 1], arr[i + 1]);
  }
  return res;
};
console.log(replaceElements([17, 18, 5, 4, 6, 1]));
