/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
// 方法一：广度优先搜索
var openLock = function (deadends, target) {
  if (target === "0000") return 0;

  const dead = new Set(deadends);
  if (dead.has("0000")) return -1;

  let step = 0;
  const queue = ["0000"];
  const seen = new Set();
  seen.add("0000");

  while (queue.length) {
    ++step;
    const size = queue.length;

    for (let i = 0; i < size; ++i) {
      const curr = queue.shift();

      for (const next of get(curr)) {
        if (!seen.has(next) && !dead.has(next)) {
          if (next === target) return step;

          queue.push(next);
          seen.add(next);
        }
      }
    }
  }

  return -1;
};

// 枚举 status 通过一次旋转得到的数字
const get = (status) => {
  const ret = [];
  const arr = Array.from(status);

  for (let i = 0; i < 4; ++i) {
    const num = arr[i];
    arr[i] = numPrev(num);
    ret.push(arr.join(""));

    arr[i] = numSucc(num);
    ret.push(arr.join(""));

    arr[i] = num;
  }

  return ret;
};

const numPrev = (x) => {
  return x === "0" ? "9" : parseInt(x) - 1 + "";
};

const numSucc = (x) => {
  return x === "9" ? "0" : parseInt(x) + 1 + "";
};
// 时间复杂度：O(b^d · d^2 + md)
// 空间复杂度：O(b^d · d + m)
