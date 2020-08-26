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
var permuteUnique = function (nums) {
  let n = nums.length;
  nums = nums.sort((a, b) => {
    return a - b;
  });
  let res = [];
  let hash = {};

  const backtrack = (path) => {
    if (path.length === n) {
      res.push(path);
      return;
    }

    for (let i = 0; i < n; i++) {
      if (hash[i] || (i > 0 && !hash[i - 1] && nums[i - 1] == nums[i]))
        continue;

      hash[i] = true;
      path.push(nums[i]);
      backtrack([...path]);
      hash[i] = false;
      path.pop();
    }
  };
  backtrack([]);
  return res;
};

console.log(permuteUnique([1, 1, 2]));
