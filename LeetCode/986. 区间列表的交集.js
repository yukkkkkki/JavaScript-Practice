/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
var intervalIntersection = function (firstList, secondList) {
  const res = [];

  let i = 0;
  let j = 0;

  while (i < firstList.length && j < secondList.length) {
    let a = firstList[i];
    let b = secondList[j];

    // 有交集
    if (b[0] <= a[1] && b[1] >= a[0]) {
      res.push([Math.max(a[0], b[0]), Math.min(a[1], b[1])]);
    }
    // i 前进
    if (a[1] < b[1]) i++;
    else j++;
  }

  return res;
};
