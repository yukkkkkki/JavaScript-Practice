// 一些恶魔抓住了公主（P）并将她关在了地下城的右下角。地下城是由 M x N 个房间组成的二维网格。我们英勇的骑士（K）最初被安置在左上角的房间里，他必须穿过地下城并通过对抗恶魔来拯救公主。

// 骑士的初始健康点数为一个正整数。如果他的健康点数在某一时刻降至 0 或以下，他会立即死亡。

// 有些房间由恶魔守卫，因此骑士在进入这些房间时会失去健康点数（若房间里的值为负整数，则表示骑士将损失健康点数）；其他房间要么是空的（房间里的值为 0），要么包含增加骑士健康点数的魔法球（若房间里的值为正整数，则表示骑士将增加健康点数）。

// 为了尽快到达公主，骑士决定每次只向右或向下移动一步。

// 编写一个函数来计算确保骑士能够拯救到公主所需的最低初始健康点数。

// 例如，考虑到如下布局的地下城，如果骑士遵循最佳路径 右 -> 右 -> 下 -> 下，则骑士的初始健康点数至少为 7。
// -2 (K) 	-3 	3
// -5 	-10 	1
// 10 	30 	-5 (P)

// 说明:
// 骑士的健康点数没有上限。
// 任何房间都可能对骑士的健康点数造成威胁，也可能增加骑士的健康点数，包括骑士进入的左上角房间以及公主被监禁的右下角房间。

// 方法一：动态规划
// 在骑士的房间出发，正向思维很难获得最小血量，但是最后到达公主房间时，骑士血量一定为1。
// 推导动态规划状态方程，骑士能够走的是右边和下边的屋子，取决于其中最小扣血量的房间。
// 所以从逆向思维来看，骑士逆向进入房间PK后的血量就是正向思维骑士进入房间前PK的血量。
// 二位数组的血量方程应该表达为
// dp[i][j] = Math.max(1, Math.min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j])，
// 二维数组也可以进一步优化为一个一维数组不断原来的值，
// dp[j] = Math.max(1, Math.min(dp[j], dp[j + 1]) - dungeon[i][j]);
var calculateMinimumHP = function (dungeon) {
  let m = dungeon.length,
    n = dungeon[0].length;
  let max = Number.MAX_VALUE;
  let dp = new Array(n + 1).fill(max);
  dp[n - 1] = 1;
  for (let i = m - 1; i >= 0; --i) {
    for (let j = n - 1; j >= 0; --j) {
      dp[j] = Math.max(1, Math.min(dp[j], dp[j + 1]) - dungeon[i][j]);
    }
  }
  return dp[0];
};

// 方法二：DFS
// 思路
// 题目求：骑士出发时所需要的最小稳妥血量，他走过一个点就会加上该点的权重(有正有负)
// 每次有两种选择：向右走，又会迎来两个选择；向下走，又会迎来两个选择
// 很明显是一个递归树，可以用递归做：
//     “嗨，dfs函数，请您帮我算出：如果我走右边的点，我至少要带多少血量才稳妥”
//     “嗨，dfs函数，请您帮我算出：如果我走下边的点，我至少要带多少血量才稳妥”
//     “我会参考你给我返回的两个值，来算出走到我现在的点，所需的最小安全血量”
//
// 可见，递归是自上而下地去思考问题的解决，子问题的结果自下而上地返回，最后得到大问题的结果
//
// 作者：hyj8
// 链接：https://leetcode-cn.com/problems/dungeon-game/solution/fei-dp-xiang-jie-dfsjie-fa-yi-ji-ta-de-you-hua-by-/
const calculateMinimumHP = (dungeon) => {
  const m = dungeon.length;
  const n = dungeon[0].length;
  const minSaveHP = (dungeon, i, j) => { // 至少需要带着多少血量来到(i,j)这点
    if (i == m - 1 && j == n - 1) {
      /*
       来到公主坐标，如果它的权重为正，以1的血量来到这就够了
        如果它为负，则得带着1 - dungeon[i][j]的血量来这
      */
      return dungeon[i][j] > 0 ? 1 : 1 - dungeon[i][j];
    }
    let goDown = Infinity, goRight = Infinity;
    if (i < m - 1)                       // 走下方的点，需要带着的最小安全血量
      goDown = minSaveHP(dungeon, i + 1, j);
    if (j < n - 1)                       // 走右方的点，需要带着的最小安全血量
      goRight = minSaveHP(dungeon, i, j + 1);
    if (goDown < goRight) {              // 走下方需要带着的血量更少
      if (goDown - dungeon[i][j] <= 0) {
        /**
         goDown血量，是来到(i+1,j)点的稳妥血量，
         它 = 来到(i,j)点的稳妥血量 + dungeon[i][j]
         那么，goDown血量 - dungeon[i][j]，就是来到(i,j)点的稳妥血量
         如果它 <= 0，则要它返回 1 ，即来到(i,j)点的稳妥血量至少要为 1
         */
        return 1;
      } else {
        /**
         goDown血量，是来到(i+1,j)点的稳妥血量，
         它 = 来到(i,j)点的稳妥血量 + dungeon[i][j]
         那么，goDown血量 - dungeon[i][j]，就是来到(i,j)点的稳妥血量
         如果它 > 0，它是安全的，返回它本身即可，即 goDown血量 - dungeon[i][j]
         */
        return goDown - dungeon[i][j];
      }
    } else { // 走右方 需要带着的血量更少。分析类似上面
      if (goRight - dungeon[i][j] <= 0) {
        return 1;
      } else {
        return goRight - dungeon[i][j];
      }
    }
  };
  return minSaveHP(dungeon, 0, 0); // 至少需要带着多少血量来到(0,0)这点
};
// 代码超时了
// 优化：记忆化递归
const calculateMinimumHP = (dungeon) => {
  const m = dungeon.length;
  const n = dungeon[0].length;
  // memo初始化，每一项都为0，代表还没记录
  const memo = new Array(m);
  for (let i = 0; i < m; i++) {
    memo[i] = new Array(n).fill(0);
  }
  const minSaveHP = (dungeon, i, j) => {
    if (i == m - 1 && j == n - 1) { // 递归的出口
      return dungeon[i][j] > 0 ? 1 : 1 - dungeon[i][j];
    }
    if (memo[i][j] > 0) return memo[i][j]; // 如果备忘录中有，就直接返回它
    let goDown = Infinity, goRight = Infinity;
    if (i < m - 1)                         // 走下方的点，需要带着的最小安全血量
      goDown = minSaveHP(dungeon, i + 1, j);
    if (j < n - 1)                         // 走右方的点，需要带着的最小安全血量
      goRight = minSaveHP(dungeon, i, j + 1);
    if (goDown < goRight) {
      if (goDown - dungeon[i][j] <= 0) {
        memo[i][j] = 1;
      } else {
        memo[i][j] = goDown - dungeon[i][j];
      }
    } else {
      if (goRight - dungeon[i][j] <= 0) {
        memo[i][j] = 1;
      } else {
        memo[i][j] = goRight - dungeon[i][j];
      }
    }
    return memo[i][j];
  };
  return minSaveHP(dungeon, 0, 0, memo);
};
