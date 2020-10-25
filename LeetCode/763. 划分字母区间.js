// 字符串 S 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一个字母只会出现在其中的一个片段。返回一个表示每个字符串片段的长度的列表。

// 示例 1：
// 输入：S = "ababcbacadefegdehijhklij"
// 输出：[9,7,8]
// 解释：
// 划分结果为 "ababcbaca", "defegde", "hijhklij"。
// 每个字母最多出现在一个片段中。
// 像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。

/**
 * @param {string} S
 * @return {number[]}
 */
// 方法一：贪心算法 + 双指针
// 思路：
// 遍历字符串，得到每一个字母最后一次出现的下标位置
// 使用贪心算法和双指针，将字符串划分为尽可能多的片段：
//   从左到右遍历字符串，遍历的同时维护当前片段的开始下标start 和 结束下标 end，初始时 start = end = 0
//   对于每个访问到的字母c，得到当前字母的最后一次出现的下标位置 endc,则当前片段的结束下标一定不会小于endc，因此 end = max(end, endc)
//   当访问到下标 end 时，当前片段访问结束，下标范围：[start, end]，将当前片段的长度添加到返回值，然后令 start = end + 1，继续寻找下一个片段
//   重复上述过程,直到遍历完字符串
var partitionLabels = function (S) {
  const last = new Array(26);
  const length = S.length;
  const codePointA = 'a'.codePointAt(0);
  for (let i = 0; i < length; i++) {
    last[S.codePointAt(i) - codePointA] = i;
  }
  const partition = [];
  let start = 0,
    end = 0;
  for (let i = 0; i < length; i++) {
    end = Math.max(end, last[S.codePointAt(i) - codePointA]);
    if (i == end) {
      partition.push(end - start + 1);
      start = end + 1;
    }
  }
  return partition;
};
// 时间复杂度：O(n)；空间复杂度：O(∑)
