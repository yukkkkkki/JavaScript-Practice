// 给定一个非负整数数组和一个整数 m，你需要将这个数组分成 m 个非空的连续子数组。设计一个算法使得这 m 个子数组各自和的最大值最小。

// 注意:
// 数组长度 n 满足以下条件:

//     1 ≤ n ≤ 1000
//     1 ≤ m ≤ min(50, n)

// 示例:
// 输入:
// nums = [7,2,5,10,8]
// m = 2
// 输出:
// 18

// 解释:
// 一共有四种方法将nums分割为2个子数组。
// 其中最好的方式是将其分为[7,2,5] 和 [10,8]，
// 因为此时这两个子数组各自的和的最大值为18，在所有情况中最小。

// 方法一：动态规划
// f[i][j]：将数组的前 i 个数分割为 j 段所能得到的最大连续子数组和的最小值
// 在进行状态转移时，我们可以考虑第 j 段的具体范围，即我们可以枚举 k，其中前 k 个数被分割为 j−1 段，而第 k+1 到第 i 个数为第 j 段。
// 此时，这 j 段子数组中和的最大值，就等于 max(f[k][j - 1], sub(k + 1, i))
// sub(i,j) 表示数组 nums 中下标落在区间 [i,j] 内的数的和
// 我们要使得子数组中和的最大值最小，因此可以列出如下的状态转移方程
//          i-1
// f[i][j]= min​{max(f[k][j−1],sub(k+1,i))}
//          k=0
// 对于状态 f[i][j]f[i][j]f[i][j]，由于我们不能分出空的子数组，因此合法的状态必须有 i≥j
// 对于不合法（i<j）的状态，由于我们的目标是求出最小值，因此可以将这些状态全部初始化为一个很大的数。
// 在上述的状态转移方程中，一旦我们尝试从不合法的状态 f[k][j−1] 进行转移，那么 max⁡(⋯ )将会是一个很大的数，就不会对最外层的 min⁡{⋯ } 产生任何影响。
// 初始状态 f[0][0] = 0
var splitArray = function (nums, m) {
  let n = nums.length;
  let dp = new Array(n + 1).fill(0).map((x) => {
    return new Array(m + 1).fill(0);
  });
  let prefixSum = [0];
  nums.reduce((prex, next) => {
    prefixSum.push(prex + next);
    return prex + next;
  }, 0);

  for (let i = 1; i <= n; i++) {
    dp[i][1] = prefixSum[i];
  }

  for (let j = 2; j <= m; j++) {
    for (let i = 2; i <= n; i++) {
      let temp = [];
      for (let k = 1; k < i; k++) {
        temp.push(Math.max(dp[k][j - 1], prefixSum[i] - prefixSum[k]));
      }
      dp[i][j] = Math.min(...temp);
    }
  }

  return dp[n][m];
};
// 时间复杂度： O(n^2×m)，其中 nnn 是数组的长度，mmm 是分成的非空的连续子数组的个数。总状态数为 O(n×m)O(n \times m)O(n×m)，状态转移时间复杂度 O(n)O(n)O(n)，所以总时间复杂度为 O(n2×m)O(n^2 \times m)O(n2×m)
// 空间复杂度：O(n×m)，为动态规划数组的开销

// 方法二：二分查找 + 贪心
// 策略：
// 贪心地模拟分割的过程，从前到后遍历数组，用 sum 表示当前分割子数组的和，cnt 表示已经分割出的子数组的数量（包括当前子数组），
// 那么每当 sum 加上当前值超过了 xxx，我们就把当前取的值作为新的一段分割子数组的开头，并将 cnt 加 1。
// 遍历结束后验证是否 cnt 不超过 m
// 二分的上界为数组 nums 中所有元素的和，下界为数组 nums 中所有元素的最大值。
// 通过二分查找，我们可以得到最小的最大分割子数组和，这样就可以得到最终的答案了
var splitArray = function (nums, m) {
  let left = 0,
    right = 0;
  for (let i = 0; i < nums.length; i++) {
    right += nums[i];
    left = Math.max(left, nums[i]);
  }

  const check = (target, nums, m) => {
    let sum = 0;
    let cnt = 1;
    for (let i = 0; i < nums.length; i++) {
      if (sum + nums[i] > target) {
        cnt++;
        sum = nums[i];
      } else {
        sum += nums[i];
      }
    }
    return cnt > m;
  };

  if (m == 1) return right;
  while (left < right) {
    if (check(left, nums, m)) {
      left++;
    } else {
      return left;
    }
  }
};
