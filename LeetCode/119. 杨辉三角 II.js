// 输入: rowIndex = 3
// 输出: [1,3,3,1]
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
// 方法一：动态规划
var getRow = function (rowIndex) {
  const res = new Array(rowIndex + 1);
  res[0] = 1;

  for (let i = 1; i < rowIndex + 1; i++) {
    res[i] = 1;
    for (let j = i - 1; j >= 1; j--) {
      res[j] = res[j] + res[j - 1];
    }
  }

  return res;
};
// 作者：xiao_ben_zhu
// 链接：https://leetcode.cn/problems/pascals-triangle-ii/solution/shou-hua-tu-jie-119yang-hui-san-jiao-ii-d09dc/
