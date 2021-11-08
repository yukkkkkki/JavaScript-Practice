// 写出一个秘密数字，并请朋友猜这个数字是多少。朋友每猜测一次，你就会给他一个包含下述信息的提示：

// 猜测数字中有多少位属于数字和确切位置都猜对了（称为 "Bulls", 公牛），
// 有多少位属于数字猜对了但是位置不对（称为 "Cows", 奶牛）。也就是说，这次猜测中有多少位非公牛数字可以通过重新排列转换成公牛数字。
// 给你一个秘密数字 secret 和朋友猜测的数字 guess ，请你返回对朋友这次猜测的提示。

// 提示的格式为 "xAyB" ，x 是公牛个数， y 是奶牛个数，A 表示公牛，B 表示奶牛。

// 请注意秘密数字和朋友猜测的数字都可能含有重复数字。

// 示例 1:
// 输入: secret = "1807", guess = "7810"
// 输出: "1A3B"
// 解释: 数字和位置都对（公牛）用 '|' 连接，数字猜对位置不对（奶牛）的采用斜体加粗标识。
// "1807"
//   |
// "7810"

// 示例 2:
// 输入: secret = "1123", guess = "0111"
// 输出: "1A1B"
// 解释: 数字和位置都对（公牛）用 '|' 连接，数字猜对位置不对（奶牛）的采用斜体加粗标识。
// "1123"        "1123"
//   |      or     |
// "0111"        "0111"
// 注意，两个不匹配的 1 中，只有一个会算作奶牛（数字猜对位置不对）。通过重新排列非公牛数字，其中仅有一个 1 可以成为公牛数字。

// 示例 3：
// 输入：secret = "1", guess = "0"
// 输出："0A0B"

// 示例 4：
// 输入：secret = "1", guess = "1"
// 输出："1A0B"

/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
// 方法一：遍历
// 遍历secret 和 guess，统计满足 secret[i] = guess[i] 的下标个数，即为公牛的个数
// 在 secret[i] !== guess[i] 时，分别统计 secret 和 guess 的各个字符的出现次数，记在两个长度为 10 的数组中
// 对于 0-9 的每位数字，取其在secret 和 guess 中的出现次数的最小值
// 累加每位数字出现次数的最小值，即为奶牛的个数
var getHint = function (secret, guess) {
  let bulls = 0;
  let cows = 0;
  const cntB = new Array(10).fill(0);
  const cntC = new Array(10).fill(0);

  for (let i = 0; i < secret.length; i++) {
    if (secret[i] === guess[i]) {
      bulls++;
    } else {
      cntB[secret[i].charCodeAt() - '0'.charCodeAt()]++;
      cntC[guess[i].charCodeAt() - '0'.charCodeAt()]++;
    }
  }

  for (let i = 0; i < 10; i++) {
    cows += Math.min(cntB[i], cntC[i]);
  }

  return bulls + 'A' + cows + 'B';
};
// 时间复杂度：o(n)
// 空间复杂度：o(c)

console.log(getHint('1123', '0111'));
