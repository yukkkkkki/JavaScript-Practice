// 在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。

// 示例:
// s = "abaccdeff"
// 返回 "b"

// s = "" 
// 返回 " "

// indexof
var firstUniqChar = function (s) {
    let result = " ";
  
    for (let i = 0; i < s.length; i++) {
      if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) {
        result = s[i];
        return result;
      }
    }
  
    return result;
};

// 哈希表
var firstUniqChar = function(s) {
    if(s === '') return ' ';
    const len = s.length;
    let hashObj = {};//由于js没有hashMmap，所以要自己创建
    for(let i = 0; i < len; i ++) {
        if(hashObj[s[i]] === undefined) {
            hashObj[s[i]] = 1;//出现一次
        } else {
            hashObj[s[i]] = 0;//出现多次
        }
    }
    for(let item in hashObj) {
        if(hashObj[item] === 1) {
            return item;
        }
    }
    return ' '
};

// 使用 Map 键值区分
var firstUniqChar = function(s) {
    if (s.length === 0) return ' ';
    if (s.length === 1) return s;
    let map = new Map();
    for(let i = 0; i < s.length; i++) {
        if(map.has(s[i])) {
            // myMap.set(key, value);
            // set() 方法为 Map 对象添加或更新一个指定了键（key）和值（value）的（新）键值对
            map.set(s[i], map.get(s[i]) + 1);
        } else {
            map.set(s[i], 1);
        }
    }
    let t = ' ';
    map.forEach((v, k) => {
        if(v == 1 && t === ' ') {
            t = k;
        }
    });
    return t;
};