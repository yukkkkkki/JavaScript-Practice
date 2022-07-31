/**
 * @param {number[]} arr
 * @return {number[]}
 */
// 方法一：排序 + 哈希表
// 首先用一个数组保存排序完的原数组，然后用一个哈希表保存各元素的序号，最后将原属组的元素替换为序号后返回
var arrayRankTransform = function (arr) {
  const copy = arr.slice();
  copy.sort((a, b) => a - b);

  const ranks = new Map();
  const ans = new Array(arr.length).fill(0);

  for (const a of copy) {
    if (!ranks.has(a)) {
      ranks.set(a, ranks.size + 1);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    ans[i] = ranks.get(arr[i]);
  }

  return ans;
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(n)
