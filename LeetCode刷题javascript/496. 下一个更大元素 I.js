// 给定两个 没有重复元素 的数组 nums1 和 nums2 ，其中nums1 是 nums2 的子集。找到 nums1 中每个元素在 nums2 中的下一个比其大的值。

// nums1 中数字 x 的下一个更大元素是指 x 在 nums2 中对应位置的右边的第一个比 x 大的元素。如果不存在，对应位置输出 -1 。

// 示例 1:
// 输入: nums1 = [4,1,2], nums2 = [1,3,4,2].
// 输出: [-1,3,-1]
// 解释:
//     对于num1中的数字4，你无法在第二个数组中找到下一个更大的数字，因此输出 -1。
//     对于num1中的数字1，第二个数组中数字1右边的下一个较大数字是 3。
//     对于num1中的数字2，第二个数组中没有下一个更大的数字，因此输出 -1。

// 示例 2:
// 输入: nums1 = [2,4], nums2 = [1,2,3,4].
// 输出: [3,-1]
// 解释:
// 对于 num1 中的数字 2 ，第二个数组中的下一个较大数字是 3 。
// 对于 num1 中的数字 4 ，第二个数组中没有下一个更大的数字，因此输出 -1 。

// 提示：
// nums1和nums2中所有元素是唯一的。
// nums1和nums2 的数组大小都不超过1000。

// 方法一：暴力求解，双重for循环，外层循环nums1，内存从nums2对应位置开始循环
var nextGreaterElement = function (nums1, nums2) {
  let res = Array(nums1.length).fill(0);
  for (let i = 0; i < nums1.length; i++) {
    for (let j = nums2.indexOf(nums1[i]); j < nums2.length; j++) {
      if (nums2[j] > nums1[i]) {
        res[i] = nums2[j];
        break;
      }
      res[i] = -1;
    }
  }
  return res;
};

// 方法二：单调栈
//整体思路：
//1.维护一个单调递减的栈，如果遇到比栈顶大的元素就是第一个比自己大的了
//2.那么用key表示当前的数，nums[i]表示比key大的第一个数
//3.枚举nums1找存在的key里的value值即可
var nextGreaterElement = function (nums1, nums2) {
  let res = [];
  const stack = [];
  let map = new Map();

  for (let i = 0; i < nums2.length; i++) {
    // 栈顶元素存在，并且当前的元素大于栈顶
    while (stack.length && nums2[i] > stack[stack.length - 1]) {
      map.set(stack.pop(), nums2[i]);
    }
    stack.push(nums2[i]);
  }

  // 栈内还有元素，说明后面没有比自己小的了
  while (stack.length) {
    map.set(stack.pop(), -1);
  }

  nums1.forEach((item) => {
    res.push(map.get(item));
  });
  return res;
};
