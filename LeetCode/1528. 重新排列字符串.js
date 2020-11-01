// 给你一个字符串 s 和一个 长度相同 的整数数组 indices 。

// 请你重新排列字符串 s ，其中第 i 个字符需要移动到 indices[i] 指示的位置。

// 返回重新排列后的字符串。

// 示例 1：
// 输入：s = "codeleet", indices = [4,5,6,7,0,2,1,3]
// 输出："leetcode"
// 解释：如图所示，"codeleet" 重新排列后变为 "leetcode" 。

// 示例 2：
// 输入：s = "abc", indices = [0,1,2]
// 输出："abc"
// 解释：重新排列后，每个字符都还留在原来的位置上。

// 示例 3：
// 输入：s = "aiohn", indices = [3,1,4,2,0]
// 输出："nihao"

// 示例 4：
// 输入：s = "aaiougrt", indices = [4,0,2,6,7,3,1,5]
// 输出："arigatou"

// 示例 5：
// 输入：s = "art", indices = [1,0,2]
// 输出："rat"

/**
 * @param {string} s
 * @param {number[]} indices
 * @return {string}
 */

// 方法一：模拟
var restoreString = function (s, indices) {
  const len = s.length;
  const res = new Array(len);
  for (let i = 0; i < len; i++) {
    res[indices[i]] = s.charAt(i);
  }
  return res.join('');
};
// 时间复杂度：O(n)；空间复杂度：O(1)或O(n)

// 方法二：原地修改
var restoreString = function (s, indices) {
  const arr = s.split('');
  for (let i = 0, len = arr.length; i < len; i++) {
    // 闭环公式：i -> indices[i] -> indices[indices[i]] -> ... ， 直到相等
    while (i !== indices[i]) {
      const j = indices[i];
      [arr[i], arr[j]] = [arr[j], arr[i]];
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
  }
  return arr.join('');
};
// 时间复杂度：O(n)；空间复杂度：O(1)
