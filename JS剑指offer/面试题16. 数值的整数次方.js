// 实现函数double Power(double base, int exponent)，求base的exponent次方。不得使用库函数，同时不需要考虑大数问题。


// 示例 1:
// 输入: 2.00000, 10
// 输出: 1024.00000

// 示例 2:
// 输入: 2.10000, 3
// 输出: 9.26100

// 示例 3:
// 输入: 2.00000, -2
// 输出: 0.25000
// 解释: 2-2 = 1/22 = 1/4 = 0.25

// 二分法
// 如果exponent是偶数，help(base, exponent) = help(base, exponent / 2) * help(base, exponent / 2)
// 如果exponent是奇数，help(base, exponent) = base * help(base, exponent / 2) * help(base, exponent / 2)
// 对于负指数exponent的情况，取其绝对值先计算。将最后结果取倒数即可。

var myPow = function (x, n) {
  const isNegative = n > 0; // 判断n是否是负数
  const res = help(x, Math.abs(n));
  return isNegative ? 1 / res : res;
}

function help(x, n) {
  if (n == 0) return 1;
  if (n == 1) return 1;

  const res = help(x, Math.floor(n / 2));
  // 如果n是偶数，则help(x, n) = help(x, n / 2) * help(x, n / 2)
  // 如果n是奇数，help(x, n) = x * help(x, n / 2) * help(x, n / 2)
  return n % 2 ? res * res * x : res * res;
}

// 作者：xin-tan
// 链接：https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/solution/tu-jie-tu-xie-zheng-li-3chong-jie-fa-bif-er-fen-fa/