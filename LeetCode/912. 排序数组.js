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
  const n = nums.length;
  if (n < 2) return nums;
  let mid = Math.floor(n / 2);
  let left = nums.slice(0, mid);
  let right = nums.slice(mid);
  return merge(sortArray(left), sortArray(right));
};

function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) result.push(left.shift());
  while (right.length) result.push(right.shift());
  return result;
}
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
  if (nums.length <= 1) return nums;
  let pivotIndex = Math.floor(nums.length / 2);
  let pivot = nums.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < pivot) {
      left.push(nums[i]);
    } else {
      right.push(nums[i]);
    }
  }
  return sortArray(left).concat([pivot], sortArray(right));
};
// 平均时间复杂度：O(nlogn);
// 最好时间复杂度：O(nlogn);
// 最坏时间复杂度：O(n^2);
// 空间复杂度：O(logn)

// 方法七：堆排序

// 方法八：计数排序

// 方法九：桶排序
