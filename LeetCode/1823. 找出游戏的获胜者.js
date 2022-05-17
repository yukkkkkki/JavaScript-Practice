/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findTheWinner = function (n, k) {
  let p = 0;
  for (let i = 2; i <= n; i++) {
    p = (p + k) % i;
  }
  return p + 1;
};

// 方法二：模拟 + 队列
var findTheWinner = function (n, k) {
  const queue = [];
  for (let i = 1; i <= n; i++) {
    queue.push(i);
  }

  while (queue.length > 1) {
    for (let i = 1; i < k; i++) {
      queue.push(queue.shift());
    }
    queue.shift();
  }

  return queue[0];
};
// 时间复杂度：O(nk)
// 空间复杂度：O(n)
