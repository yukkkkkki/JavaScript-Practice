// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

// 示例:
// 输入："23"
// 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].

// 说明:
// 尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

// 方法一：DFS回溯
var letterCombinations = function (digits) {
  let phone = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
  };

  let output = [];

  const backTrack = (combination, next_digis) => {
    if (next_digis.length === 0) {
      output.push(combination);
    } else {
      for (let letter of phone[next_digis[0]]) {
        backTrack(combination + letter, next_digis.substring(1));
      }
    }
  };
  if (digits.length) {
    backTrack('', digits);
  }
  return output;
};
// 时间复杂度：O(3N×4M)； 空间复杂度：O(3N×4M)
// console.log(letterCombinations('23'));
