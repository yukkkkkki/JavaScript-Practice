/**
 * @param {string} s
 * @return {number}
 */
var distinctSubseqII = function (s) {
  const MOD = 1000000007;
  const last = new Array(26).fill(-1);

  const n = s.length;
  const f = new Array(n).fill(1);
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < 26; ++j) {
      if (last[j] !== -1) {
        f[i] = (f[i] + f[last[j]]) % MOD;
      }
    }
    last[s[i].charCodeAt() - "a".charCodeAt()] = i;
  }

  let ans = 0;
  for (let i = 0; i < 26; ++i) {
    if (last[i] !== -1) {
      ans = (ans + f[last[i]]) % MOD;
    }
  }
  return ans;
};
