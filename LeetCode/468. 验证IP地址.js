/**
 * @param {string} queryIP
 * @return {string}
 */
// 方法一：依次判断
var validIPAddress = function (queryIP) {
  if (queryIP.indexOf('.') >= 0) {
    // IPv4
    // 存储相邻两个 ‘.’ 出现的位置 last 和 cur
    let last = -1;
    for (let i = 0; i < 4; i++) {
      // 考虑子串
      // 长度是否在 [1, 3] 之间
      // 是否只包含数字
      // 是否在 [0, 255] 之间
      // 是否不包含前导零
      const cur = i === 3 ? queryIP.length : queryIP.indexOf('.', last + 1);
      if (cur < 0) return 'Neither';
      if (cur - last - 1 < 1 || cur - last - 1 > 3) return 'Neither';

      let addr = 0;
      for (let j = last + 1; j < cur; ++j) {
        if (!isDigit(queryIP[j])) return 'Neither';
        addr = addr * 10 + (queryIP[j].charCodeAt() - '0'.charCodeAt());
      }
      if (addr > 255) return 'Neither';
      if (addr > 0 && queryIP[last + 1].charCodeAt() === '0'.charCodeAt()) {
        return 'Neither';
      }
      if (addr === 0 && cur - last - 1 > 1) return 'Neither';

      last = cur;
    }
    return 'IPv4';
  } else {
    // IPv6
    // 判断子串
    // 它的长度是否在 [1, 4] 之间
    // 它是否只包含数字，或者 a-f，或者 A-F；
    let last = -1;
    for (let i = 0; i < 8; ++i) {
      const cur = i === 7 ? queryIP.length : queryIP.indexOf(':', last + 1);
      if (cur < 0) return 'Neither';
      if (cur - last - 1 < 1 || cur - last - 1 > 4) return 'Neither';

      for (let j = last + 1; j < cur; ++j) {
        if (
          !isDigit(queryIP[j]) &&
          !('a' <= queryIP[j].toLowerCase() && queryIP[j].toLowerCase() <= 'f')
        ) {
          return 'Neither';
        }
      }
      last = cur;
    }
    return 'IPv6';
  }
};

const isDigit = (ch) => {
  return parseFloat(ch).toString() === 'NaN' ? false : true;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
