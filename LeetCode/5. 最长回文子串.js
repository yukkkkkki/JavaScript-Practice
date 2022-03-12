// 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

// 示例 1：
// 输入: "babad"
// 输出: "bab"
// 注意: "aba" 也是一个有效答案。

// 示例 2：
// 输入: "cbbd"
// 输出: "bb"

// 方法一：动态规划
// 状态定义
// dp[i,j]：字符串 s 从索引 i 到 j 的子串是否是回文串
// 转移方程
// dp[i][j] = dp[i + 1][j - 1] && s[i] == s[j]
//    s[i] == s[j]：说明当前中心可以继续扩张，进而有可能扩大回文串的长度
//    dp[i + 1][j - 1] === true
//    说明 s[i,j]的 **子串 s[i + 1][j - 1]** 也是回文串
//    说明，i 是从最大值开始遍历的，j 是从最小值开始遍历的特殊情况
// j - i < 2：意即子串是一个长度为0或1的回文串
// 总结：
//    dp[i][j] = s[i] == s[j] && ( dp[i+1][j-1] || j - i < 2)
var longestPalindrome = function (s) {
  let n = s.length;
  let res = '';

  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
  // let dp = Array.from(new Array(n), () => new Array(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      dp[i][j] = s[i] == s[j] && (j - i < 2 || dp[i + 1][j - 1]);
      if (dp[i][j] && j - i + 1 > res.length) {
        res = s.substring(i, j + 1);
      }
    }
  }
  return res;
};
// 时间复杂度：O(n2); 空间复杂度：O(n)

// 方法二：中心扩展
// 每次选择一个中心，然后从中心向两边扩展判断左右字符是否相等。
// 中心点的选取有两种情况：
// 当长度为奇数时，以单个字符为中心;
// 当长度为偶数时，以两个字符之间的空隙为中心。
var longestPalindrome = function (s) {
  if (s == null || s.length < 1) {
    return '';
  }
  let start = 0;
  let end = 0;
  const expandFromCenter = (s, left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left -= 1;
      right += 1;
    }
    return right - left - 1;
  };
  // 中心的两种选取（奇对称和偶对称）
  for (let i = 0; i < s.length; i += 1) {
    const len1 = expandFromCenter(s, i, i);
    const len2 = expandFromCenter(s, i, i + 1);
    const len = Math.max(len1, len2);
    // 如果此位置为中心的回文数长度大于之前的长度，则进行处理
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }
  return s.substring(start, end + 1);
};
// 时间复杂度：O(n2); 空间复杂度：O(1)

// 方法三：极简中心扩展法
var longestPalindrome = function (s) {
  let res = s[0] || '';
  for (let i = 0; i < s.length; i++) {
    for (let j = 1; j <= 2; j++) {
      //偶数奇数回文串
      let left = i,
        right = i + j;
      while (left >= 0 && right < s.length && s[left] === s[right]) {
        //向外扩展直到两端不相同
        left--;
        right++;
      }
      let length = right - left - 1;
      if (length > res.length) {
        // substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符
        res = s.substr(left + 1, length);
      }
    }
  }
  return res;
};
