/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
  const res = new Array(rowIndex + 1);
  res[0] = 1;

  for (let i = 1; i < rowIndex + 1; i++) {
    res[0] = res[i] = 1;
    for (let j = i - 1; j >= 1; j--) {
      res[j] = res[j] + res[j - 1];
    }
  }

  return res;
};
