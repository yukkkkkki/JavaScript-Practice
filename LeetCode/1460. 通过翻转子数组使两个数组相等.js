/**
 * @param {number[]} target
 * @param {number[]} arr
 * @return {boolean}
 */
// 方法一：哈希表
var canBeEqual = function (target, arr) {
  const counts1 = new Map();
  const counts2 = new Map();

  for (const num of target) {
    counts1.set(num, (counts1.get(num) || 0) + 1);
  }

  for (const num of arr) {
    counts2.set(num, (counts2.get(num) || 0) + 1);
  }

  if (counts1.size !== counts2.size) return false;
  for (const [key, value] of counts1.entries()) {
    if (!counts2.has(key) || counts2.get(key) !== value) {
      return false;
    }
  }
  return true;
};
// 间复杂度：O(n)
// 空间复杂度：O(n)

// 方法二：排序
var canBeEqual = function (target, arr) {
  quickSort(target, 0, target.length);
  quickSort(arr, 0, arr.length);
  return target.toString() === arr.toString();
};
const quickSort = (arr, left, right) => {
  if (left > right) return;

  let pivotIndex = partition(arr, left, right);
  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);
};
const partition = (arr, left, right) => {
  let pivot = arr[right];
  let pivotIndex = left;
  for (let i = left; i < right; i++) {
    if (arr[i] < pivot) {
      swap(arr, pivotIndex, i);
      pivotIndex++;
    }
  }

  swap(arr, pivotIndex, right);
  return pivotIndex;
};
const swap = (arr, a, b) => {
  let tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
};
// 间复杂度：O(n)
// 空间复杂度：O(n)
