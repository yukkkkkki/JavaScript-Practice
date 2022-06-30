/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// 方法一：暴力求解
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
// 时间复杂度：O(mn)
// 空间复杂度：O(1)

// 方法二：单调栈 + 哈希表
// 倒序遍历 nums2，并用单调栈中维护当前位置右边的更大的元素列表，从栈底到栈顶的元素是单调递减的
var nextGreaterElement = function (nums1, nums2) {
  // key：元素值；value：右边第一个更大元素
  const map = new Map();
  const stack = [];

  for (let i = nums2.length - 1; i >= 0; i--) {
    const num = nums2[i];
    // 将当前单调栈中所有小于 nums2[i] 的元素弹出单调栈
    while (stack.length && num >= stack[stack.length - 1]) {
      stack.pop();
    }

    // 将元素值与其右边第一个更大的元素值的对应关系存入哈希表。
    map.set(num, stack.length ? stack[stack.length - 1] : -1);
    // 当前位置右边的第一个更大的元素即为栈顶元素
    stack.push(num);
  }

  const res = new Array(nums1.length).fill(0).map((v, i) => map.get(nums1[i]));
  return res;
};
// 时间复杂度：O(m + n)
// 空间复杂度：O(n)
