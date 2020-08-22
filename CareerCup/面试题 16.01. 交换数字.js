// 编写一个函数，不用临时变量，直接交换numbers = [a, b]中a与b的值。

// 示例：
// 输入: numbers = [1,2]
// 输出: [2,1]

// 提示：
//     numbers.length == 2

// 方法一：reverse()
var swapNumbers = function (numbers) {
  return numbers.reverse();
};

// 方法二：解构赋值
var swapNumbers = function (numbers) {
  [numbers[0], numbers[1]] = [numbers[1], numbers[0]]
  return numbers;
};