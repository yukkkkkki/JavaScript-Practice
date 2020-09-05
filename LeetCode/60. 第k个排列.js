// 给出集合 [1,2,3,…,n]，其所有元素共有 n! 种排列。

// 按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：

// "123"
// "132"
// "213"
// "231"
// "312"
// "321"
// 给定 n 和 k，返回第 k 个排列。

// 说明：
// 给定 n 的范围是 [1, 9]。
// 给定 k 的范围是[1,  n!]。

// 示例 1:
// 输入: n = 3, k = 3
// 输出: "213"

// 示例 2:
// 输入: n = 4, k = 9
// 输出: "2314"
var getPermutation = function (n, k) {
  let count = 0;

  const backTrack = (temp) => {
    if (temp.length === n) {
      // 选齐了 生成了一个排列
      count++;
      if (count == k) {
        // 正好是第k个
        return temp.join(''); // 拼成字符串，返回出来
      }
      return;
    }

    for (let i = 1; i <= n; i++) {
      if (temp.indexOf(i) !== -1) continue; // 已经选过，跳过
      temp.push(i);
      let res = backTrack(temp);
      temp.pop();
      if (res) return res; // 有返回值，说明找到了，返回res，结束掉遍历
    }
  };

  return backTrack([]);
};

// console.log(getPermutation(3, 3));
