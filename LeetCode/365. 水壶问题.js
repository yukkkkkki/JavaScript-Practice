/**
 * @param {number} jug1Capacity
 * @param {number} jug2Capacity
 * @param {number} targetCapacity
 * @return {boolean}
 */
// 方法一：数学
// 可以认为每次操作只会给水的总量带来 x 或者 y 的变化量
// 因此我们的目标可以改写成：找到一对整数 a, b 使得：ax + by = z
// 而只要满足 z <= x + y，且这样的 a, b 存在，目标就是可以达成的

// 贝祖定理告诉我们，ax + by = z 有解当且仅当 z 是 x, y 的最大公约数的倍数
var canMeasureWater = function (jug1Capacity, jug2Capacity, targetCapacity) {
  if (jug1Capacity + jug2Capacity < targetCapacity) return false;

  if (jug1Capacity === 0 || jug2Capacity === 0) {
    return (
      targetCapacity === 0 || jug1Capacity + jug2Capacity === targetCapacity
    );
  }

  return targetCapacity % gcd(jug1Capacity, jug2Capacity) === 0;
};
const gcd = (x, y) => {
  let remainder = x % y;

  while (remainder) {
    x = y;
    y = remainder;
    remainder = x % y;
  }

  return y;
};
// 时间复杂度：O(log(min(x, y)))
// 空间复杂度：O(1)
