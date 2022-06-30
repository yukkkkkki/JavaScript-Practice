/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
// 方法一
// 从右往左累加，设置一个临时变量记录是否需要进一位
// 如果需要进位则在后续的判断中加上 1
// 最后返回结果前再确定一次是否需要进位，需要的话将 1 加到最前面再输出。
var addBinary = function (a, b) {
  let res = '';
  let ind1 = a.length - 1;
  let ind2 = b.length - 1;
  let carry = 0;

  while (ind1 >= 0 || ind2 >= 0) {
    const x = ind1 >= 0 ? a[ind1] - '0' : 0;
    const y = ind2 >= 0 ? b[ind2] - '0' : 0;

    const sum = x + y + carry;
    res += sum % 2;
    carry = Math.floor(sum / 2);

    ind1--;
    ind2--;
  }

  if (carry) res += carry;
  return res.split('').reverse().join('');
};

// 作者：tangweiqun
// 链接：https://leetcode.cn/problems/JFETK5/solution/jian-dan-yi-dong-javacpythonjs-pei-yang-r6bem/
