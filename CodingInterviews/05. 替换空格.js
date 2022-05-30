// 方法一：双指针
var replaceSpace = function (s) {
  if (!s || !s.length) return '';

  let emptyNum = 0;
  let chNum = 0;

  for (let i = 0; i < s.length; ++i) {
    s[i] === ' ' ? ++emptyNum : ++chNum;
  }

  const length = emptyNum * 2 + chNum;
  const chs = new Array(length);
  // i 是新字符串的下标
  // j 是原字符串的下标
  for (let i = 0, j = 0; j < s.length; ++j) {
    if (s[j] === ' ') {
      chs[i++] = '%';
      chs[i++] = '2';
      chs[i++] = '0';
    } else {
      chs[i++] = s[j];
    }
  }
  return chs.join('');
};

// 正则表达式
var replaceSpace = function (s) {
  return s.replace(/ /g, '%20');
};

// split + join
var replaceSpace = function (s) {
  return s.split(' ').join('%20');
};
