// 罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。

// 字符          数值
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000

// 例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

// 通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

//     I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
//     X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。
//     C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。

// 给定一个罗马数字，将其转换成整数。输入确保在 1 到 3999 的范围内。

// 示例 1:
// 输入: "III"
// 输出: 3

// 示例 2:
// 输入: "IV"
// 输出: 4

// 示例 3:
// 输入: "IX"
// 输出: 9

// 示例 4:
// 输入: "LVIII"
// 输出: 58
// 解释: L = 50, V= 5, III = 3.

// 示例 5:
// 输入: "MCMXCIV"
// 输出: 1994
// 解释: M = 1000, CM = 900, XC = 90, IV = 4.

// 方法一：遍历
// 先遍历特殊值，如果有特殊值，先累加特殊值，然后用正则去掉特殊值，再遍历剩余的数字
var romanToInt = function (s) {
  const roman = {
    IV: 4,
    IX: 9,
    XL: 40,
    XC: 90,
    CD: 400,
    CM: 900,
  };

  const list = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let res = 0;
  // 先遍历特殊值
  for (const key in roman) {
    // 检测输入值是否含有特殊值
    if (num.includes(key)) {
      // 用正则去掉特殊值
      const reg = new RegExp(key);
      num = num.replace(reg, "");
      res += roman[key];
    }
  }

  for (const i of num) {
    res += list[i]; // 累加正常罗马数
  }
  return res;
};
// 时间复杂度：O(n); 空间复杂度： O(1)

// 方法二：switch + includes 法
// 先遍历所有罗马数字进行累加，
// 对于特殊数字的循环，比如：5+1=6，而实际是 4，相差 2，所以需要在结果上减去 2，以此类推
var romanToInt = function (s) {
  let res = 0;
  for (const c of num) {
    switch (c) {
      case "I":
        res += 1;
        break;
      case "V":
        res += 5;
        break;
      case "X":
        res += 10;
        break;
      case "L":
        res += 50;
        break;
      case "C":
        res += 100;
        break;
      case "D":
        res += 500;
        break;
      case "M":
        res += 1000;
        break;
    }
  }
  // 减去特殊组合
  if (num.includes("IV") || num.includes("IX")) res -= 2;
  if (num.includes("XL") || num.includes("XC")) res -= 20;
  if (num.includes("CD") || num.includes("CM")) res -= 200;
};
// 时间复杂度：O(n); 空间复杂度： O(1)
