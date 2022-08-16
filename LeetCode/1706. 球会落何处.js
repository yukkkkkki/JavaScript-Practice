/**
 * @param {number[][]} grid
 * @return {number[]}
 */
// 方法一：模拟
// 依次判断每个球的最终位置。对于每个球，从上至下判断球位置的移动方向
var findBall = function (grid) {
  const n = grid[0].length;
  const res = new Array(n);

  for (let j = 0; j < n; j++) {
    let col = j; // 球的初始列
    for (const row of grid) {
      const dir = row[col];
      // 移动球
      col += dir;
      // 若移动过程中碰到侧边或者 V 型，则球会停止移动，卡在箱子里
      // 到达侧边或 V 形
      if (col < 0 || col === n || row[col] !== dir) {
        col = -1;
        break;
      }
    }
    res[j] = col; // col >= 0 为成功到达底部
  }

  return res;
};
// 时间复杂度：O(mn)
// 空间复杂度：O(1)
