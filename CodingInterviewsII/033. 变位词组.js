/**
 * @param {string[]} strs
 * @return {string[][]}
 */
// 方法一：排序
var groupAnagrams = function (strs) {
  const map = new Map();

  for (let str of strs) {
    let arr = Array.from(str);
    arr.sort(); // 按照字典序排序
    let key = arr.toString();
    let list = map.get(key) ? map.get(key) : new Array();
    list.push(str);
    map.set(key, list);
  }

  return Array.from(map.values());
};
// 间复杂度：O(nklogk)
// 空间复杂度：O(nk)

// 方法一：计数
var groupAnagrams = function (strs) {
  const map = new Object();
  for (let s of strs) {
    const count = new Array(26).fill(0);
    for (let c of s) {
      count[s.charCodeAt() - 'a'.charCodeAt()]++;
    }
    map[count] ? map[count].push(s) : (map[count] = [s]);
  }
  return Object.values(map);
};
// 间复杂度：O(n(k+∣Σ∣))
// 空间复杂度：O(n(k+∣Σ∣))
