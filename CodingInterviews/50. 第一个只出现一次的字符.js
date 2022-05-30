// 方法一：一次遍历
// indexof 判断
var firstUniqChar = function (s) {
  let result = ' ';

  for (let i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) {
      result = s[i];
      return result;
    }
  }

  return result;
};

// 方法二：哈希表
var firstUniqChar = function (s) {
  if (s === '') return ' ';

  const n = s.length;
  let map = {};

  for (let i = 0; i < n; i++) {
    if (map[s[i]] === undefined) {
      map[s[i]] = 1; //出现一次
    } else {
      map[s[i]] = 0; //出现多次
    }
  }

  for (let item in map) {
    if (map[item] === 1) {
      return item;
    }
  }

  return ' ';
};

// 方法二：哈希表 用 Map 做
// myMap.set(key, value);
// set() 方法为 Map 对象添加或更新一个指定了键（key）和值（value）的（新）键值对
var firstUniqChar = function (s) {
  if (s.length === 0) return ' ';
  if (s.length === 1) return s;

  let map = new Map();
  for (let i = 0; i < s.length; i++) {
    map.set(s[i], map.has(s[i]) ? map.get(s[i]) + 1 : 1);
  }

  let t = ' ';
  map.forEach((v, k) => {
    if (v == 1 && t === ' ') {
      t = k;
    }
  });

  return t;
};
