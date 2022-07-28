/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 方法一：单调栈
var findKthLargest = function (nums, k) {
  const stack = [];

  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    const tmp = [];
    while (stack.length && stack[stack.length - 1] < n) {
      tmp.push(stack.pop());
    }
    if (stack.length < k) stack.push(n);
    while (tmp.length && stack.length < k) {
      stack.push(tmp.pop());
    }
  }

  return stack[stack.length - 1];
};
// 时间复杂度：O(nk)
// 空间复杂度：O(k)

// 方法二：快速排序
var findKthLargest = function (nums, k) {
  quickSort(nums, 0, nums.length - 1);
  return nums[k - 1];
};
// 快速排序
const quickSort = (arr, left, right) => {
  if (left > right) return;
  let pivotIndex = partition(arr, left, right);
  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);
};
// 分区操作：参照基准元素值的大小，划分无序区
// 所有小于 pivot 的数据放入一个区间，所有大于 pivot 的放入另一区间
// 分区操作结束后，基准元素所处的位置就是最终排序后它应该所处的位置
const partition = (arr, left, right) => {
  let pivot = arr[right];
  let pivotIndex = left;
  for (let i = left; i < right; i++) {
    // 降序排序
    if (arr[i] > pivot) {
      swap(arr, pivotIndex, i);
      pivotIndex++;
    }
  }

  swap(arr, right, pivotIndex);
  return pivotIndex;
};
const swap = (arr, a, b) => {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};
// 时间复杂度：平均：O(nlogn)；最好：O(nlogn)；最坏：O(n^2)
// 空间复杂度：O(logn)
