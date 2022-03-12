// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

// 示例 1：
// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// 示例 2：
// 输入：nums = [0,1]
// 输出：[[0,1],[1,0]]

// 示例 3：
// 输入：nums = [1]
// 输出：[[1]]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 方法一：回溯
var permute = function (nums) {
  let res = []; // 结果集
  let path = []; // 路径

  const dfs = (nums, path) => {
    // 结束条件
    if (path.length === nums.length) {
      return res.push(path.concat());
    }

    for (let i = 0; i < nums.length; i++) {
      // 排除不合法的选择
      if (path.indexOf(nums[i]) > -1) {
        continue;
      }
      // 做选择
      path.push(nums[i]);
      // 进入下一层决策树
      dfs(nums, path);
      // 撤销选择
      path.pop();
    }
  };

  dfs(nums, path);
  return res;
};

// 代码方面，回溯算法的框架：
// result = []
// def backtrack(路径, 选择列表):
//     if 满足结束条件:
//         result.add(路径)
//         return

//     for 选择 in 选择列表:
//         做选择
//         backtrack(路径, 选择列表)
//         撤销选择
