// 稀疏数组搜索。有个排好序的字符串数组，其中散布着一些空字符串，编写一种方法，找出给定字符串的位置。

// 示例1:
//  输入: words = ["at", "", "", "", "ball", "", "", "car", "", "","dad", "", ""], s = "ta"
//  输出：-1
//  说明: 不存在返回-1。

// 示例2:
//  输入：words = ["at", "", "", "", "ball", "", "", "car", "", "","dad", "", ""], s = "ball"
//  输出：4

// 方法一：暴力法
var findString = function (words, s) {
  for (let i = 0; i < words.length; i++) {
    if (words[i] && words[i] == s) {
      return i;
    }
  }
  return -1;
};

// 方法二：Map
var findString = function (words, s) {
  let map = new Map();
  for (let i = 0; i < words.length; i++) {
    map.set(words[i], i);
  }
  return map.has(s) ? map.get(s) : -1;
};

// 方法三：二分查找
var findString = function (words, s) {
  let low = 0,
    high = words.length - 1,
    ans = -1;
  while (low <= high) {
    while (words[low] === '' && low < high) low++;
    while (words[high] === '' && low < high) high--;

    let mid = Math.floor(low + (high - low) / 2);
    while (words[mid] === '' && mid < high) mid++;
    if (words[mid] === s) {
      ans = mid;
      break;
    }
    if (s < words[mid]) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return ans;
};
