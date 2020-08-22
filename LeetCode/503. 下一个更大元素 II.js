// 给定一个循环数组（最后一个元素的下一个元素是数组的第一个元素），输出每个元素的下一个更大元素。数字 x 的下一个更大的元素是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1。

// 示例 1:
// 输入: [1,2,1]
// 输出: [2,-1,2]
// 解释: 第一个 1 的下一个更大的数是 2；
// 数字 2 找不到下一个更大的数；
// 第二个 1 的下一个最大的数需要循环搜索，结果也是 2。

// 单调栈
var nextGreaterElements = function (nums) {
  const doubleNums = [...nums, ...nums];
  const { length } = doubleNums;
  if (length === 0) return doubleNums;
  let stack = [];
  let res = new Array(length).fill(-1);
  for (let i = 0; i < length; i++) {
    while (
      stack.length &&
      doubleNums[i] > doubleNums[stack[stack.length - 1]]
    ) {
      let index = stack.pop();
      res[index] = doubleNums[i];
    }
    stack.push(i);
  }
  return res.slice(0, res.length / 2);
};

// 方法二(还是单调栈)
var nextGreaterElements = function (nums) {
  let stack = [],
    res = new Array(nums.length).fill(-1),
    downIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > stack[stack.length - 1][1]) {
      res[stack.pop()[0]] = nums[i];
    }
    if (stack.length === 0) {
      downIndex = i;
    }

    stack.push([i, nums[i]]);
  }
  while (stack.length > 0) {
    let indexNum = stack.pop();
    for (let j = 0; j <= downIndex; j++) {
      if (indexNum[1] < nums[j]) {
        res[indexNum[0]] = nums[j];
        break;
      }
    }
  }

  return res;
};
