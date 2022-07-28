var MyCalendarTwo = function () {
  this.booked = [];
  this.overlaps = [];
};

/**
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
MyCalendarTwo.prototype.book = function (start, end) {
  for (const arr of this.overlaps) {
    let l = arr[0];
    let r = arr[1];
    if (l < end && start < r) {
      return false;
    }
  }

  for (const arr of this.booked) {
    let l = arr[0];
    let r = arr[1];
    if (l < end && start < r) {
      this.overlaps.push([Math.max(l, start), Math.min(r, end)]);
    }
  }

  this.booked.push([start, end]);
  return true;
};

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * var obj = new MyCalendarTwo()
 * var param_1 = obj.book(start,end)
 */
// 时间复杂度：O(n^2)
// 空间复杂度：O(n)
