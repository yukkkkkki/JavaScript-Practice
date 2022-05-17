// split() + join() + trim()
var reverseWords = function (s) {
  let arr = s.split(' ');
  let res = '';
  arr.forEach((item, index) => {
    res += item.split('').reverse().join('') + ' ';
  });
  return res.trim();
};
