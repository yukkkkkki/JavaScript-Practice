// 给定一个整数 n，求以 1 ... n 为节点组成的二叉搜索树有多少种？

// 示例:
// 输入: 3
// 输出: 5
// 解释:
// 给定 n = 3, 一共有 5 种不同结构的二叉搜索树:

//    1         3     3      2      1
//     \       /     /      / \      \
//      3     2     1      1   3      2
//     /     /       \                 \
//    2     1         2                 3

// 方法一：动态规划
// 思路
// 按照 BST 的定义，假设整数 k 去构建根节点，则整数 1 ~ k-1 会去构建左子树，整数 k+1 ~ n 会去构建右子树
// 以 k 为根节点的BST的种类数 = 左子树的 BST 种类数 * 右子树的 BST 种类数
// 问题变成：计算不同的 k 之下，等式右边的种类数，然后累加
// dp[i]：i个节点构建BST共有几种
//        dp(i)=∑dp(j)∗dp(i−j−1),0<=j<=i−1
// base case
//     n=0时，没有数字，只能形成一种BST：空树
//     n=1时，只有一个数字，只能形成一种BST：单个节点
// 时间复杂度：O(n^2)
// 作者：hyj8
// 链接：https://leetcode-cn.com/problems/unique-binary-search-trees/solution/shou-hua-tu-jie-san-chong-xie-fa-dp-di-gui-ji-yi-h/
var numTrees = function (n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] += dp[j] * dp[i - j - 1];
    }
  }
  return dp[n];
};

// 方法二：递归
var numTrees = function (n) {
  if (n == 0 || n == 1) return 1;
  let num = 0;
  for (let i = 0; i < n; i++) {
    num += numTrees(i) * numTrees(n - i - 1);
  }
  return num;
};

// 优化：记忆化递归
var numTrees = function (n) {
  const memo = new Array(n + 1).fill(0);
  // 单独再封装出recur是为了memo只创建一次。而不是每次调用都新创建
  const recur = (n) => {
    if (n == 0 || n == 1) return (memo[n] = 1);
    if (memo[n] > 0) return memo[n];
    for (let i = 0; i < n; i++) {
      memo[n] += recur(i) * recur(n - i - 1);
    }
    return memo[n];
  };
  return recur(n);
};
