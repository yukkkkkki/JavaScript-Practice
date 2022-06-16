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

  // 找插入位置，即最大的比 num 小的数
  let left = 0;
  let right = this.data.length - 1;
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
  const n = this.data.length;
  if (!n) return null;

  const mid = Math.floor((n - 1) / 2);
  if (n % 2) return this.data[mid];

  return (this.data[mid] + this.data[mid + 1]) / 2;
};
// 时间复杂度是O(N)
