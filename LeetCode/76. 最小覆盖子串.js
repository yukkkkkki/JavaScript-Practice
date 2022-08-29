/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
// 方法一：滑动窗口
var minWindow = function (s, t) {
  const n = s.length;

  const need = new Map();
  for (let c of t) {
    need.set(c, (need.get(c) || 0) + 1);
  }
  let type = need.size;

  let l = 0; // 用于「延伸」现有窗口
  let r = 0; // 用于「收缩」窗口
  let res = "";
  while (r < n) {
    let c = s[r];

    if (need.has(c)) {
      need.set(c, need.get(c) - 1);
      if (need.get(c) === 0) type -= 1;
    }

    while (type === 0) {
      const newRes = s.substring(l, r + 1);
      if (!res || newRes.length < res.length) {
        res = newRes;
      }

      const c2 = s[l];
      if (need.has(c2)) {
        need.set(c2, need.get(c2) + 1);
        if (need.get(c2) === 1) type += 1;
      }

      l += 1;
    }

    r += 1;
  }

  return res;
};
