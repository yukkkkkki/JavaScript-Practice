// 给定由若干 0 和 1 组成的数组 A。我们定义 N_i：从 A[0] 到 A[i] 的第 i 个子数组被解释为一个二进制数（从最高有效位到最低有效位）。

// 返回布尔值列表 answer，只有当 N_i 可以被 5 整除时，答案 answer[i] 为 true，否则为 false。

// 示例 1：
// 输入：[0,1,1]
// 输出：[true,false,false]
// 解释：
// 输入数字为 0, 01, 011；也就是十进制中的 0, 1, 3 。只有第一个数可以被 5 整除，因此 answer[0] 为真。

// 示例 2：
// 输入：[1,1,1]
// 输出：[false,false,false]

// 示例 3：
// 输入：[0,1,1,1,1,1]
// 输出：[true,false,false,false,true,false]

// 示例 4：
// 输入：[1,1,1,0,1]
// 输出：[false,false,false,false,false]

/**
 * @param {number[]} A
 * @return {boolean[]}
 */
// 方法一：模拟
var prefixesDivBy5 = function (A) {
  const list = [];
  let prefix = 0;
  const length = A.length;
  for (let i = 0; i < length; i++) {
    prefix = ((prefix << 1) + A[i]) % 5;
    list.push(prefix === 0);
  }
  return list;
};
