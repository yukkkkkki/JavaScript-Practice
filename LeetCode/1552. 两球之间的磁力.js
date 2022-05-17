/**
 * @param {number[]} position
 * @param {number} m
 * @return {number}
 */
// 方法一：二分查找
const check = (x, position, m) => {
  // 给定一个答案 x
  // 判断是否存在一种放置方法使得相邻小球的间距最小值大于等于 x，等价于相邻小球的间距均大于等于 x

  let pre = position[0];
  let cnt = 1;
  for (let i = 1; i < position.length; ++i) {
    if (position[i] - pre >= x) {
      pre = position[i];
      cnt += 1;
    }
  }
  return cnt >= m;
};

var maxDistance = function (position, m) {
  position.sort((x, y) => x - y);
  let left = 1,
    right = position[position.length - 1] - position[0],
    ans = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (check(mid, position, m)) {
      ans = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return ans;
};
// 时间复杂度：O(nlog(nS))
// 空调复杂度：O(logn)
