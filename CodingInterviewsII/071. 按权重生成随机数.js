/**
 * @param {number[]} w
 */
var Solution = function (w) {
  pre = new Array(w.length).fill(0);
  pre[0] = w[0];
  for (let i = 1; i < w.length; i++) {
    pre[i] = pre[i - 1] + w[i];
  }
  this.total = _.sum(w);
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function () {
  const x = Math.floor(Math.random() * this.total) + 1;

  const binarySearch = (x) => {
    let low = 0;
    let high = pre.length - 1;
    while (low < high) {
      const mid = Math.floor((high - low) / 2) + low;
      if (pre[mid] < x) low = mid + 1;
      else high = mid;
    }
    return low;
  };

  return binarySearch(x);
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */
// 时间复杂度：初始化 -> O(n); 每次选择 -> O(logn)
// 空间复杂度：O(n)
