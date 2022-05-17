/**
 * @param {string} s
 * @param {string} p
 * @param {number[]} removable
 * @return {number}
 */
var maximumRemovals = function (s, p, r) {
  let left = 0;
  let right = r.length;
  let p_arr = p.split('');

  while (left < right) {
    const mid = (left + right) >>> 1;

    let arr = s.split('');
    for (let i = 0; i <= mid; i++) {
      arr[r[i]] = '*';
    }

    if (check(p_arr, arr)) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
};

var check = function (s, t) {
  let i = 0;
  let j = 0;
  while (j < t.length) {
    if (s[i] === t[j++]) {
      i++;
    }
  }

  return i === s.length;
};
