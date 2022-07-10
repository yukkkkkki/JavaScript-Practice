// 方法一：直接遍历
var MyCalendar = function () {
  this.booked = [];
};

/**
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function (start, end) {
  for (const arr of this.booked) {
    let l = arr[0];
    let r = arr[1];
    if (l < end && start < r) {
      return false;
    }
  }
  this.booked.push([start, end]);
  return true;
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */
// 时间复杂度：O(n^2)
// 空间复杂度：O(n)

// 方法二：二分查找
var MyCalendar = function () {
  this.booked = [];
};

/**
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function (start, end) {
  let left = 0;
  let right = this.booked.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const [e1, e2] = this.booked[mid];
    if (start >= e2) {
      left = mid + 1;
    } else if (end <= e1) {
      right = mid;
    } else {
      return false;
    }
  }

  this.booked.splice(left, 0, [start, end]);
  return true;
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(n)
