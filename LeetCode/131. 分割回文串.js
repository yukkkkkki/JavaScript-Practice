// 给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。

// 返回 s 所有可能的分割方案。

// 示例:
// 输入: "aab"
// 输出:
// [
//   ["aa","b"],
//   ["a","a","b"]
// ]

// 方法一：回溯法
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  if (s.length === 0) return [];
  const res = [];

  // 判断是否是回文串
  const isPalindrome = (s) => {
    let str = s.replace(/\W|_/g, '').toLowerCase();
    let left = 0,
      right = str.length - 1;
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true;
  };

  const backTrack = (start, tmpPath) => {
    if (start == s.length) {
      // 说明字符串用光，停止回溯，保存tmpPath
      res.push(tmpPath);
      return;
    }

    for (let i = start; i < s.length; i++) {
      let strs = s.slice(start, i + 1);
      if (strs && isPalindrome(strs)) {
        // console.log(isPalindrome(strs));
        backTrack(i + 1, tmpPath.concat(strs));
      }
    }
  };
  backTrack(0, []);
  return res;
};

// console.log(partition('aab'));
