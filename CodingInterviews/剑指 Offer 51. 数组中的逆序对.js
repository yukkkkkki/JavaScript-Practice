// 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。

// 示例 1:
// 输入: [7,5,6,4]
// 输出: 5

// 方法一：暴力双层for循环  (超时了)
var reversePairs = function (nums) {
  let count = 0;
  const n = nums.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] > nums[j]) {
        count++;
      }
    }
  }
  return count;
};
// 时间复杂度:O(n^2); 空间复杂度:O(1)

// 方法二：归并排序
var reversePairs = function (nums) {
  return merge_Sort(nums, 0, nums.length - 1);
};
function merge_Sort(arr, l, r) {
  if (l >= r) return 0;
  let mid = Math.floor((l + r) / 2);
  let res = merge_Sort(arr, l, mid) + merge_Sort(arr, mid + 1, r);
  let i = l;
  let j = mid + 1;
  const temp = [];
  while (i <= mid && j <= r) {
    if (arr[i] <= arr[j]) {
      temp.push(arr[i]);
      i++;
    } else {
      temp.push(arr[j]);
      j++;
      // 如果当前i大于j的数字，则i到mid所有数字大于j的数
      res += mid - i + 1;
    }
  }
  while (i <= mid) {
    temp.push(arr[i]);
    i++;
  }
  while (j <= r) {
    temp.push(arr[j]);
    j++;
  }
  for (let i = l, j = 0; i <= r; i++, j++) {
    arr[i] = temp[j];
  }
  return res;
}

// 参考：
// 作者：catboy
// 链接：https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/solution/javascript-gui-bing-pai-xu-by-catboy/

// console.log(reversePairs([7, 5, 6, 4]));
