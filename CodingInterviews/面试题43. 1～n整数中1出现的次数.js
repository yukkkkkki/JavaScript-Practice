// 输入一个整数 n ，求1～n这n个整数的十进制表示中1出现的次数。

// 例如，输入12，1～12这些整数中包含1 的数字有1、10、11和12，1一共出现了5次。

// 示例 1：
// 输入：n = 12
// 输出：5

// 示例 2：
// 输入：n = 13
// 输出：6

// 归纳法
// 对于个位出现的1：(n / 10) * 1 + (n % 10) >= 1 ? 1 : 0;
// 对于十位出现的1：(n / 100) * 10 + if (k > 19) 10 else if (k < 10) 0 else k - 10 + 1;
// 对于百位出现的1：(n / 1000) * 100 + if (k > 199) 10 else if (k < 100) 0 else k - 100 + 1;
// 最终归纳出: (n / (i * 10)) * i + if (k > 2 * i - 1) i else if (k < i) 0 else k - i + 1, 其中k = n % (i * 10);

var countDigitOne = function (n) {
  let count = 0;
  for (let i = 1; i <= n; i *= 10) {
    let divide = i * 10;
    let p = Math.floor(n / divide),
      k = n % divide,
      rest = 0;

    count += p * i;
    rest = k > 2 * i - 1 ? i : k < i ? 0 : k - i + 1;
    count += rest;
  }
  return count;
};
