/**
 * @param {number[]} arr
 * @param {number[][]} pieces
 * @return {boolean}
 */
// 方法一：哈希表
var canFormArray = function (arr, pieces) {
  const n = arr.length;
  const m = pieces.length;

  // 记录 pieces 各个数组的首元素与数组下标的对应关系
  const map = new Map();
  for (let i = 0; i < m; i++) {
    map.set(pieces[i][0], i);
  }

  for (let i = 0; i < n; ) {
    if (!map.has(arr[i])) return false;

    // 找到对应的数组 pieces[j]，然后将它与 arr[i] 及之后的整数进行比较
    const j = map.get(arr[i]);
    const len = pieces[j].length;
    for (let k = 0; k < len; k++) {
      if (arr[i + k] !== pieces[j][k]) {
        return false;
      }
    }
    i = i + len;
  }
  return true;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
