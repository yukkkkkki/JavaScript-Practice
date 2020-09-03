// 有重复字符串的排列组合。编写一种方法，计算某字符串的所有排列组合。

// 示例1:
//  输入：S = "qqe"
//  输出：["eqq","qeq","qqe"]

// 示例2:
//  输入：S = "ab"
//  输出：["ab", "ba"]
/**
 * @param {string} S
 * @return {string[]}
 */
var permutation = function (S) {
  let arr = S.split('').sort();
  let res = [];

  const backTrack = (tmpPath, tmpArr) => {
    if (tmpArr.length === 0) {
      return res.push(tmpPath.slice());
    }

    for (let i = 0; i < tmpArr.length; i++) {
      if (tmpArr[i] === tmpArr[i - 1]) continue;
      tmpPath.push(tmpArr[i]);
      backTrack(
        tmpPath,
        tmpArr.filter((item, index) => index !== i)
      );
      tmpPath.pop();
    }
  };

  backTrack([], arr);
  return res.map((i) => i.join(''));
};
