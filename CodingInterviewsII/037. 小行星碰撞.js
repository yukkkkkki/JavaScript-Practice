/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
// 方法一：单调栈
// 步骤  小行星  操作    栈        注释
//  1      4    入栈   [4]
//  2      5    入栈   [4, 5]
//  3     -6    相撞   [-6]       -6、5 相撞，5 出栈；-6、4相撞，-6 出栈
//  4      4    入栈   [-6, 4]
//  5      8    入栈   [-6, 4, 8]
//  6     -5    相撞   [-6, 4, 8] -5、8 相撞
var asteroidCollision = function (asteroids) {
  const stack = [];
  for (const a of asteroids) {
    while (
      stack.length &&
      stack[stack.length - 1] !== null &&
      stack[stack.length - 1] > 0 &&
      stack[stack.length - 1] < -a
    ) {
      stack.pop();
    }

    if (stack.length && a < 0 && stack[stack.length - 1] === -a) {
      stack.pop();
    } else if (a > 0 || !stack.length || stack[stack.length - 1] < 0) {
      stack.push(a);
    }
  }

  return stack;
};
