// 二进制手表顶部有 4 个 LED 代表 小时（0-11），底部的 6 个 LED 代表 分钟（0-59）。

// 每个 LED 代表一个 0 或 1，最低位在右侧。
// 给定一个非负整数 n 代表当前 LED 亮着的数量，返回所有可能的时间。

// 示例：
// 输入: n = 1
// 返回: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]
//
// 提示：
// 输出的顺序没有要求。
// 小时不会以零开头，比如 “01:00” 是不允许的，应为 “1:00”。
// 分钟必须由两位数组成，可能会以零开头，比如 “10:2” 是无效的，应为 “10:02”。
// 超过表示范围（小时 0-11，分钟 0-59）的数据将会被舍弃，也就是说不会出现 "13:00", "0:61" 等时间。

// 方法一：回溯
var readBinaryWatch = function (num) {
  const numsarr = [1, 2, 4, 8, 1, 2, 4, 8, 16, 32];
  if (num <= 0) return ['0:00'];
  const res = [];

  const backTrack = (time, n, index) => {
    const hour = time >> 6,
      minute = time & 0b111111;
    if (hour > 11 || minute > 59) return;
    if (n === 0) {
      res.push(`${hour}:${minute < 10 ? '0' + minute : minute}`);
      return;
    }
    const end = 10 - n;
    while (index <= end) {
      backTrack(time | (1 << index), n - 1, ++index);
    }
  };

  backTrack(0, num, 0);
  return res;
};
