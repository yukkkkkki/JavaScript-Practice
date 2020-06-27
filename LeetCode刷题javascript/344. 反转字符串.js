// 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。

// 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

// 你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。

// 示例 1：
// 输入：["h","e","l","l","o"]
// 输出：["o","l","l","e","h"]

// 示例 2：
// 输入：["H","a","n","n","a","h"]
// 输出：["h","a","n","n","a","H"]

// 方法一 首尾替换法
// 首尾替换法，逐位遍历，进行交换
// 时间复杂度： O(n)
// 空间复杂度： O(1)
var reverseString = function (s) {
  let len = s.length;
  for (let i = 0; i < len / 2; i++) {
    [s[i], s[len - 1 - i]] = [s[len - 1 - i], s[i]];
  }
  return s;
};

// 方法二
var reverseString = function (s) {
  return s.reverse();
};

// 方法三 双指针
var reverseString = function (s) {
  let i = 0;
  x = s.length - 1;
  while (i < x) {
    [s[i], s[x]] = [s[x], s[i]];
    i++;
    x--;
  }
  return s;
};

// 方法四
// 从尾往头往原字符串后追加，然后splice出追加出来的字符串
var reverseString = function (s) {
  let l1 = s.length;
  for (let i = s.length - 1; i >= 0; i--) {
    let item = s[i];
    s.push(item);
  }
  s.splice(0, l1);
};

// 方法五
