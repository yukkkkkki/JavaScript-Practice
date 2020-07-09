// 输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。

// 序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

// 示例 1：
// 输入：target = 9
// 输出：[[2,3,4],[4,5]]

// 示例 2：
// 输入：target = 15
// 输出：[[1,2,3,4,5],[4,5,6],[7,8]]

// 方法一：滑动窗口
// 先把数分解9=1+8=2+7=3+6=4+5, 按这种，找到可能组成正确结果的数组，根据数的结构，易知结果可能存在[1,2,3,4,5]中，
// 不难发现数组最后一个数, 如果target是偶数就是target / 2,如果是奇数就是Math.floor(target/2)+1
// 或采用二进制取整(target/2 | 0) + 1
// 再对找到的数组采用滑动窗口模型，找出答案
var findContinuousSequence = function (target) {
  let index = target % 2 === 0 ? target / 2 : Math.floor(target / 2) + 1;
  let res = [],
    temp = [],
    sum = 0;
  for (let i = 0; i <= index; i++) {
    temp.push(i);
    sum += i;
    while (sum > target) {
      sum -= temp[0];
      temp.shift();
    }

    if (sum === target) {
      temp.length >= 2 && res.push([...temp]);
    }
  }
  return res;
};

// 滑动窗口 方法二
var findContinuousSequence = function (target) {
  let max = Math.floor(target / 2) + 1;
  let r = 1,
    sum = 0,
    ans = [],
    temp = [];
  while (r <= max) {
    while (sum < target) {
      sum += r;
      temp.push(r++);
    }

    while (sum >= target) {
      if (sum === target) ans.push([...temp]);
      sum -= temp.shift();
    }
  }
  return ans;
};
