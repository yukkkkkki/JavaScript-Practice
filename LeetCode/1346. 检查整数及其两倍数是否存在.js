// 给你一个整数数组 arr，请你检查是否存在两个整数 N 和 M，满足 N 是 M 的两倍（即，N = 2 * M）。

// 更正式地，检查是否存在两个下标 i 和 j 满足：
// i != j
// 0 <= i, j < arr.length
// arr[i] == 2 * arr[j]
//

// 示例 1：
// 输入：arr = [10,2,5,3]
// 输出：true
// 解释：N = 10 是 M = 5 的两倍，即 10 = 2 * 5 。

// 示例 2：
// 输入：arr = [7,1,14,11]
// 输出：true
// 解释：N = 14 是 M = 7 的两倍，即 14 = 2 * 7 。

// 示例 3：
// 输入：arr = [3,1,7,11]
// 输出：false
// 解释：在该情况下不存在 N 和 M 满足 N = 2 * M 。
/**
 * @param {number[]} arr
 * @return {boolean}
 */
// 方法一：排序 + 双指针
// 先对所有数字进行排序。然后维护两个指针：指针 p 遍历数字 x，指针 q 寻找 2x。
var checkIfExist = function (arr) {
  let map = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i]) || map.has(arr[i] / 4)) return true;
    map.set(arr[i] / 2, i);
  }
  return false;
};
