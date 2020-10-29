// 给你一个整数数组 nums，请你将该数组升序排列。

// 示例 1：
// 输入：nums = [5,2,3,1]
// 输出：[1,2,3,5]

// 示例 2：
// 输入：nums = [5,1,1,2,0,0]
// 输出：[0,0,1,1,2,5]

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 方法一：冒泡排序（稳定）
// 两层循环嵌套，相邻记录两两对比
var sortArray = function (nums) {
  const n = nums.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        let tmp = nums[j + 1];
        nums[j + 1] = nums[j];
        nums[j] = tmp;
      }
    }
  }
  return nums;
};
// 平均时间复杂度：O(n^2);
// 最好时间复杂度：O(n);
// 最坏时间复杂度：O(n^2);
// 空间复杂度：O(1)

// 方法二：选择排序（不稳定）
// 每一趟从待排序的数据元素中选择最小（或最大）的一个元素作为首元素，直到所有元素排完为止
var sortArray = function (nums) {
  const n = nums.length;
  let mindIndex, tmp;
  for (let i = 0; i < n - 1; i++) {
    mindIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (nums[j] < nums[mindIndex]) {
        mindIndex = j;
      }
    }
    tmp = nums[i];
    nums[i] = nums[mindIndex];
    nums[mindIndex] = tmp;
  }
  return nums;
};
// 平均时间复杂度：O(n^2);
// 最好时间复杂度：O(n^2);
// 最坏时间复杂度：O(n^2);
// 空间复杂度：O(1)

// 方法三：插入排序（稳定）
// 通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入
var sortArray = function (nums) {
  const n = nums.length;
  for (let i = 1; i < n; i++) {
    for (let j = i; j > 0; j--) {
      if (nums[j] < nums[j - 1]) {
        [nums[j], nums[j - 1]] = [nums[j - 1], nums[j]];
      } else {
        break;
      }
    }
  }
  return nums;
};
// 平均时间复杂度：O(n^2);
// 最好时间复杂度：O(n);
// 最坏时间复杂度：O(n^2);
// 空间复杂度：O(1)

// 方法四：希尔排序(递减增量排序) (不稳定)
// 思路：
// 先将整个待排序的记录序列分割成若干子序列分别进行直接插入排序
// 待整个序列中的记录"基本有序"时,再对全体记录进行依次直接插入排序
var sortArray = function (nums) {
  const n = nums.length;
  let tmp,
    gap = 1;
  while (gap < n / 3) {
    gap = gap * 3 + 1;
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < n; i++) {
      tmp = nums[i];
      for (var j = i - gap; j >= 0 && nums[j] > tmp; j -= gap) {
        nums[j + gap] = nums[j];
      }
      nums[j + gap] = tmp;
    }
  }
  return nums;
};
// 平均时间复杂度：O(nlogn);
// 最好时间复杂度：O(nlog^2(n));
// 最坏时间复杂度：O(nlog^2(n));
// 空间复杂度：O(1)

// 方法五：归并排序（稳定）
// 思路：将已有序的子序列合并，得到完全有序的序列；
// 即先使每个子序列有序，再使子序列段间有序。
// 若将两个有序表合并成一个有序表，称为 2-路归并
// 步骤：
// 申请空间，使其大小为两个已经排序序列之和，用来存放合并后的序列
// 设定两个指针，最初位置分别为两个已经排序序列的起始位置
// 比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置
// 重复上一步骤，知道某一指针达到序列尾
// 将另一序列剩下的所有元素直接复制到合并序列尾
var sortArray = function (nums) {
  function mergeSort(arr) {
    const len = arr.length;
    if (len < 2) return arr;
    let middle = Math.floor(len / 2);
    let left = arr.slice(0, middle),
      right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
  }

  function merge(left, right) {
    const res = [];
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        res.push(left.shift());
      } else {
        res.push(right.shift());
      }
    }
    while (left.length) res.push(left.shift());
    while (right.length) res.push(right.shift());
    return res;
  }
  return mergeSort(nums);
};
// 平均时间复杂度：O(nlogn);
// 最好时间复杂度：O(nlogn);
// 最坏时间复杂度：O(nlogn);
// 空间复杂度：O(n)

