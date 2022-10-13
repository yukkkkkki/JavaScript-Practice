/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// 方法一：归并排序
// 开辟一个长度为 nums1 + nums2 的空间，用两个指针遍历两个数组，把小的放到新数组里
// 沿用归并排序的思路，用三个指针
// 先比较较大的数，只需要把大的数放到数组nums1的后面即可
// 如果先从小的比较，需要把数组nums1的所有数往后挪一位，时间复杂度较高
var merge = function (nums1, m, nums2, n) {
  let index1 = m - 1;
  let index2 = n - 1;
  let tail = m + n - 1;

  while (index2 >= 0) {
    if (nums1[index1] > nums2[index2]) {
      nums1[tail] = nums1[index1];
      index1--;
      tail--;
    } else {
      nums1[tail] = nums2[index2];
      index2--;
      tail--;
    }
  }

  return nums1;
};

// 方法二：双指针 从前往后遍历
// 先简化问题，从合并数组简化成合并两个元素。分别从两个数组中取出一个元素进行比较，比较完
// 后将较小元素合并进结果数组，较大元素继续和另一个数组中取的下一个元素比较，如此循环，直
// 到某个数组中的元素都被比较过时，剩下的数组中未被比较过的元素直接按顺序放到结果数组中。
var merge = function (nums1, m, nums2, n) {
  const result = [];
  let j = 0;
  let k = 0;
  while (j < m && k < n) {
    // 比较 nums1 中取的值与 nums2 中取的值，将较小值 push 到结果数组中
    // 并将下标往后加一，下次循环取后一个值进行比较
    if (nums1[j] > nums2[k]) {
      result.push(nums2[k]);
      k++;
    } else {
      result.push(nums1[j]);
      j++;
    }
  }

  if (result.length < m + n) {
    // 如果 nums1 遍历完了，则说明 nums2 未遍历完全，
    // 将 nums2 中剩余未比较的数据直接 push 到 merge 结果数组中
    // 反之亦然
    if (j === m) {
      result.push(...nums2.slice(k, n));
    } else {
      result.push(...nums1.slice(j, m));
    }
  }
  // 清空 nums1，将 merge 结果 push 到 nums1 中
  nums1.splice(0, nums1.length);
  nums1.push(...result);
};
// 时间复杂度：O(m + n); 空间复杂度：O(m)

// 双指针，从后往前遍历
// 1.定义一个指针 p，指向 nums1 数组最后一个位置(m + n - 1)。
// 2.比较 nums1[m - 1] 和 nums2[n -1] 两个元素，将较大元素放到 nums1[p] 中
// 3.指针 p 往前移动一位，，较大元素所在数组往前继续取出一个元素与上次较小元素进行比较，将较大元素放到 nums1[p] 中
// 4.循环第 3 步，直到某个数组中的元素全部被比较过，因为 nums1 和 nums2 数组都是有序数组，所以另一数组未比较的元素
//   肯定是较小的那部分元素，直接将剩余元素放到 nums1 的头部
var merge = function (nums1, m, nums2, n) {
  let currentInsertIndex = nums1.length - 1;
  while (currentInsertIndex >= 0 && n > 0 && m > 0) {
    if (nums1[m - 1] > nums2[n - 1]) {
      nums1[currentInsertIndex--] = nums1[m - 1];
      m--;
    } else {
      nums1[currentInsertIndex--] = nums2[n - 1];
      n--;
    }
  }

  // nums2 未遍历完成，将 nums2 中剩余未遍历的数据插入到 nums1 头部
  // nums1 未遍历完成不用关心，已排序好了
  if (n > 0) {
    nums1.splice(0, n, ...nums2.slice(0, n));
  }
};
// 时间复杂度：O(m + n); 空间复杂度：O(1)
