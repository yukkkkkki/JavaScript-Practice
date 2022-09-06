/**
 * @param {string[]} strs
 * @return {string}
 */
// 方法一：纵向扫描
var longestCommonPrefix = function (strs) {
  if (!strs || strs.length === 0) return "";

  let res = ""; // 共同的前缀字符串
  let index = 0; // 指针

  // 遍历第一个字符串的每个字符
  for (let c of strs[0]) {
    for (let i = 1; i < strs.length; i++) {
      if (index >= strs[i].length || strs[i][index] !== c) {
        return res;
      }
    }

    res += c;
    index++;
  }

  return res;
};
// 时间复杂度：O(mn)
// 空间复杂度：O(1)

// 方法二
var longestCommonPrefix = function (strs) {
  if (strs.length == 0) return "";
  let ans = strs[0];
  for (let i = 1; i < strs.length; i++) {
    let j = 0;
    for (; j < ans.length && j < strs[i].length; j++) {
      // 遇到前缀不相同时，拿到不相同的这个 j
      if (ans[j] != strs[i][j]) break;
    }
    ans = ans.substr(0, j);
    if (ans === "") return ans;
  }
  return ans;
};

// 方法三：迭代递归
// 查找 n 个字符串的最长公共前缀，可以拆分成两步：
// 1. 查找前 n-1 个字符串的最长公共前缀 m
// 2. 查找 m 与最后一个字符串的公共前缀
// 因此，我们可以得到递归公式：
// $longestCommonPrefix([S1, S2, ..., Sn]) = findCommPrefix(longestCommonPrefix([S1, S2, ..., Sn-1]), Sn)$
// 我们只需要实现 findCommPrefix 方法，然后遍历数组即可
// 详解
// 1. 获取数组中第一个字符串，当做最长公共前缀保存到变量 commonPrefix
// 2. 从数组中取出下一个字符串，与当前的最长公共前缀 commonPrefix 对比，得到新的最长公共前缀存到 commonPrefix
// 3. 重复第 2 步遍历完整个字符串，最后得到的即使数组中所有字符串的最长公共前缀
var longestCommonPrefix = function (strs) {
  function findCommPrefix(a, b) {
    let i = 0;
    while (i < a.length && i < b.length && a.charAt(i) === b.charAt(i)) {
      i++;
    }
    // substring() 方法用于提取字符串中介于两个指定下标之间的字符
    return i > 0 ? a.substring(0, i) : "";
  }
  if (strs.length > 0) {
    let commonPrefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
      commonPrefix = findCommPrefix(commonPrefix, strs[i]);
    }
    return commonPrefix;
  }
  return "";
};
// 时间复杂度： O(n)
// 空间复杂度：O(1)

// 方法四：循环迭代
// 思路
// 最长公共前缀一定是数组中所有数组都包含的前缀子串，我们可以将任意字符串的前缀作为公共前缀，
// 从长度 0 到 ( 为该字符串长度），横向扫描数组中的所有字符串，看是否都有该前缀，直到找到不满足的为止。
// 详解
// 1. 先假设最长公共子串的长度为 1，存到变量 。
//    以第一个字符串为基准，取它的第 i 个字符与数组中其他所有的字符串第 i 个字符进行比较，
//    如果都相等，那么将最长公共子串的长度加 1，否则停止查找，
//    已找到最长公共前缀的长度，设置完成匹配标记 flag 为 false
// 2. 重复第 1 步，直到 i 等于第一个字符串的长度，或者匹配标记 flag 为 false
// 3. 返回第一个字符串的前 i 个字符，即为当前数组的最长公共前缀
var longestCommonPrefix = function (strs) {
  if (strs.length === 0) return "";
  let i = 0,
    flag = true;
  while (flag) {
    if (strs[0].length > i) {
      const char = strs[0].charAt(i);
      for (let j = 1; j < strs.length; j++) {
        if (strs[j].length <= i || strs[j].charAt(i) !== char) {
          flag = false;
          break;
        }
      }
    } else {
      flag = false;
    }
    i++;
  }
  return strs[0].substring(0, i - 1);
};
// 时间复杂度： O(n)
// 空间复杂度： O(1)
