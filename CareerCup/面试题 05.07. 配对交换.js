// 配对交换。编写程序，交换某个整数的奇数位和偶数位，尽量使用较少的指令（也就是说，位0与位1交换，位2与位3交换，以此类推）。

// 示例1:
//  输入：num = 2（或者0b10）
//  输出 1 (或者 0b01)

// 示例2:
//  输入：num = 3
//  输出：3

/**
 * @param {number} num
 * @return {number}
 */
// 位运算
// 通过 0xaaaaaaaa 和 0x55555555 判断奇数位和偶数位
// 通过位运算进行转换
var exchangeBits = function (num) {
  let even = (num & 0xaaaaaaaa) >> 1;
  let odd = (num & 0x55555555) << 1;
  return even | odd;
};
