// 557. 反转字符串中的单词 III
// 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

// 示例：
// 输入："Let's take LeetCode contest"
// 输出："s'teL ekat edoCteeL tsetnoc"

// split() + join() + trim()
var reverseWords = function (s) {
  let arr = s.split(' ');
  let res = '';
  arr.forEach((item, index) => {
    res += item.split('').reverse().join('') + ' ';
  });
  return res.trim();
};
