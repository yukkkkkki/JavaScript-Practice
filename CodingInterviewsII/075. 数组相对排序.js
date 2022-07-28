/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
// 方法一：计数排序
var relativeSortArray = function (arr1, arr2) {
  let upper = 0;
  for (const x of arr1) {
    upper = Math.max(x, upper);
  }

  // 记录每一个元素在数组 arr1 中出现的次数
  let frequency = new Array(upper + 1).fill(0);
  for (const x of arr1) {
    frequency[x]++;
  }

  let res = new Array(arr1.length);
  let index = 0;
  // 遍历数组 arr2
  for (const x of arr2) {
    // 将 frequency[x] 个 x 加入 res
    for (let i = 0; i < frequency[x]; i++) {
      res[index++] = x;
    }
    // 并将 frequency[x] 清零
    frequency[x] = 0;
  }

  // 因为还剩下在 arr2 中没有出现的元素，所以还需对整个数组 frequency 进行一次遍历
  for (let x = 0; x <= upper; x++) {
    for (let j = 0; j < frequency[x]; j++) {
      res[index++] = x;
    }
  }

  return res;
};
// 时间复杂度：O(m + n + upper)
// 空间复杂度：O(upper)
