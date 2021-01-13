// 给你一个字符串 s，以及该字符串中的一些「索引对」数组 pairs，其中 pairs[i] = [a, b] 表示字符串中的两个索引（编号从 0 开始）。

// 你可以 任意多次交换 在 pairs 中任意一对索引处的字符。

// 返回在经过若干次交换后，s 可以变成的按字典序最小的字符串。

// 示例 1:
// 输入：s = "dcab", pairs = [[0,3],[1,2]]
// 输出："bacd"
// 解释：
// 交换 s[0] 和 s[3], s = "bcad"
// 交换 s[1] 和 s[2], s = "bacd"

// 示例 2：
// 输入：s = "dcab", pairs = [[0,3],[1,2],[0,2]]
// 输出："abcd"
// 解释：
// 交换 s[0] 和 s[3], s = "bcad"
// 交换 s[0] 和 s[2], s = "acbd"
// 交换 s[1] 和 s[2], s = "abcd"

// 示例 3：
// 输入：s = "cba", pairs = [[0,1],[1,2]]
// 输出："abc"
// 解释：
// 交换 s[0] 和 s[1], s = "bca"
// 交换 s[1] 和 s[2], s = "bac"
// 交换 s[0] 和 s[1], s = "abc"

/**
 * @param {string} s
 * @param {number[][]} pairs
 * @return {string}
 */
/**
 * @param {string} s
 * @param {number[][]} pairs
 * @return {string}
 */
var smallestStringWithSwaps = function (s, pairs) {
  const len = s.length;
  // 初始化
  const father = new Array(len).fill(0).map((x, i) => i);
  // 查询父类
  const find = (x) => {
    if (x === father[x]) {
      return father[x];
    } else {
      father[x] = find(father[x]);
      return father[x];
    }
  };
  // 合并
  const union = (x, y) => {
    father[find(x)] = find(y);
  };
  // pairs中的关联关系
  for (let i = 0; i < pairs.length; i++) {
    const [x, y] = pairs[i];
    union(x, y);
  }
  // map记录相同父类下的元素，二维数组表示
  const map = new Array(len).fill(0).map(() => new Array());
  for (let i = 0; i < len; i++) {
    const f = find(father[i]);
    map[f].push(s[i]);
  }
  // 同一个集合下的字符排序，保证字典序最小的靠前
  for (let item of map) {
    item.sort((a, b) => a.charCodeAt() - b.charCodeAt());
  }
  let res = '';
  for (let i = 0; i < len; i++) {
    const f = find(father[i]);
    // 每次取集合中首位元素，并删除
    res += map[f].shift();
  }
  return res;
};

// 作者：zk-code
// 链接：https://leetcode-cn.com/problems/smallest-string-with-swaps/solution/jiao-huan-zi-fu-chuan-zhong-de-yuan-su-b-dz3x/
