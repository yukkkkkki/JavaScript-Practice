/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：桶排序
var maxProduct = function (nums) {
  const n = nums.length;
  let res = 0;
  if (n == 2) {
    res = (nums[0] - 1) * (nums[1] - 1);
  }
  let tmp = bucketSort(nums, 5);
  tmp = [...new Set(tmp)];
  return (tmp[tmp.length - 1] - 1) * (tmp[tmp.length - 2] - 1);
};

function bucketSort(arr, bucketSize) {
  const n = arr.length;
  if (n === 0) return arr;
  // console.time('桶排序耗时');
  let i = 0;
  let min = arr[0];
  let max = arr[0];
  for (i = 1; i < n; i++) {
    if (arr[i] < min) {
      min = arr[i];
    } else if (arr[i] > max) {
      max = arr[i];
    }
  }
  // 桶的初始化
  const default_bucket_size = 5;
  bucketSize = bucketSize || default_bucket_size;
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets = new Array(bucketCount);
  for (i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }
  // 利用映射函数将数据分配到各个桶中
  for (i = 0; i < n; i++) {
    buckets[Math.floor((arr[i] - min) / bucketSize)].push(arr[i]);
  }
  arr.length = 0;
  for (i = 0; i < buckets.length; i++) {
    quickSort(buckets[i]); //对每个桶进行排序，这里使用了快速排序
    for (let j = 0; j < buckets[i].length; j++) {
      arr.push(buckets[i][j]);
    }
  }
  // console.timeEnd('桶排序耗时');
  return arr;
}
const quickSort = (arr, left, right) => {
  let len = arr.length,
    partitionIndex;
  left = typeof left != "number" ? 0 : left;
  right = typeof right != "number" ? len - 1 : right;
  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }
  return arr;
};
const partition = (arr, left, right) => {
  //分区操作
  let pivot = left,
    index = pivot + 1;
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
};
const swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

// 方法二：一次遍历，维护最大和次大值
var maxProduct = function (nums) {
  var a = nums[0];
  var b = nums[1];
  if (a < b) {
    const temp = a;
    a = b;
    b = temp;
  }

  for (var i = 2; i < nums.length; i++) {
    if (nums[i] > a) {
      b = a;
      a = nums[i];
    } else if (nums[i] > b) {
      b = nums[i];
    }
  }

  return (a - 1) * (b - 1);
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
