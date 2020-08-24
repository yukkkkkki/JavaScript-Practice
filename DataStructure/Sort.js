// 冒泡排序：两层循环嵌套，相邻记录两两对比
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
// console.log(bubbleSort([4, 2, 5, 6, 1, 2, 5, 6]));

// 选择排序：遍历自身以后的元素，最小/大元素跟自己调换位置
function selectSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = i; j < len; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}
// console.log(selectSort([4, 2, 5, 6, 1, 2, 5, 6]));

// 插入排序：对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      } else {
        break;
      }
    }
  }
  return arr;
}
// console.log(insertSort([4, 2, 5, 6, 1, 2, 5, 6]));

// 快速排序：找到一个数作为参考，比这个数字大的放在数字左边，比它小的放在右边； 然后分别再对左边和右变的序列做相同的操作(递归)
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let left = [];
  let right = [];
  let current = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < current) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(current, quickSort(right));
}
// 改进版
function partition(arr, l, r) {
  let pivot = arr[l];
  while (l < r) {
    while (l < r && a[r] < pivot) {
      --r;
    }
    arr[l] = arr[r];
    while (l < r && arr[l] < pivot) {
      ++l;
    }
    arr[r] = arr[l];
  }
  arr[l] = pivot;
  return l;
}
function quickSort2(arr) {
  let l = 0,
    r = arr.length - 1;
  if (l < r) {
    let pivot = partition(arr, l, r);
    quickSort(arr, l, pivot - 1);
    quickSort(arr, pivot + 1, r);
  }
  return arr;
}

// 归并排序：将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为 2-路归并
// 将数组分为左和右两部分,然后继续将左右两部分继续(递归)拆分,直到拆分成单个为止;
// 然后将拆分为最小的两个数组,进行比较,合并排成一个数组.接着继续递归比较合并.直到最后合并为一个数组.
function mergeSort(arr) {
  let len = arr.length;
  if (len < 2) return arr;
  let middle = Math.floor(len / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
}
