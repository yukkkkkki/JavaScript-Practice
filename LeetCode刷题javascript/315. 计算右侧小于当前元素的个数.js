// 给定一个整数数组 nums，按要求返回一个新数组 counts。数组 counts 有该性质： counts[i] 的值是  nums[i] 右侧小于 nums[i] 的元素的数量。

// 示例:
// 输入: [5,2,6,1]
// 输出: [2,1,1,0]
// 解释:
// 5 的右侧有 2 个更小的元素 (2 和 1).
// 2 的右侧仅有 1 个更小的元素 (1).
// 6 的右侧有 1 个更小的元素 (1).
// 1 的右侧有 0 个更小的元素.

// 方法一：暴力法
var countSmaller = function (nums) {
  const counts = [];
  for (let i = 0; i < nums.length; i++) {
    let counter = 0;
    for (let j = nums.length - 1; j > i; j--) {
      if (nums[i] > nums[j]) {
        counter++;
      }
    }
    counts.push(counter);
  }
  return counts;
};

// 方法二：二分查找
var countSmaller = function (nums) {
  const len = nums.length;
  if (len == 0) return nums;
  const counts = new Array(len);
  const sorted = [];
  for (let i = len - 1; i >= 0; i--) {
    const index = findIndex(sorted, nums[i]);
    sorted.splice(index, 0, nums[i]);
    counts[i] = index;
  }
  return counts;
};
const findIndex = (arr, target) => {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  // 目标值比lo元素大，lo还需+1
  if (arr[lo] < target) return lo + 1;
  // 否则 返回lo
  return lo;
};
// 时间复杂度：遍历nums数组：O(n)，一次遍历做了二分查找：O(logn)，元素插入：O(n)，综合：O(n(logn+n))
// 空间复杂度：O(n)

// 方法三：归并排序
// 思路
//     题目求每个元素，比自己小的右边元素的个数，归并排序也是干类似的事情：把数组分成两部分，合并两部分元素，谁小合并谁
//     用两个指针 i j 分别指向 leftPart 和 rightPart 的开头
//     固定 i ，指针 j 扫描右边元素，比 leftPart[i] 小的就推入 merged，直到遇到不比它小的，这样我们获知了部分比 leftPart[i] 小的个数，同时把 leftPart[i] 也推入 merged 数组
//     重复上面过程，直到 i 越界，这样就有了，leftPart 每个元素对应的，rightPart 中比它小的元素个数
//     刚才提到直到遇到不再小于它的元素，后面可能还有比它小的元素，我们将它和剩下的元素整体推入 merged 即可，让递归继续做就好
// 作者：hyj8
// 链接：https://leetcode-cn.com/problems/count-of-smaller-numbers-after-self/solution/shou-hua-tu-jie-er-fen-cha-zhao-si-lu-by-hyj8/
const countSmaller = (nums) => {
  const counts = new Array(nums.length).fill(0);
  let indexedNums = new Array(nums.length); // indexedNums[i]包含元素的位置信息
  for (let i = 0; i < indexedNums.length; i++) {
    // 让大家都能看懂 就没用JS的map
    indexedNums[i] = {
      value: nums[i],
      index: i,
    };
  }
  const mergeSort = (left, right) => {
    if (right - left <= 1) return indexedNums.slice(left, right); // 不用sort了
    const pivot = (left + right) >>> 1;
    const leftPart = mergeSort(left, pivot);
    const rightPart = mergeSort(pivot, right);
    const merged = [];
    let i = 0;
    let j = 0;
    while (i < leftPart.length) {
      // 遍历左边部分的元素
      while (j < rightPart.length && rightPart[j].value < leftPart[i].value) {
        // 考察右边部分的元素，遇到小于当前左边元素的，推入merged数组
        merged.push(rightPart[j]);
        j++; // 统计当前右边元素中，比当前左边元素小的元素个数
      }
      counts[leftPart[i].index] += j; // 在递归中累加j，统计出右边元素比它小的个数
      merged.push(leftPart[i]); // 较小的进来后，自己也进去了
      i++; // 考察下一个左边元素
    }
    // rightPart[j]比左边元素都大，while结束，将它和它后面的元素推入merged数组，继续递归
    merged.push(...rightPart.slice(j));
    return merged;
  };
  mergeSort(0, indexedNums.length);
  return counts;
};
// 时间复杂度：O(nlogn)
