// 方法一：队列
var RecentCounter = function () {
  this.queue = [];
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
  this.queue.push(t);

  // 当在时间 t 收到请求时，为了求出 [t − 3000, t] 内发生的请求数
  // 我们可以不断从队首弹出早于t − 3000 的时间
  while (this.queue[0] < t - 3000) {
    this.queue.shift();
  }

  return this.queue.length;
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
// 时间复杂度：均摊 O(1)
// 空间复杂度：O(L)
