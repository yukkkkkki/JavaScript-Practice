/**
 * @param {number[][]} rectangles
 * @return {boolean}
 */
// 方法一：哈希表
// 统计每个矩形顶点的出现次数，同一个位置至多只能存在四个顶点
// 在满足该条件的前提下，如果矩形区域中有相交区域，这要么导致矩形区域四角的顶点出现不止一次，要么导致非四角的顶点存在出现一次或三次的顶点；
// 因此，除了要满足矩形区域的面积等于所有矩形的面积之和，还要满足矩形区域四角的顶点只能出现一次，且其余顶点的出现次数只能是两次或四次
var isRectangleCover = function (rectangles) {
  // 用来算总面积
  let area = 0;
  // 用来计算四个顶点
  let minX = rectangles[0][0];
  let minY = rectangles[0][1];
  let maxX = rectangles[0][2];
  let maxY = rectangles[0][3];

  const cnt = new Map();
  for (const rect of rectangles) {
    const x = rect[0];
    const y = rect[1];
    const a = rect[2];
    const b = rect[3];

    // 小矩形面积
    area += (a - x) * (b - y);

    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, a);
    maxY = Math.max(maxY, b);

    // 记录每个小矩形顶点出现的次数
    cnt.set([x, y].toString(), (cnt.get([x, y].toString()) || 0) + 1);
    cnt.set([x, b].toString(), (cnt.get([x, b].toString()) || 0) + 1);
    cnt.set([a, y].toString(), (cnt.get([a, y].toString()) || 0) + 1);
    cnt.set([a, b].toString(), (cnt.get([a, b].toString()) || 0) + 1);
  }

  const pointMinMin = [minX, minY].toString();
  const pointMinMax = [minX, maxY].toString();
  const pointMaxMin = [maxX, minY].toString();
  const pointMaxMax = [maxX, maxY].toString();

  // 用面积来判断是否重叠
  if (area !== (maxX - minX) * (maxY - minY)) return false;

  // 四个顶点不是每个出现一次
  if (
    (cnt.get(pointMinMin) || 0) !== 1 ||
    (cnt.get(pointMinMax) || 0) !== 1 ||
    (cnt.get(pointMaxMin) || 0) !== 1 ||
    (cnt.get(pointMaxMax) || 0) !== 1
  ) {
    return false;
  }

  cnt.delete(pointMinMin);
  cnt.delete(pointMinMax);
  cnt.delete(pointMaxMin);
  cnt.delete(pointMaxMax);

  // 其余顶点的出现次数只能是两次或四次
  for (const [_, value] of cnt.entries()) {
    if (value !== 2 && value !== 4) return false;
  }

  return true;
};

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/perfect-rectangle/solution/wan-mei-ju-xing-by-leetcode-solution-ty8q/
