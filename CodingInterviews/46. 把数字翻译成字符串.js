/**
 * @param {number} num
 * @return {number}
 */
// 方法一：回溯
// 求解空间树中，从定点到叶节点的路径总数
var translateNum = function (num) {
  if (num < 0) return 0;

  let res = 0;

  const help = (str, start) => {
    if (start >= str.length) {
      ++res;
      return;
    }

    help(str, start + 1);

    const sub = str.substr(start, 2);
    if (sub.length === 2 && sub >= '10' && sub <= '25') {
      help(str, start + 2);
    }
  };

  help(num + '', 0);
  return res;
};

// 以下方法参考作者： hyj8
// 链接： https: //leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/solution/shou-hui-tu-jie-dfsdi-gui-ji-yi-hua-di-gui-dong-ta/
// 方法二：优化递归：DFS + 备忘录
// 创建数组 memo ，index 存 pointer 的位置，值是对应子树的返回值
// dfs 函数返回的是当前子树的计算结果。dfs 的入口是 pointer 为 0，代表整个树
// dfs 函数中，首先判断，如果 memo 中已存过当前子树的计算结果，则直接返回它
// 如果当前子树有 2 个分支，则 memo[pointer] 存左右子树的 dfs 结果之和
// 如果当前子树有 1 个分支，则 memo[pointer] 存左子树的 dfs 结果
var translateNum = function (num) {
  const str = num.toString();
  const n = str.length;
  const memo = new Array(n);
  memo[n - 1] = 1; // 指针临界时的子树的计算结果
  memo[n] = 1; // 指针越界时的子树的计算结果

  const dfs = (str, pointer, memo) => {
    if (memo[pointer]) return memo[pointer]; // 之前存过，直接拿来用
    
    const temp = Number(str[pointer] + str[pointer + 1]);
    if (temp >= 10 && temp <= 25) {
      // 两个分支的结果相加 记下来
      memo[pointer] = dfs(str, pointer + 1, memo) + dfs(str, pointer + 2, memo);
    } else {
      // 只有1个分支，记录递归调用的结果
      memo[pointer] = dfs(str, pointer + 1, memo);
    }
    return memo[pointer]; // 当前子树的计算结果向上返回
  };
  return dfs(str, 0, memo); // dfs入口
};

// 总结记忆化递归
//     先往 memo 存入两个已知的、处于 bottom 的子树的结果
//     等你 dfs 往下做，遇到它，就能从 memo 中拿出来用
//     递归的结果从下往上返回的过程中，子树的计算结果不断抄录到 memo 里
//     原来是单纯的出栈，没有记忆计算结果，出栈即失忆，现在加了记忆化
//     等到遍历右侧子树时，就能直接拿来用

// 方法三：动态规划
// dp[i] ：翻译前 i 个数的方法数，比如 dp[2]dp[2]dp[2] 就是翻译前 2 个数的方法数
// dp[0]=1dp[0]=1dp[0]=1 ，我是试出来的，但后来想想，这是为了让边界情况也能满足通式
//     数字 16 ，dp[2]=2dp[2]=2dp[2]=2 是肯定的，dp[1]=1dp[1]=1dp[1]=1 也是肯定的
//     为了让 dp[2]=dp[0]+dp[1]dp[2]=dp[0]+dp[1]dp[2]=dp[0]+dp[1] 通式成立，我们只有让 dp[0]=1dp[0]=1dp[0]=1
// 递推式
// 如果不能直接翻译 num_{i-2}num_{i-1}​ 这个两位数 :
//     dp[i] = dp[i−1]
// 如果能直接翻译 num_{i-2}num_{i-1}这个两位数 :
//     dp[i]=dp[i−2]+dp[i−1]
var translateNum = function (num) {
  const str = num.toString();

  const n = str.length;
  const dp = new Array(n + 1);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i < n + 1; i++) {
    const temp = Number(str[i - 2] + str[i - 1]);
    if (temp >= 10 && temp <= 25) {
      dp[i] = dp[i - 2] + dp[i - 1];
    } else {
      dp[i] = dp[i - 1];
    }
  }
  return dp[n]; // 翻译前n个数的方法数，即整个数字
};

// 优化
var translateNum = function (num) {
  const str = num.toString();
  const n = str.length;

  let prev = 1,
    cur = 1;
  for (let i = 2; i < n + 1; i++) {
    const temp = Number(str[i - 2] + str[i - 1]);
    if (temp >= 10 && temp <= 25) {
      const t = cur; // 缓存上个状态
      cur = prev + cur; // 当前状态=上上个状态+上个状态
      prev = t; // 更新上上个状态
    } else {
      prev = cur; // 更新上上个状态
    }
  }
  return cur;
};
