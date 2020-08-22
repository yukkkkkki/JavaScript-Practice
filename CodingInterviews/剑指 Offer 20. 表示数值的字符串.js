// 请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。例如，字符串"+100"、"5e2"、"-123"、"3.1416"、"-1E-16"、"0123"都表示数值，但"12e"、"1a3.14"、"1.2.3"、"+-5"及"12e+5.4"都不是。

// 方法一：正则
var isNumber = function (s) {
  let result = s.match(/\s*[+-]?((\d+(\.\d*)?)|\.\d+)([e][+-]?\d+)?\s*/g);
  return s !== "." && result ? result[0] === s : false;
};

// 方法二：isNaN
var isNumber = function (s) {
  s = s.trim();
  if (!s) return false;
  return !isNaN(s);
};
