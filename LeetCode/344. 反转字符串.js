/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
// 方法一：首尾替换法
// 逐位遍历，进行交换
var reverseString = function (s) {
  let len = s.length;
  for (let i = 0; i < len / 2; i++) {
    [s[i], s[len - 1 - i]] = [s[len - 1 - i], s[i]];
  }
  return s;
};
// 时间复杂度： O(n)
// 空间复杂度： O(1)

// 方法二：API
var reverseString = function (s) {
  return s.reverse();
};

// 方法三：双指针
var reverseString = function (s) {
  let i = 0;
  let x = s.length - 1;
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
