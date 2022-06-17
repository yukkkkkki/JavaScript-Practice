/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
// 方法一：双指针
var duplicateZeros = function (arr) {
  const n = arr.length;
  let top = 0; // 标记栈顶位置
  let i = -1; // 标记现在需要放置的元素位置

  // 找到原数组中对应放置在最后位置的元素位置
  while (top < n) {
    i++;
    if (arr[i] !== 0) {
      top++;
    } else {
      top += 2;
    }
  }
  let j = n - 1;
  if (top === n + 1) {
    arr[j] = 0;
    j--;
    i--;
  }

  // 在数组最后从该位置元素往前来进行模拟放置即可
  while (j >= 0) {
    arr[j] = arr[i];
    j--;
    if (arr[i] === 0) {
      arr[j] = arr[i];
      j--;
    }
    i--;
  }
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 方法二：双指针
// 从左右两侧开始用双指针记录，左边每碰到一个 0，右边就舍弃一个元素
// 一直到左边指针大于右边指针，即 i > j 的时候，才停止检测有多少个 0 需要被复制
var duplicateZeros = function (arr) {
  const n = arr.length;
  let i = 0;
  let j = n - 1; // 指向下一个即将被抛弃的元素
  let k = n - 1; // 从后往前复制需要保留的元素时，指向下一个被复制元素需要去的位置

  while (i < j) {
    if (arr[i++] === 0) {
      --j;
    }
  }

  if (i === j && arr[i] == 0) arr[k--] = arr[j--];

  while (j >= 0) {
    if (arr[j] === 0) {
      arr[k--] = 0;
    }
    arr[k--] = arr[j--];
  }
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
// 链接：https://leetcode.cn/problems/duplicate-zeros/solution/c-by-xiaohu9527-71ld/

// 方法三：一次遍历 + splice + pop
var duplicateZeros = function (arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    if (arr[i] === 0) {
      arr.splice(i, 0, 0);
      i++;
      arr.pop();
    }
  }
};
