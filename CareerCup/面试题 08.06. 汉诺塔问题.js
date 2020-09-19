// 在经典汉诺塔问题中，有 3 根柱子及 N 个不同大小的穿孔圆盘，盘子可以滑入任意一根柱子。一开始，所有盘子自上而下按升序依次套在第一根柱子上(即每一个盘子只能放在更大的盘子上面)。移动圆盘时受到以下限制:
// (1) 每次只能移动一个盘子;
// (2) 盘子只能从柱子顶端滑出移到下一根柱子;
// (3) 盘子只能叠在比它大的盘子上。

// 请编写程序，用栈将所有盘子从第一根柱子移到最后一根柱子。

// 你需要原地修改栈。

// 示例1:
//  输入：A = [2, 1, 0], B = [], C = []
//  输出：C = [2, 1, 0]

// 示例2:
//  输入：A = [1, 0], B = [], C = []
//  输出：C = [1, 0]
/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @return {void} Do not return anything, modify C in-place instead.
 */
// 方法一：递归
// n = 1 时，直接把盘子从 A 移到 C；
// n > 1 时，
// 先把上面 n - 1 个盘子从 A 移到 B（子问题，递归）；
// 再将最大的盘子从 A 移到 C；
// 再将 B 上 n - 1 个盘子从 B 移到 C（子问题，递归）
var hanota = function (A, B, C) {
  const n = A.length;
  const move = function (m, a, b, c) {
    if (m === 1) c.push(a.pop());
    else {
      move(m - 1, a, c, b); // 将A上面n-1个通过C移到B
      c.push(a.pop()); // 将A最后一个移到C
      move(m - 1, b, a, c); // 将B上面n-1个通过空的A移到C
    }
  };
  move(n, A, B, C);
  return C;
};
