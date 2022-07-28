/**
 * @param {string[]} strs
 * @return {number}
 */
// 方法一：开查集
var numSimilarGroups = function (strs) {
  const n = strs.length;
  const m = strs[0].length;
  const f = new Array(n).fill(0).map((v, i) => i);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const fi = find(i);
      const fj = find(j);
      if (fi === fj) continue;

      if (check(strs[i], strs[j], m)) {
        f[fi] = fj;
      }
    }
  }

  let res = 0;
  for (let i = 0; i < n; i++) {
    if (f[i] === i) res++;
  }

  return res;

  function find(x) {
    return f[x] === x ? x : (f[x] = find(f[x]));
  }

  function check(a, b, len) {
    let num = 0;
    for (let i = 0; i < len; i++) {
      if (a[i] !== b[i]) {
        num++;
        if (num > 2) return false;
      }
    }
    return true;
  }
};

// 时间复杂度：O(n^2·m+nlogn))
// 空间复杂度：O(n)
