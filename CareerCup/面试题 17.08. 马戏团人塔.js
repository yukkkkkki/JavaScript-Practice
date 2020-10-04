// 有个马戏团正在设计叠罗汉的表演节目，一个人要站在另一人的肩膀上。出于实际和美观的考虑，在上面的人要比下面的人矮一点且轻一点。已知马戏团每个人的身高和体重，请编写代码计算叠罗汉最多能叠几个人。

// 示例：
// 输入：height = [65,70,56,75,60,68] weight = [100,150,90,190,95,110]
// 输出：6
// 解释：从上往下数，叠罗汉最多能叠 6 层：(56,90), (60,95), (65,100), (68,110), (70,150), (75,190)

/**
 * @param {number[]} height
 * @param {number[]} weight
 * @return {number}
 */

//  方法一：二分法
var bestSeqAtIndex = function (height, weight) {
  const data = [];
  const dp = [];
  for (let i = 0; i < height.length; i++) {
    data.push({
      height: height[i],
      weight: weight[i],
    });
  }
  data.sort((a, b) => {
    if (a.height === b.height) {
      return b.weight - a.weight;
    }
    return a.height - b.height;
  });

  // 利用二分法获取weight的最长子串的值就是结果
  let res = 0;
  for (let index in data) {
    index = Number(index);
    let w = data[index].weight;
    let i = 0;
    let j = res;
    while (i < j) {
      const m = parseInt((i + j) / 2);
      if (dp[m] < w) {
        i = m + 1;
      } else {
        j = m;
      }
    }
    dp[i] = w;
    if (j === res) res++;
  }
  return res;
};
