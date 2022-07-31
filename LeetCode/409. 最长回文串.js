/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
  let map = new Map();
  let arrS = s.split('');
  let count = 0;

  for (let i of arrS) {
    if (map.has(i)) {
      // 如果找到重复字符(可以回文)，count + 2，重新记录
      map.delete(i);
      count += 2;
    } else {
      map.set(i);
    }
  }

  // 如果 map.size 存在(回文串长度为奇数)，增加一个中心节点，否则不增加
  return count + (map.size ? 1 : 0);
};
