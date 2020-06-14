// 根据每日 气温 列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替。

// 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。

// 提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。

// 方法一：暴力求解
var dailyTemperatures = function (T) {
  let res = Array(T.length).fill(0);
  //console.log(res);
  for (let i = 0; i < T.length - 1; i++) {
    for (let j = i + 1; j < T.length; j++) {
      if (T[j] > T[i]) {
        res[i] = j - i;
        break;
      }
    }
  }
  return res;
};

// 方法二：单调栈
// 栈空的情况下，当前元素入栈
// 当前元素比栈顶大，则让小项出栈，栈顶更新，直到当前元素比栈顶小，停止出栈
// 此时的栈顶元素就是当前项右边的第一个比自己大的元素，计算距离并让当前项入栈

var dailyTemperatures = function (T) {
  const res = new Array(T.length).fill(0);
  const stack = [];
  for (let i = T.length - 1; i >= 0; i--) {
    while (stack.length && T[i] >= T[stack[stack.length - 1]]) {
      stack.pop();
    }

    if (stack.length && T[i] < T[stack[stack.length - 1]]) {
      res[i] = stack[stack.length - 1] - i;
    }
    stack.push(i);
  }
  return res;
};

// 总结
// 单调递增栈：从 栈底 到 栈顶 递增，栈顶大
// 单调递减栈：从 栈底 到 栈顶 递减，栈顶小

// 什么时候用单调栈
// 通常是一维数组，要寻找任一元素右边（左边）第一个比自己大（小）的元素
// 且要求 O(n) 的时间复杂度

// 模板套路
// 单调递增栈会剔除波峰，留下波谷；单调递减栈会剔除波谷，留下波峰

// 当前项向左找第一个比自己大的位置 —— 从左向右维护一个单调递减栈
// 当前项向左找第一个比自己小的位置 —— 从左向右维护一个单调递增栈
// 当前项向右找第一个比自己大的位置 —— 从右向左维护一个单调递减栈
// 当前项向右找第一个比自己小的位置 —— 从右向左维护一个单调递增栈

// 伪代码描述
// insert x
// while !stack.empty() && stack.top() < x
//     stack.pop()
// stack.push(x)

// 参考作者：hyj8
// 链接：https://leetcode-cn.com/problems/daily-temperatures/solution/shou-hui-ti-jie-fang-da-guan-cha-dan-diao-zhan-si-/