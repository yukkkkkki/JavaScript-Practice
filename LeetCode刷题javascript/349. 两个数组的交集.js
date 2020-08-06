// 给定两个数组，编写一个函数来计算它们的交集。

// 示例 1：
// 输入：nums1 = [1,2,2,1], nums2 = [2,2]
// 输出：[2]

// 示例 2：
// 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出：[9,4]

// 方法一：模拟哈希
// 遍历第一个数组，将第一个数组的值、该值出现的次数，以(key:value)的形式存储下来，接着遍历
// 第二个数组，判断是否在(key:value)中存在，存在则 value 减去 1，继续。
var intersection = function (nums1, nums2) {
  const hashmap = {};
  for (let i = 0; i < nums1.length; i++) {
    if (hashmap[nums1[i]]) {
      hashmap[nums1[i]] += 1;
    } else {
      hashmap[nums1[i]] = 1;
    }
  }

  const result = [];
  for (let i = 0; i < nums2.length; i++) {
    if (hashmap[nums2[i]]) {
      result.push(nums2[i]);
      hashmap[nums2[i]] -= 1;
    }
  }
  return Array.from(new Set(result));
};
// 时间复杂度O(n)；空间复杂度O(n)

// 方法二：长短数组
// 找出两个数组中的长短数组，遍历短数组，判断值是否存在于长数组中，如果存在，记录并且删除
// 长数组中的该值，继续。
var intersection = function (nums1, nums2) {
  const longerArr = nums1.length > nums2.length ? nums1 : nums2;
  const shorterArr = nums1.length > nums2.length ? nums2 : nums1;
  const result = [];
  for (let i = 0; i < shorterArr.length; i++) {
    if (longerArr.includes(shorterArr[i])) {
      result.push(shorterArr[i]);
      longerArr.splice(longerArr.indexOf(shorterArr[i]), 1);
    }
  }
  return Array.from(new Set(result));
};
// 时间复杂度O(n)；空间复杂度O(n)

// 方法三：filter + includes，最后Array.from(new Set(result))去重
var intersection = function (nums1, nums2) {
  let result = nums1.filter((i) => nums2.includes(i));
  return Array.from(new Set(result));
};
