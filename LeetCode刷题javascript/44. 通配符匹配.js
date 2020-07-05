// 给定一个字符串 (s) 和一个字符模式 (p) ，实现一个支持 '?' 和 '*' 的通配符匹配。

// '?' 可以匹配任何单个字符。
// '*' 可以匹配任意字符串（包括空字符串）。

// 两个字符串完全匹配才算匹配成功。

// 说明:
// s 可能为空，且只包含从 a-z 的小写字母。
// p 可能为空，且只包含从 a-z 的小写字母，以及字符 ? 和 *。

// 示例 1:
// 输入:
// s = "aa"
// p = "a"
// 输出: false
// 解释: "a" 无法匹配 "aa" 整个字符串。

// 示例 2:
// 输入:
// s = "aa"
// p = "*"
// 输出: true
// 解释: '*' 可以匹配任意字符串。

// 示例 3:
// 输入:
// s = "cb"
// p = "?a"
// 输出: false
// 解释: '?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'。

// 示例 4:
// 输入:
// s = "adceb"
// p = "*a*b"
// 输出: true
// 解释: 第一个 '*' 可以匹配空字符串, 第二个 '*' 可以匹配字符串 "dce".

// 示例 5:
// 输入:
// s = "acdcb"
// p = "a*c?b"
// 输出: false

// 方法一：动态规划
// 思路
//     ?必须表示为一个字符，不能是''。*可以表示为任意个任意字符
//     遇到 * 时，可以把它当做''，可以当做一个任意字符，也可以变成多个字符适应别人
//     从后往前考察，试着拆分成子问题，s、p串的匹配问题拆分成：末尾字符的匹配 + 剩余子串的匹配，后者只是规模更小的子问题
// 末尾字符的匹配情况：
//     普通字符的相同
//     ？匹配掉任意一个字符
//     *匹配掉""，*被消耗了，s串保持不变
//     末尾*拉出一个去干掉s的末尾一个，p串保持不变

// 状态转移方程：
// if (p[j - 1] == "?" || s[i - 1] == p[j - 1]) {
//   dp[i][j] = dp[i - 1][j - 1];
// } else if ((p[j - 1] == "*" && dp[i - 1][j]) || dp[i][j - 1]) {
//   dp[i][j] = true;
// }
// base cases
//     s p都是空字符串，必然匹配，dp[0][0]=true
//     s 是空字符串，p要想match，只有靠 * 才能使它作为''，如果p[j-1]即末尾是*，将它看作''，则dp[0][j] = dp[0][j - 1]
//     s 为非空字符串，p为空字符串，肯定不匹配，dp[i][j] = false,i>=1;
// 作者：hyj8
// 链接：https://leetcode-cn.com/problems/wildcard-matching/solution/shou-hua-tu-jie-dong-tai-gui-hua-de-si-lu-by-hyj8/
const isMatch = (s, p) => {
  const sLen = s.length;
  const pLen = p.length;
  // 初始化（包括了一部分base case）
  const dp = new Array(sLen + 1);
  for (let i = 0; i < sLen + 1; i++) {
    dp[i] = new Array(pLen + 1).fill(false);
  }
  // base case
  dp[0][0] = true;
  for (let j = 1; j <= pLen; j++) {
    dp[0][j] = p[j - 1] == "*" && dp[0][j - 1];
  }
  // 迭代
  for (let i = 1; i <= sLen; i++) {
    for (let j = 1; j <= pLen; j++) {
      if (p[j - 1] == "?" || s[i - 1] == p[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else if (p[j - 1] == "*" && (dp[i - 1][j] || dp[i][j - 1]))
        dp[i][j] = true;
    }
  }
  return dp[sLen][pLen]; // 整个s串和整个p串是否匹配
};
