/**
 * @param {number[][]} points
 * @return {boolean}
 */
// 方法一：向量叉乘
// 计算从 points[0] 开始，分别指向 points[1] 和 [2]points[2] 的向量 v1 和 v2
// 「三点各不相同且不在一条直线上」等价于「这两个向量的叉乘结果不为零」：v1  × v2 !== 0
var isBoomerang = function (points) {
  const v1 = [points[1][0] - points[0][0], points[1][1], points[0][1]];
  const v2 = [points[2][0] - points[0][0], points[2][1], points[0][1]];
  return v1[0] * v2[1] - v1[1] * v2[0] !== 0;
};
// 时间复杂度：O(1)
// 空间复杂度：O(1)
