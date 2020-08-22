// 给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。
//
// 示例 1:
// 输入: "(()"
// 输出: 2
// 解释: 最长有效括号子串为 "()"
//
// 示例 2:
// 输入: ")()())"
// 输出: 4
// 解释: 最长有效括号子串为 "()()"

// 方法一：栈的思路
// 作者：hyj8
// 链接：https://leetcode-cn.com/problems/longest-valid-parentheses/solution/shou-hua-tu-jie-zhan-de-xiang-xi-si-lu-by-hyj8/
var longestValidParentheses = function (s) {
  let maxLen = 0;
  const stack = [-1]; //往栈初始放入 -1 ，希望它留在栈中作为一个“参照”
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c == "(") {
      // 左括号的索引入栈
      stack.push(i);
      continue; // 跳过，考察下一个符号
    }
    stack.pop(); // 遇到右括号，栈顶出栈
    if (stack.length == 0) {
      // 栈顶因此为空
      stack.push(i); // 说明该更换“断点”索引了
    } else {
      // 计算有效的连续长度，挑战最大
      maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
    }
  }
  return maxLen;
};
// 复盘
// 可见，两种索引会入栈：等待匹配的左括号索引、充当“断点”的右括号索引
// 怎么判断右括号是充当断点的，还是匹配别人的——栈有没有因出栈而变空
// 计算有效长度的时机：遇到能匹配别人的右括号——栈没有因为出栈而变空
// 时间复杂度： O(N)

// 方法二：正则解法
var longestValidParentheses = function (s) {
  let temp = s,
    reg = new RegExp(/(\((1*)\))/gi);
  while (reg.test(temp)) {
    temp = temp.replace(reg, 1 + "$2");
  }
  let arr = temp.split(/[\(\)]/gi);
  return arr.reduce((total, item, index) => {
    let len = item.length * 2;
    total = total > len ? total : len;
    return total;
  }, 0);
};

// 方法三：动态规划
// 定义 dp table，dp[i] 为字符串 s 0 - i 的最长有效子字符串的长度
// 定义 dp 方程
//     当 (s[i] == ')' 时
//         如果 s[i - 1] == '('，那么 dp[i] = dp[i - 2] + 2
//         如果 s[i - 1] == ')'，那么还要判断 dp[i - 1]的有效子字符串之前的字符是否为'('，
//             如果是，则 dp[i] = dp[i−dp[i−1]−2] + dp[i−1] + 2，即dp[i - 1]的有效子字符串之前的有效字符串长度 + dp[i - 1]的有效子字符串的长度 + 一对括号的长度。
//             这里不用特别考虑dp[i - 1] = 0的情况，因为dp[i - 1] = 0，说明有效字符串为空字符串，空字符串也是符合要求的
//     其他情况 dp[i] = 0
// 作者：jsyt
// 链接：https://leetcode-cn.com/problems/longest-valid-parentheses/solution/js-dong-tai-gui-hua-li-yong-zhan-bao-li-qiu-jie-by/
var longestValidParentheses = function (s) {
  let dp = new Array(s.length).fill(0),
    ans = 0;
  for (let i = 1; i < s.length; i++) {
    if (s[i] === ")") {
      if (s[i - 1] === "(") {
        dp[i] = i > 1 ? dp[i - 2] + 2 : 2;
      } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === "(") {
        dp[i] =
          (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0) + dp[i - 1] + 2;
      }
    }
    ans = Math.max(ans, dp[i]);
  }
  return ans;
};
// 时间复杂度： O(N)
