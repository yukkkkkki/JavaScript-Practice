// 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

// 示例 1:
// 输入: s = "anagram", t = "nagaram"
// 输出: true

// 示例 2:
// 输入: s = "rat", t = "car"
// 输出: false

// 方法一 利用数组sort()方法
// 1. 首先，将字符串转为数组。
// 2. 利用数组 sort 方法进行排序。
// 3. 然后，转为字符串进行比较，如果相等返回 true，反之返回 false。
var isAnagram = function (s, t) {
  const sArr = s.split("");
  const tArr = t.split("");
  const sortFn = (a, b) => {
    return a.charCodeAt() - b.charCodeAt();
  };
  sArr.sort(sortFn);
  tArr.sort(sortFn);
  return sArr.join("") === tArr.join("");
};
// 时间复杂度： O(nlogn)  空间复杂度：O(n)

// 方法二 计数累加方法
// 1. 首先，声明一个变量，遍历其中一个字符串 s 或 t，对每个字母出现的次数进行累加。
// 2. 然后，遍历另一个字符串，使每一个字母在已得到的对象中做匹配，
//    如果匹配则对象下的字母个数减 1，
//    如果匹配不到，则返回 false，
//    如果最后对象中每个字母个数都为 0，则表示两字符串相等。
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  const hash = {};
  for (const k of s) {
    hash[k] = hash[k] || 0;
    hash[k] += 1;
  }
  for (const k of t) {
    if (!hash[k]) {
      return false;
    }
    hash[k] -= 1;
  }
  return true;
};
// 时间复杂度 O(n)  空间复杂度 O(1)
