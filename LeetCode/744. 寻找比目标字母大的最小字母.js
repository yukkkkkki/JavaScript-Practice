/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function (letters, target) {
  const n = letters.length;
  if (target >= letters[n - 1]) {
    return letters[0];
  }

  let l = 0;
  let r = n - 1;
  while (l < r) {
    const mid = Math.floor((r - l) / 2) + l;
    if (letters[mid] > target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }

  return letters[l];
};
