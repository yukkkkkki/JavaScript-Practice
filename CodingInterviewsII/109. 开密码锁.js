/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
// 方法一：广度优先搜索
var openLock = function (deadends, target) {
  if (target === '0000') return 0;

  const dead = new Set(deadends);
  if (dead.has('0000')) return -1;

  let step = 0; // 旋转的次数
  const queue = ['0000'];
  const seen = new Set();
  seen.add('0000');

  while (queue.length) {
    ++step;
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const status = queue.shift();
      for (const nextStatus of get(status)) {
        if (!seen.has(nextStatus) && !dead.has(nextStatus)) {
          if (nextStatus === target) return step;

          queue.push(nextStatus);
          seen.add(nextStatus);
        }
      }
    }
  }

  return -1;
};
const numPrev = (x) => {
  return x === '0' ? '9' : parseInt(x) - 1 + '';
};
const numSucc = (x) => {
  return x === '9' ? '0' : parseInt(x) + 1 + '';
};
// 枚举 status 通过一次旋转得到的数字
const get = (status) => {
  const res = [];
  const arr = Array.from(status);

  for (let i = 0; i < 4; i++) {
    const num = arr[i];
    arr[i] = numPrev(num);
    res.push(arr.join(''));
    arr[i] = numSucc(num);
    res.push(arr.join(''));
    arr[i] = num;
  }

  return res;
};
// 时间复杂度：O(b^d · d^2 + md)
// 空间复杂度：O(b^d + m)
