/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
// 方法一：栈模拟
var asteroidCollision = function (asteroids) {
  const stack = [];
  for (const aster of asteroids) {
    // 记录行星 aster 是否还存在（即未爆炸）
    let alive = true;
    while (
      alive &&
      aster < 0 &&
      stack.length > 0 &&
      stack[stack.length - 1] > 0
    ) {
      // aster 是否存在
      alive = stack[stack.length - 1] < -aster;
      // 栈顶行星爆炸
      if (stack[stack.length - 1] <= -aster) {
        stack.pop();
      }
    }

    // 如果最后 alive 为真，说明行星 aster 不会爆炸，则将 aster 入栈
    if (alive) stack.push(aster);
  }

  const size = stack.length;
  const res = new Array(size).fill(0);
  for (let i = size - 1; i >= 0; i--) {
    res[i] = stack.pop();
  }
  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
