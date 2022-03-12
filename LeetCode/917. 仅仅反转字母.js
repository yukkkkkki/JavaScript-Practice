/**
 * @param {string} s
 * @return {string}
 */
// 方法一：双指针
// 我们使用 left 指针从左边开始扫描字符串 s，right 指针从右边开始扫描字符串 s
// 如果两个指针都扫描到字母，且 left < right，那么交换 s[left] 和 s[right]，然后继续进行扫描；否则表明反转过程结束，返回处理后的字符串。
var reverseOnlyLetters = function (s) {
  const n = s.length;
  const arr = [...s];
  let left = 0;
  let right = n - 1;

  while (true) {
    while (left < right && !/^[a-zA-Z]+$/.test(s[left])) {
      left++;
    }

    while (right > left && !/^[a-zA-Z]+$/.test(s[right])) {
      // 判断右边是否扫描到字母
      right--;
    }

    if (left >= right) break;

    swap(arr, left, right);
    left++;
    right--;
  }
  return arr.join('');
};

const swap = (arr, left, right) => {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
