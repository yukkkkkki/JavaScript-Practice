/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
// 正则表达式
var isMatch = function (s, p) {
  return new RegExp('^' + p + '$', 'g').test(s);
};

// 回溯，逐个字符判断
var isMatch = function (s, p) {
  if (!p) return !s;
  if (p[1] == '*') {
    return (
      isMatch(s, p.substr(2)) ||
      (s && (s[0] == p[0] || p[0] == '.') && isMatch(s.substr(1), p))
    );
  } else {
    return (
      s && (s[0] == p[0] || p[0] == '.') && isMatch(s.substr(1), p.substr(1))
    );
  }
};
