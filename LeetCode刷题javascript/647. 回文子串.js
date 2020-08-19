// 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。

// 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

// 示例 1：
// 输入："abc"
// 输出：3
// 解释：三个回文子串: "a", "b", "c"

// 示例 2：
// 输入："aaa"
// 输出：6
// 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"

// 方法一：动态规划
var countSubstrings = function (s) {
  let count = 0;
  const n = s.length;
  const dp = new Array(n);
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(n).fill(false);
  }

  for (let j = 0; j < n; j++) {
    for (let i = 0; i <= j; i++) {
      if (i == j) {
        // 单个字符
        dp[i][j] = true;
        count++;
      } else if (j - i == 1 && s[i] == s[j]) {
        // 两个相同的字符
        dp[i][j] = true;
        count++;
      } else if (j - i > 1 && s[i] == s[j] && dp[i + 1][j - 1]) {
        // 多于两个字符
        dp[i][j] = true;
        count++;
      }
    }
  }
  return count;
};
// 时间复杂度：O(n^2 )，空间复杂度：O(n^2)

// 简化
var countSubstrings = function (s) {
  let count = 0;
  const n = s.length;
  const dp = new Array(n);
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(n).fill(false);
  }
  for (let j = 0; j < n; j++) {
    for (let i = 0; i <= j; i++) {
      if (i == j) {
        // 单个字符
        dp[i][j] = true;
      } else if (s[i] == s[j]) {
        // 两个相同的字符
        dp[i][j] = j - i == 1 || dp[i + 1][j - 1];
      }
      if (dp[i][j]) count++;
    }
  }
  return count;
};

// 方法二：暴力法 -> 超时了
// 时间复杂度：O(n^3 )，空间复杂度：O(1)
var isPalindrome = function (s) {
  let i = 0;
  let j = s.length - 1;
  while (i < j) {
    if (s[i] !== s[j]) return false;
    i++;
    j--;
  }
  return true;
};

const countSubstrings = (s) => {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; i++) {
      if (isPalindrome(s.substring(i, j + 1))) {
        count++;
      }
    }
  }
  return count;
};

// 方法三：中心扩展
// 思路：枚举出所有的回文子串
// 枚举出所有的回文字串又有两种思路，分别是：
// 枚举出所有的子串，然后再判断这些子串是否是回文；
// 枚举每一个可能的回文中心，然后用两个指针分别向左右两边拓展，当两个指针指向的元素相同的时候就拓展，否则停止拓展。
var countSubstrings = function (s) {
  const n = s.length;
  let ans = 0;
  for (let i = 0; i < 2 * n - 1; i++) {
    let l = i / 2,
      r = i / 2 + (i % 2);

    while (l >= 0 && r < n && s.charAt(l) == s.charAt(r)) {
      --l;
      ++r;
      ++ans;
    }
  }
  return ans;
};
// 时间复杂度：O(n^2 )，空间复杂度：O(1)
