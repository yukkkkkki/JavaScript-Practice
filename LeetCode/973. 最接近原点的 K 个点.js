// 我们有一个由平面上的点组成的列表 points。需要从中找出 K 个距离原点 (0, 0) 最近的点。

// （这里，平面上两点之间的距离是欧几里德距离。）

// 你可以按任何顺序返回答案。除了点坐标的顺序之外，答案确保是唯一的。

// 示例 1：
// 输入：points = [[1,3],[-2,2]], K = 1
// 输出：[[-2,2]]
// 解释：
// (1, 3) 和原点之间的距离为 sqrt(10)，
// (-2, 2) 和原点之间的距离为 sqrt(8)，
// 由于 sqrt(8) < sqrt(10)，(-2, 2) 离原点更近。
// 我们只需要距离原点最近的 K = 1 个点，所以答案就是 [[-2,2]]。

// 示例 2：
// 输入：points = [[3,3],[5,-1],[-2,4]], K = 2
// 输出：[[3,3],[-2,4]]
// （答案 [[-2,4],[3,3]] 也会被接受。）

/**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 */

// 方法一：排序
// 将每个点到原点的欧几里得距离的平方从小到大排序后，取出前 K 个即可
var kClosest = function (points, K) {
  points.sort(
    (a, b) =>
      Math.pow(a[0], 2) +
      Math.pow(a[1], 2) -
      Math.pow(b[0], 2) -
      Math.pow(b[1], 2)
  );
  return points.slice(0, k);
};

// 方法二：快速排序
var kClosest = function (points, K) {
  if (points.length <= K) return points;
  quickSelect(points, 0, points.length - 1, K);
  return points.slice(0, K);
};
function quickSelect(points, start, end, K) {
  const pivot = distance(points[start]);
  let l = start,
    r = end;
  while (l <= r) {
    if (distance(points[l]) <= pivot) {
      l++;
      continue;
    }
    if (distance(points[r]) > pivot) {
      r--;
      continue;
    }
    [points[l], points[r]] = [points[r], points[l]];
    l++;
    r--;
  }
  [points[start], points[r]] = [points[r], points[start]];
  if (r == K) {
    return;
  } else if (r < K) {
    quickSelect(points, r + 1, end, K);
  } else {
    quickSelect(points, start, r - 1, K);
  }
}

function distance(point) {
  // 求point到原点的距离
  return Math.pow(point[0], 2) + Math.pow(point[1], 2);
}
console.log(
  kClosest(
    [
      [3, 3],
      [5, -1],
      [-2, 4],
    ],
    2
  )
);
