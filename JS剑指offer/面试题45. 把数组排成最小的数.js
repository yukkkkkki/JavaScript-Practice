// 输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。

// 示例 1:
// 输入: [10,2]
// 输出: "102"

// 示例 2:
// 输入: [3,30,34,5,9]
// 输出: "3033459"


// 通过参数将自定义的「排序依据」作为函数传入 sort 中，这个函数的逻辑是：
// 如果 a + b < b + a，说明 ab 比 ba 小，a 应该在 b 前面，返回-1
// 如果 a + b > b + a，说明 ab 比 ba 大，a 应该在 b 后面，返回 1
// 如果相等，返回 0
var minNumber = function (nums) {
  nums.sort((a, b) => {
    const s1 = a + "" + b;
    //console.log(s1);
    const s2 = b + "" + a;
    //console.log(s2);

    if (s1 < s2) return -1;
    if (s1 > s2) return 1;
    return 0;
  });
  return nums.join("");
};