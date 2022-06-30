/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  // 去除非字母(空格标点)
  const str = s.toLocaleLowerCase().replace(/[^a-z0-9]*/g, '');
  let i = 0;
  let j = str.length - 1;
  while (i < j) {
    if (str[i++] !== str[j--]) {
      return false;
    }
  }
  return true;
};
