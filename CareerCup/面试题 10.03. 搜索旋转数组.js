// 搜索旋转数组。给定一个排序后的数组，包含n个整数，但这个数组已被旋转过很多次了，次数不详。请编写代码找出数组中的某个元素，假设数组元素原先是按升序排列的。若有多个相同元素，返回索引值最小的一个。

// 示例1:
//  输入: arr = [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14], target = 5
//  输出: 8（元素5在该数组中的索引）

// 示例2:
//  输入：arr = [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14], target = 11
//  输出：-1 （没有找到）
/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var search = function (arr, target) {
  const map = new Map();

  for (let i = 0, len = arr.length; i < len; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], i);
    }
  }

  return map.has(target) ? map.get(target) : -1;
};
