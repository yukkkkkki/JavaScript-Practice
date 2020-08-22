// 三步问题。有个小孩正在上楼梯，楼梯有n阶台阶，小孩一次可以上1阶、2阶或3阶。实现一种方法，计算小孩有多少种上楼梯的方式。结果可能很大，你需要对结果模1000000007。

// 示例1:
//  输入：n = 3
//  输出：4
//  说明: 有四种走法

// 示例2:
//  输入：n = 5
//  输出：13

// 动态规划
// 动态转移方程：
// f(n) = f(n - 1) + f(n - 2) + f(n - 3)
var waysToStep = function (n) {
  if (n < 3) return n;
  let m = 1e9 + 7;
  let step1 = 1,
    step2 = 2,
    step3 = 4;
  let cur = 4;
  for (let i = 4; i <= n; i++) {
    cur = (step1 + step2 + step3) % m;
    step1 = step2;
    step2 = step3;
    step3 = cur;
  }
  return cur;
};

// 动态规划：降维
var waysToStep = function (n) {
  if (n < 3) return n;
  let m = 1e9 + 7;
  let step1 = 1,
    step2 = 2,
    step3 = 4;
  let cur = 4;
  for (let i = 4; i <= n; i++) {
    cur = (step1 + step2 + step3) % m;
    step1 = step2;
    step2 = step3;
    step3 = cur;
  }
  return cur;
};
