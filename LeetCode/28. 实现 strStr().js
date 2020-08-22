// 实现 strStr() 函数。

// 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。

// 示例 1:
// 输入: haystack = "hello", needle = "ll"
// 输出: 2

// 示例 2:
// 输入: haystack = "aaaaa", needle = "bba"
// 输出: -1

// 方法一 遍历截取字符串对比
// 从匹配字符串 haystack 中截取出与需查找字符串 needle 长度相等的内容后，对比截取的内容与匹配字符串是否相等，
// 如果相等返回开始截取的下标。
var strStr = function (haystack, needle) {
  const hayLen = haystack.length;
  const nedLen = needle.length;

  if (!needle) {
    return 0;
  } else if (nedLen > hayLen) {
    return -1;
  } else if (nedLen === hayLen) {
    return haystack === needle ? 0 : -1;
  } else {
    for (let index = 0; index <= hayLen - nedLen; index++) {
      if (haystack[index] !== needle[0]) {
        continue;
      }
      if (haystack.substring(index, index + nedLen) === needle) {
        return index;
      }
    }
  }
  return -1;
};
// 时间复杂度： O(n) 空间复杂度： O(1)

// 方法二 双层循环对比字符
// 从匹配字符串 haystack 的不同位置开始遍历，判断其中是否含有查找字符串 needle。
// 思路
// 1. 设置最外层循环，遍历次数为 0 - haystack长度减去 needle 的长度。剩余字符串长度小于needle 长度时，肯定不匹配
// 2. 判断匹配字符串 haystack 中该次循环使用到的字符串首尾字母是否与查找字符串 needle 首尾字母相同。
//    不相等，直接跳过继续遍历。
//    相等，执行第三步。
// 3. 判断查找字符串 needle 的长度长度为 1，表明匹配成功，直接返回当前长字符串下标即可长度大于 1，执行第四步
// 4. 遍历对比字符串，循环判断匹配字符串 haystack 不同位置的字符是否与匹配字符串 needle 对应位置的字符相等
//    不相等时，跳出循环，进行下次循环。
//    到最后一位还未跳出循环表明完全匹配，返回当前遍历次数（即查找字符串在匹配字符串中首次出现的位置)
var strStr = function (haystack, needle) {
  const hayLen = haystack.length;
  const nedLen = needle.length;

  if (!needle) {
    return 0;
  } else if (nedLen > hayLen) {
    return -1;
  } else if (nedLen === hayLen) {
    return haystack === needle ? 0 : -1;
  } else {
    for (let hasIndex = 0; hasIndex <= hayLen - nedLen; hasIndex++) {
      if (
        haystack[hasIndex] === needle[0] &&
        haystack[hasIndex + nedLen - 1] === needle[nedLen - 1]
      ) {
        if (nedLen === 1) {
          return hasIndex;
        }

        for (let nedIndex = 1; nedIndex < nedLen; nedIndex++) {
          if (haystack[hasIndex + nedIndex] !== needle[nedIndex]) {
            break;
          }
          if (nedLen === nedLen - 1) {
            return hasIndex;
          }
        }
      }
    }
  }
  return -1;
};
