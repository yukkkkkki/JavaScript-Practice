/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 */
// 方法一：广度优先搜索
var minMutation = function (start, end, bank) {
  if (start === end) return 0;

  const cnt = new Set(bank);
  // 最终的基因序列不在 bank 中
  if (!cnt.has(end)) return -1;

  const keys = ["A", "C", "G", "T"];
  const queue = [start];
  const visited = new Set();
  visited.add(start);

  let step = 1;
  while (queue.length) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      // 将可能变换的基因 curr 从队列中取出
      const curr = queue.shift();

      // 依次尝试改变基因 curr 的一个字符，并尝试所有可能的基因变化序列
      for (let j = 0; j < 8; j++) {
        for (let k = 0; k < 4; k++) {
          if (keys[k] !== curr[j]) {
            const s_copy = [...curr];
            s_copy[j] = keys[k];
            const next = s_copy.join("");

            if (!visited.has(next) && cnt.has(next)) {
              // 如果当前变换后的基因序列与 end 相等，则返回最小的变化次数即可
              if (next === end) return step;

              queue.push(next);
              visited.add(next);
            }
          }
        }
      }
    }
    step++;
  }

  return -1;
};
// 时间复杂度：O(C x n x m)
// 空间复杂度：O(n x m)
