// 给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

// 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

// 示例 1:
// 给定数组 nums = [1,1,2],
// 函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。
// 你不需要考虑数组中超出新长度后面的元素。

// 示例 2:
// 给定 nums = [0,0,1,1,1,2,2,3,3,4],
// 函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。
// 你不需要考虑数组中超出新长度后面的元素。

// 方法一：暴力遍历数组
// 先遍历数组，若发现相同的相邻项，将该元素删除。此时数组的长度也会发生变化，我们需要
// 把 i - 1，保证遍历顺序不会出错。最后，再返回数组的长度
var removeDuplicates = function (nums) {
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] === nums[i]) {
      nums.splice(i - 1, 1);
      i--;
    }
  }
  return nums.length;
};
// 时间复杂度O(n); 空间复杂度O(1);

// 方法二：双指针
var removeDuplicates = function (nums) {
  let left = 0,
    right = 1;
  while (right < nums.length) {
    if (nums[left] !== nums[right]) {
      nums[++left] = nums[right];
    }
    right++;
  }
  return left + 1;
};
// 时间复杂度O(n); 空间复杂度O(1);
