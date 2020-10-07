// 设计一个算法，找出数组中最小的k个数。以任意顺序返回这k个数均可。

// 示例：
// 输入： arr = [1,3,5,7,2,4,6,8], k = 4
// 输出： [1,2,3,4]

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */

// 方法一：快速排序法
var smallestK = function (arr, k) {
  const quickSort = (arr, left, right) => {
    if (left >= right) return;
    let i = left;
    let j = right;
    let key = arr[left]; // 找到一个数作为参考，比这个数字大的放在数字左边，比它小的放在右边

    while (i < j) {
      //从右向左找第一个小于key的值
      while (i < j && arr[j] >= key) j--;
      if (i < j) {
        arr[i] = arr[j];
        i++;
      }
      //从左向右找第一个大于key的值
      while (i < j && arr[i] < key) i++;
      if (i < j) {
        arr[j] = arr[i];
        j--;
      }
    }
    arr[i] = key;
    // quickSort(arr, left, i - 1);
    // quickSort(arr, left + 1, right);
    // return arr;
    // 这种情况是刚刚好左边排好最小k个
    if (i === k - 1) {
      return;
    } else if (k - 1 < i) {
      quickSort(arr, left, i - 1);
    } else {
      quickSort(arr, i + 1, right);
    }
  };

  quickSort(arr, 0, arr.length - 1);
  return arr.slice(0, k);
};

console.log(smallestK([1, 3, 5, 7, 2, 4, 6, 8], 4));