// 方法六：快速排序（不稳定）
// 在冒泡排序基础上的递归分治法
// 步骤：
// 从数列中挑出一个元素，作为基准pivot（基准值可以任意选择，但是选择中间的值比较好理解）
// 重新排序数列，所有元素比基准值小的摆放在基准前，比基准值大的摆在基准后面。在这个分区退出之后，该基准就处于数列的中间位置，这称为分区操作
// 递归地把小于基准值元素的子数列和大于基准值元素的子数列排序
var sortArray = function (nums) {
  function quickSort(arr) {
    if (arr.length <= 1) return arr;
    let pivotIndex = Math.floor(arr.length / 2);
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left = [],
      right = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return quickSort(left).concat([pivot], quickSort(right));
  }
  return quickSort(nums);
};
// 平均时间复杂度：O(nlogn);
// 最好时间复杂度：O(nlogn);
// 最坏时间复杂度：O(n^2);
// 空间复杂度：O(n)

// 改进
var sortArray = function (nums) {
  function quickSort(arr, left, right) {
    if (left > right) return;
    let pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  // 分区操作
  function partition(arr, left, right) {
    let pivot = arr[right];
    let pivotIndex = left;
    for (let i = left; i < right; i++) {
      if (arr[i] < pivot) {
        swap(arr, pivotIndex, i);
        pivotIndex++;
      }
    }
    // 将pivot交换到pivotIndex处，基准元素放置到最终正确位置上
    swap(arr, right, pivotIndex);
    return pivotIndex;
  }
  function swap(arr, a, b) {
    [arr[b], arr[a]] = [arr[a], arr[b]];
  }
  quickSort(nums, 0, nums.length - 1);
  return nums;
};
// 平均时间复杂度：O(nlogn);
// 最好时间复杂度：O(nlogn);
// 最坏时间复杂度：O(n^2);
// 空间复杂度：O(logn)

// 方法七：堆排序 不稳定
var sortArray = function (nums) {
  var len;
  // 建立大顶堆
  function buildMaxHeap(arr) {
    len = arr.length;
    for (let i = Math.floor(len / 2); i >= 0; i--) {
      heapify(arr, i);
    }
  }
  // 堆调整
  function heapify(arr, i) {
    var left = 2 * i + 1,
      right = 2 * i + 2,
      largest = i;

    if (left < len && arr[left] > arr[largest]) {
      largest = left;
    }
    if (right < len && arr[right] > arr[largest]) {
      largest = right;
    }
    if (largest !== i) {
      swap(arr, i, largest);
      heapify(arr, largest);
    }
  }
  function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  function heapSort(arr) {
    buildMaxHeap(arr);
    for (let i = arr.length - 1; i > 0; i--) {
      swap(arr, 0, i);
      len--;
      heapify(arr, 0);
    }
    return arr;
  }
  return heapSort(nums);
};
// 平均时间复杂度：O(nlogn);
// 最好时间复杂度：O(nlogn);
// 最坏时间复杂度：O(nlogn);
// 空间复杂度：O(1)

// 方法八：计数排序
var sortArray = function (nums) {
  function countingSort(arr) {
    const n = arr.length;
    let max = Math.max(...arr);
    let min = Math.min(...arr);

    let buckets = new Array(max - min + 1).fill(0);
    for (let item of arr) {
      buckets[item - min]++; // 解决出现负数的情况
    }
    let current = 0;
    for (let i = 0; i < buckets.length; i++) {
      while (buckets[i] > 0) {
        arr[current++] = i + min; // 将桶的编号加上最小值，变回原来的元素
        buckets[i]--;
      }
    }
    return arr;
  }

  return countingSort(nums);
};
// 平均时间复杂度：O(n + k);
// 最好时间复杂度：O(n + k);
// 最坏时间复杂度：O(n + k);
// 空间复杂度：O(k)

// 方法九：桶排序
// 稳定与否取决于每个桶的排序方式，若为快排则不稳定，为归并则稳定
var sortArray = function (nums) {
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
    left = typeof left != 'number' ? 0 : left;
    right = typeof right != 'number' ? len - 1 : right;
    if (left < right) {
      partitionIndex = partition(arr, left, right);
      quickSort(arr, left, partitionIndex - 1);
      quickSort(arr, partitionIndex + 1, right);
    }
    return arr;
  };
  //分区操作
  const partition = (arr, left, right) => {
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

  return bucketSort(nums);
};
// 平均时间复杂度：O(n + k);
// 最好时间复杂度：O(n + k);
// 最坏时间复杂度：O(n^2);
// 空间复杂度：O(n + k)

// 方法十：基数排序
