/**
 * @param {string} s
 * @return {string[]}
 */
// 方法一：回溯
var permutation = function (s) {
  const n = s.length;
  const res = new Set();
  const visited = {};

  const backTrack = (path) => {
    if (path.length === n) return res.add(path);

    for (let i = 0; i < n; i++) {
      if (visited[i]) continue;

      visited[i] = true;
      backTrack(path + s[i]);
      visited[i] = false;
    }
  };

  backTrack('');
  return Array.from(res);
  // return [...res]
};
