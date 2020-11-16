// 给你两个数组，arr1 和 arr2，

// arr2 中的元素各不相同
// arr2 中的每个元素都出现在 arr1 中
// 对 arr1 中的元素进行排序，使 arr1 中项的相对顺序和 arr2 中的相对顺序相同。未在 arr2 中出现过的元素需要按照升序放在 arr1 的末尾。

// 示例：
// 输入：arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
// 输出：[2,2,2,1,4,3,3,9,6,7,19]

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */

// 方法一：自定义排序
// 思路：
// 按 arr2 推入（需要一次遍历）
// 连续重复数字有几个—— 根据 arr1 统计出现次数，放在 counts 容器（一次遍历）
// 剩余数字，把目光投向 counts 容器 （一次遍历）
// 作者：xiao_ben_zhu
// 链接：https://leetcode-cn.com/problems/relative-sort-array/solution/bu-shi-yong-sort-pai-xu-de-jie-fa-1122-shu-zu-de-x/
var relativeSortArray = function (arr1, arr2) {
  const counts = new Array(1001).fill(0);
  for (const n of arr1) {
    counts[n]++;
  }
  const res = [];
  for (const n of arr2) {
    while (counts[n] > 0) {
      res.push(n);
      counts[n]--;
    }
  }
  for (let i = 0; i < counts.length; i++) {
    // 非0项的索引 循环推入res
    while (counts[i] > 0) {
      res.push(i);
      counts[i]--;
    }
  }
  return res;
};
