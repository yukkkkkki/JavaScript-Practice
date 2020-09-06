// 假设有从 1 到 N 的 N 个整数，如果从这 N 个数字中成功构造出一个数组，使得数组的第 i 位 (1 <= i <= N) 满足如下两个条件中的一个，我们就称这个数组为一个优美的排列。条件：

// 第 i 位的数字能被 i 整除
// i 能被第 i 位上的数字整除
// 现在给定一个整数 N，请问可以构造多少个优美的排列？

// 示例1:

// 输入: 2
// 输出: 2
// 解释:
// 第 1 个优美的排列是 [1, 2]:
//   第 1 个位置（i=1）上的数字是1，1能被 i（i=1）整除
//   第 2 个位置（i=2）上的数字是2，2能被 i（i=2）整除
// 第 2 个优美的排列是 [2, 1]:
//   第 1 个位置（i=1）上的数字是2，2能被 i（i=1）整除
//   第 2 个位置（i=2）上的数字是1，i（i=2）能被 1 整除

// 方法一：回溯法
var countArrangement = function (N) {
  let visited = new Array(N + 1).fill(false);
  let res = 0;

  const backTrack = (index) => {
    if (index > N) {
      res++;
      return;
    }

    for (let num = 1; num <= N; num++) {
      if (!visited[num] && (num % index === 0 || index % num === 0)) {
        visited[num] = true;
        backTrack(index + 1);
        visited[num] = false;
      }
    }
  };

  backTrack(1);
  return res;
};

console.log(countArrangement(11));
