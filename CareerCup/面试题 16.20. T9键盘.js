// 在老式手机上，用户通过数字键盘输入，手机将提供与这些数字相匹配的单词列表。每个数字映射到0至4个字母。给定一个数字序列，实现一个算法来返回匹配单词的列表。你会得到一张含有有效单词的列表。映射如下图所示：

// 示例 1:
// 输入: num = "8733", words = ["tree", "used"]
// 输出: ["tree", "used"]

// 示例 2:
// 输入: num = "2", words = ["a", "b", "c", "d"]
// 输出: ["a", "b", "c"]
/**
 * @param {string} num
 * @param {string[]} words
 * @return {string[]}
 */
var getValidT9Words = function (num, words) {
  const phone = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
  };
  const n = words.length;
  let res = words.filter((word) => {
    for (let i = 0; i < word.length; i++) {
      if (!phone[num[i]].includes(word[i])) return false;
    }
    return true;
  });
  return res;
};
