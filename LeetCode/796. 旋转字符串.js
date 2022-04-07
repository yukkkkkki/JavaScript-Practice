/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
// 方法一：模拟
// 首先，如果 s 和 goal 的长度不一样，那么无论怎么旋转，s 都不能得到 goal，返回 false
// 在长度一样（都为 n）的前提下，假设 s 旋转 i 位，则与 goal 中的某一位字符 goal[j] 对应的原 s 中的字符应该为 s[(i+j)modn]
// 在固定 i 的情况下，遍历所有 j，若对应字符都相同，则返回 true，否则，继续遍历其他候选的 i
// 若所有的 i 都不能使 s 变成 goal，则返回 false
var rotateString = function (s, goal) {
  const m = s.length;
  const n = goal.length;

  if (m !== n) return false;
  for (let i = 0; i < n; i++) {
    let flag = true;
    for (let j = 0; j < n; j++) {
      if (s[(i + j) % n] !== goal[j]) {
        flag = false;
        break;
      }
    }
    if (flag) return true;
  }
  return false;
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(1)

// 方法二：搜索子字符传
var rotateString = function (s, goal) {
  return s.length === goal.length && (s + s).indexOf(goal) !== -1;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
