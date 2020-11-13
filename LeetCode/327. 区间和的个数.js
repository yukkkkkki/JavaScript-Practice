// 给定一个整数数组 nums，返回区间和在 [lower, upper] 之间的个数，包含 lower 和 upper。
// 区间和 S(i, j) 表示在 nums 中，位置从 i 到 j 的元素之和，包含 i 和 j (i ≤ j)。

// 说明:
// 最直观的算法复杂度是 O(n2) ，请在此基础上优化你的算法。

// 示例:
// 输入: nums = [-2,5,-1], lower = -2, upper = 2,
// 输出: 3
// 解释: 3个区间分别是: [0,0], [2,2], [0,2]，它们表示的和分别为: -2, -1, 2。

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
// 方法一：归并排序
// 思路：
// 设前缀和数组为 preSum，则问题等价于求所有的下标对(i, j)，满足
// preSum[j] - preSum[i] ∈ [lower, upper]
// 给定两个升序排列的数组 n1，n2，试找出所有的下标对（i,j），满足：
// n2[j] - n1[i] ∈ [lower, upper]
// 在已知两个数组均为升序的情况下：我们在n2中维护两个指针 l 和 r，初始都指向n2的起始位置
// 随后，考察n1的第一个元素:
//    首先，不断地将指针 l 向右移动，直到 n2[l] >= n1[0] + lower为止，此时，l及其右边的元素均大于或等于n1[0] + lower
//    随后，再不断地将指针 r 向右移动，直到 n2[r] > n1[0] + upper为止，则 r 左边的元素均小于或等于 n1[0] + upper
// 故区间[l,r)中的所有下标 j ，都满足
// n2[j] - n1[0] ∈ [lower, upper]
// 接下来我们考察n1的第二个元素
// 不断地进行上述过程，并对于 n1 中的每一个下标，都记录相应的区间 [l,r) 的大小。最终，我们就统计得到了满足条件的下标对 (i,j) 的数量。
const countRangeSumRecursive = (sum, lower, upper, left, right) => {
  if (left === right) {
    return 0;
  } else {
    const mid = Math.floor((left + right) / 2);
    const n1 = countRangeSumRecursive(sum, lower, upper, left, mid);
    const n2 = countRangeSumRecursive(sum, lower, upper, mid + 1, right);
    let ret = n1 + n2;

    // 首先统计下标对的数量
    let i = left;
    let l = mid + 1;
    let r = mid + 1;
    while (i <= mid) {
      while (l <= right && sum[l] - sum[i] < lower) l++;
      while (r <= right && sum[r] - sum[i] <= upper) r++;
      ret += r - l;
      i++;
    }

    // 随后合并两个排序数组
    const sorted = new Array(right - left + 1);
    let p1 = left,
      p2 = mid + 1;
    let p = 0;
    while (p1 <= mid || p2 <= right) {
      if (p1 > mid) {
        sorted[p++] = sum[p2++];
      } else if (p2 > right) {
        sorted[p++] = sum[p1++];
      } else {
        if (sum[p1] < sum[p2]) {
          sorted[p++] = sum[p1++];
        } else {
          sorted[p++] = sum[p2++];
        }
      }
    }
    for (let i = 0; i < sorted.length; i++) {
      sum[left + i] = sorted[i];
    }
    return ret;
  }
};
var countRangeSum = function (nums, lower, upper) {
  let s = 0;
  const sum = [0];
  for (const v of nums) {
    s += v;
    sum.push(s);
  }
  return countRangeSumRecursive(sum, lower, upper, 0, sum.length - 1);
};
