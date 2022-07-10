// 方法一：直接遍历
var MyCalendar = function () {
  this.bookded = [];
};

/**
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function (start, end) {
  for (const arr of this.bookded) {
    let l = arr[0];
    let r = arr[1];
    if (l < end && start < r) {
      return false;
    }
  }

  this.bookded.push([start, end]);
  return true;
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(n)
/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */
