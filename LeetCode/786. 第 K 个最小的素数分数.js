/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
// 方法一：二分查找 + 双指针
// 总体思路（二分查找）：
// 假设取一个数mid，小于mid的分数个数为count：
// 若count<k：满足条件的分数太少，需要增大mid
// 若count>k：满足条件的分数太多，需要减小mid
// 若count=k：满足条件的分数刚好，返回最大的分数
// 如何求count：
// 定义双指针 i 和 j，i 指向分子，j 指向分母
// 因为数组递增排序，某个j，只需找到第一个不满足arr[i] / arr[j] < mid的 i，累加到 count 中
// j右移，重复上述步骤
// 注意，寻找i的过程中，记得保存最大的分数，以便最后返回
var kthSmallestPrimeFraction = function (arr, k) {
  const len = arr.length;

  let [left, right] = [0, 1];
  while (true) {
    const mid = (left + right) / 2;
    let count = 0;
    // x、y代表最小的分数
    let [x, y] = [1, arr[len - 1]];
    let i = 0;
    for (let j = 1; j < len; j++) {
      while (arr[i] / arr[j] < mid) {
        // 更新最大的分数
        if (arr[i] * y > arr[j] * x) {
          x = arr[i];
          y = arr[j];
        }
        i++;
      }

      count += i;
    }
    if (count < k) left = mid;
    else if (count > k) right = mid;
    else return [x, y];
  }
};
// 时间复杂度：O(nlogC) C 是数组 arr 中元素的上界
// 空间复杂度：O(1)
// 作者：lzxjack
// 链接：https://leetcode-cn.com/problems/k-th-smallest-prime-fraction/solution/er-fen-cha-zhao-shuang-zhi-zhen-javascri-qrrj/

// 方法二：自定义排序
var kthSmallestPrimeFraction = function (arr, k) {
  const n = arr.length;
  const frac = [];
  for (let i = 0; i < n; ++i) {
    for (let j = i + 1; j < n; ++j) {
      frac.push([arr[i], arr[j]]);
    }
  }

  frac.sort((x, y) => x[0] * y[1] - y[0] * x[1]);
  return frac[k - 1];
};
// 时间复杂度：O(n^2logn)
// 空间复杂度：O(n^2)
