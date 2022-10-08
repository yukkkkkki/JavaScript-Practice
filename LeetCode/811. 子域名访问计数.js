/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
// 方法一：哈希表
var subdomainVisits = function (cpdomains) {
  const map = new Map();
  for (const cpdomain of cpdomains) {
    const space = cpdomain.split(" ");
    const count = parseInt(space[0]);
    const domain = space[1];
    map.set(domain, (map.get(domain) || 0) + count);

    for (let i = 0; i < domain.length; i++) {
      if (domain[i] === ".") {
        const sub = domain.slice(i + 1);
        map.set(sub, (map.get(sub) || 0) + count);
      }
    }
  }

  const res = [];
  for (const [sub, count] of map.entries()) {
    res.push(count + " " + sub);
  }
  return res;
};
// 时间复杂度：O(L)
// 空间复杂度：O(L)
