/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var selfDividingNumbers = function (left, right) {
  const ans = [];
  for (let i = left; i <= right; i++) {
    if (isSelfDividing(i)) {
      ans.push(i);
    }
  }
  return ans;
};

const isSelfDividing = (num) => {
  let tmp = num;
  while (tmp > 0) {
    const digit = tmp % 10;
    if (digit === 0 || num % digit !== 0) {
      return false;
    }
    tmp = Math.floor(tmp / 10);
  }
  return true;
};
