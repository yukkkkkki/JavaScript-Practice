// 给定一个可包含重复数字的序列，返回所有不重复的全排列。

// 示例:
// 输入: [1,1,2]
// 输出:
// [
//   [1,1,2],
//   [1,2,1],
//   [2,1,1]
// ]

// 递归回溯
var permuteUnique = function (nums) {
  let n = nums.length;
  let res = [];
  let hash = {};

  let backtrack = (Path) => {
    if (
      Path.length == n &&
      JSON.stringify(res).indexOf(JSON.stringify(Path)) == -1
    ) {
      res.push(Path);
      return;
    }
    for (let i = 0; i < n; i++) {
      if (!hash[i + '-' + nums[i]]) {
        hash[i + '-' + nums[i]] = true;
        Path.push(nums[i]);
        backtrack([...Path]);
        hash[i + '-' + nums[i]] = false;
        Path.pop();
      }
    }
  };
  backtrack([]);
  return res;
};

// 方法二：递归回溯 + 减枝
// 剪枝:
// 排序原数组
// 相邻两个相同的元素，跳过当前元素，从下一个元素开始组合
// 从源头减少重复数组进入 res
// 从源头判重，重复则子组合都无需进行组合
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  const res = [];
  nums.sort((a, b) => a - b);
  const vis = new Array(nums.length).fill(false);

  const backTrack = (idx, path) => {
    if (idx === nums.length) {
      res.push(path.slice());
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (vis[i] || (i > 0 && nums[i] === nums[i - 1] && !vis[i - 1])) {
        continue;
      }

      path.push(nums[i]);
      vis[i] = true;
      backTrack(idx + 1, path);
      vis[i] = false;
      path.pop();
    }
  };

  backTrack(0, []);
  return res;
};

console.log(permuteUnique([1, 1, 2]));
