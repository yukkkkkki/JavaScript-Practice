/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
// 方法一：sort
var getLeastNumbers = function (arr, k) {
  return arr.sort((a, b) => a - b).slice(0, k);
};

// 方法二：快排
var getLeastNumbers = function (arr, k) {
  quickSort(arr, 0, arr.length - 1);
  return arr.slice(0, k);
};
const quickSort = (arr, left, right) => {
  if (left > right) return;
  let pivotIndex = partition(arr, left, right);
  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);
};
/**
 * @description 分区：所有小于 pivot的 数据放入一个区间，所有大于 pivot 的放入另一区间
 * @param {number[]} arr
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
const partition = (arr, left, right) => {
  let pivot = arr[right];
  let pivotIndex = left;
  for (let i = left; i < right; i++) {
    if (arr[i] < pivot) {
      swap(arr, pivotIndex, i);
      pivotIndex++;
    }
  }
  // 将 pivot 交换到 index 处，基准元素放置到最终正确位置上
  swap(arr, right, pivotIndex);
  return pivotIndex;
};
const swap = (arr, a, b) => {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};
// 时间复杂度：平均 O(nlogn)；最好 O(nlogn)；最坏 O(n^2)
// 空间复杂度：O(logn)
