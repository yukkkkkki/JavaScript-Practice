// 如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。

// 例如，
// [2,3,4] 的中位数是 3
// [2,3] 的中位数是 (2 + 3) / 2 = 2.5

// 设计一个支持以下两种操作的数据结构：
//     void addNum(int num) - 从数据流中添加一个整数到数据结构中。
//     double findMedian() - 返回目前所有元素的中位数。

// 示例 1：
// 输入：
// ["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]
// [[],[1],[2],[],[3],[]]
// 输出：[null,null,null,1.50000,null,2.00000]

// 示例 2：
// 输入：
// ["MedianFinder","addNum","findMedian","addNum","findMedian"]
// [[],[2],[],[3],[]]
// 输出：[null,null,2.00000,null,2.50000]

// 方法一：二分查找
var MedianFinder = function () {
  this.data = [];
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  if (!this.data.length) {
    this.data.push(num);
    return;
  }

  let left = 0,
    right = this.data.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (this.data[mid] === num) {
      this.data.splice(mid, 0, num);
      return;
    } else if (this.data[mid] < num) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  this.data.splice(right + 1, 0, num);
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  const length = this.data.length;
  if (!length) {
    return null;
  }

  const mid = Math.floor((length - 1) / 2);
  if (length % 2) {
    return this.data[mid];
  }
  return (this.data[mid] + this.data[mid + 1]) / 2;
};
// 时间复杂度是O(N)
