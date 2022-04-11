// 给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。

// 函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。

// 说明:
// 返回的下标值（index1 和 index2）不是从零开始的。
// 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。

// 示例:
// 输入: numbers = [2, 7, 11, 15], target = 9
// 输出: [1,2]
// 解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2。

// 方法一：暴力法
var twoSum = function (numbers, target) {
  const n = numbers.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] == target) {
        return [i + 1, j + 1];
      }
    }
  }
  return [];
};

// 方法二：双指针
var twoSum = function (numbers, target) {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    else if (sum < target) left++;
    else right--;
  }
  return [];
};

// 方法三：hash map
var twoSum = function (numbers, target) {
  let map = new Map();
  for (let i = 0; i < numbers.length; i++) {
    const temp = target - numbers[i];
    if (map.has(temp)) {
      return [map.get(temp) + 1, i + 1];
    } else {
      map.set(numbers[i], i);
    }
  }
  return [-1, -1];
};

// 方法四：二分查找
var twoSum = function (numbers, target) {
  const n = numbers.length;
  for (let i = 0; i < n; i++) {
    let l = i + 1;
    let r = n - 1;
    while (l <= r) {
      let mid = Math.floor((l + r) / 2);
      const sum = numbers[i] + numbers[mid];
      if (sum === target) {
        return [i + 1, mid + 1];
      } else if (sum < target) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
  }
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(1)
