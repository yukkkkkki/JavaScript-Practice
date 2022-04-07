// 方法一：按照出现频率排序
var frequencySort = function (s) {
  const map = new Map();
  const length = s.length;
  for (let i = 0; i < length; i++) {
    const c = s[i];
    const frequency = (map.get(c) || 0) + 1;
    map.set(c, frequency);
  }

  const list = [...map.keys()];
  list.sort((a, b) => map.get(b) - map.get(a));

  const res = [];
  const size = list.length;
  for (let i = 0; i < size; i++) {
    const c = list[i];
    const frequency = map.get(c);
    for (let j = 0; j < frequency; j++) {
      res.push(c);
    }
  }
  return res.join('');
};
