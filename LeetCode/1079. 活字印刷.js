// 你有一套活字字模 tiles，其中每个字模上都刻有一个字母 tiles[i]。返回你可以印出的非空字母序列的数目。

// 注意：本题中，每个活字字模只能使用一次。

// 示例 1：
// 输入："AAB"
// 输出：8
// 解释：可能的序列为 "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA"。

// 示例 2：
// 输入："AAABBC"
// 输出：188

// 方法一：回溯
var numTilePossibilities = function (tiles) {
  const n = tiles.length;
  const set = new Set();
  const used = new Array(n).fill(false);

  const backTrack = (tmpPath) => {
    if (tmpPath.length) {
      set.add(tmpPath);
    }

    for (let i = 0; i < n; i++) {
      if (used[i]) continue;
      used[i] = true;
      tmpPath += tiles[i];
      backTrack(tmpPath);
      tmpPath = tmpPath.slice(0, tmpPath.length - 1);
      used[i] = false;
    }
  };

  backTrack('');
  return set.size;
};

// console.log(numTilePossibilities('AAABBC'));
