/**
 * @param {string} s
 * @return {string[]}
 */
// 方法一：回溯
var restoreIpAddresses = function (s) {
  const SEG_COUNT = 4;
  const segments = new Array(SEG_COUNT);
  const ans = [];

  const dfs = (s, segId, segStart) => {
    if (segId === SEG_COUNT) {
      if (segStart === s.length) {
        ans.push(segments.join('.'));
      }
      return;
    }

    if (segStart === s.length) return;

    if (s.charAt(segStart) === '0') {
      segments[segId] = 0;
      dfs(s, segId + 1, segStart + 1);
    }

    let addr = 0;
    for (let segEnd = segStart; segEnd < s.length; segEnd++) {
      addr = addr * 10 + (s.charAt(segEnd) - '0');
      if (addr > 0 && addr <= 0xff) {
        segments[segId] = addr;
        dfs(s, segId + 1, segEnd + 1);
      } else {
        break;
      }
    }
  };

  dfs(s, 0, 0);
  return ans;
};
// 时间复杂度：O(3^(SEG_COUNT) x |s|)
// 空间复杂度：O(SEG_COUNT)
