// 平面上有 n 个点，点的位置用整数坐标表示 points[i] = [xi, yi]。请你计算访问所有这些点需要的最小时间（以秒为单位）。

// 你可以按照下面的规则在平面上移动：

// 每一秒沿水平或者竖直方向移动一个单位长度，或者跨过对角线（可以看作在一秒内向水平和竖直方向各移动一个单位长度）。
// 必须按照数组中出现的顺序来访问这些点。

// 示例 1：
// 输入：points = [[1,1],[3,4],[-1,0]]
// 输出：7
// 解释：一条最佳的访问路径是： [1,1] -> [2,2] -> [3,3] -> [3,4] -> [2,3] -> [1,2] -> [0,1] -> [-1,0]
// 从 [1,1] 到 [3,4] 需要 3 秒
// 从 [3,4] 到 [-1,0] 需要 4 秒
// 一共需要 7 秒

// 示例 2：
// 输入：points = [[3,2],[-2,2]]
// 输出：5

/**
 * @param {number[][]} points
 * @return {number}
 */
// 方法一：切比雪夫距离
// 思路：
// 对于平面上的两个点 x = (x0, x1)和y = (y2, y1)，设它们横坐标距离只差为 dx = |x0 - y0|，纵坐标距离只差为 dy = |x1 - y1|，会有三种情况
// 1. dx < dy：沿对角线移动 dx 次，再竖直移动 dy - dx 次，总计 dx + (dy - dx) = dy 次
// 2. dx == dy：沿对角线移动 dx 次
// 3. dx > dy：沿对角线移动 dy 次，再水平移动 dx - dy 次，总计 dy + (dx - dy) = dx 次
// 故，对于任意一种情况，从 x 移动到 y 的最少次数为 dx 和 dy 中的较大值 max(dx, dy)
var minTimeToVisitAllPoints = function (points) {
  let x0 = points[0][0];
  let x1 = points[0][1];
  let res = 0;
  for (let i = 0; i < points.length; ++i) {
    let y0 = points[i][0],
      y1 = points[i][1];
    res += Math.max(Math.abs(x0 - y0), Math.abs(x1 - y1));
    x0 = y0;
    x1 = y1;
  }
  return res;
};
// 时间复杂度：O(n)；空间复杂度：O(1)

console.log(
  minTimeToVisitAllPoints([
    [1, 1],
    [3, 4],
    [-1, 0],
  ])
);
