// 假设你有两个数组，一个长一个短，短的元素均不相同。找到长数组中包含短数组所有的元素的最短子数组，其出现顺序无关紧要。

// 返回最短子数组的左端点和右端点，如有多个满足条件的子数组，返回左端点最小的一个。若不存在，返回空数组。

// 示例 1:
// 输入:
// big = [7,5,9,0,2,1,3,5,7,9,1,1,5,8,8,9,7]
// small = [1,5,9]
// 输出: [7,10]

// 示例 2:
// 输入:
// big = [1,2,3]
// small = [4]
// 输出: []

/**
 * @param {number[]} big
 * @param {number[]} small
 * @return {number[]}
 */
// 方法一：map
// 思路：
// 若small中的数存在于map中，其中value初始化为-1
// 遍历 big，map存储small中的每一个值在big中的位置，并更新
// 当在big数组中找齐了所有small数组中的数字后，用当前下标i拣取map中value的最小值，得到的差即为 【包含短数组所有元素的子数组长度】
var shortestSeq = function (big, small) {
  let left = -1,
    right = -1,
    retLeft = -1,
    retRight = -1,
    length = big.length + 1,
    cnt = 0;
  let cntObj = {},
    smallSet = new Set(small);
  while (right < big.length && big.length - left > small.length) {
    while (cnt == small.length) {
      left++;
      if (smallSet.has(big[left]) && --cntObj[big[left]] == 0) {
        cnt--;
        length =
          length > right - left + 1
            ? ((retLeft = left), (retRight = right), right - left + 1)
            : length;
      }
    }
    right++;
    cntObj[big[right]] = cntObj[big[right]] + 1 || 1;
    if (smallSet.has(big[right]) && cntObj[big[right]] == 1) {
      ++cnt;
    }
  }
  return retLeft == -1 && retRight == -1 ? [] : [retLeft, retRight];
};

console.log(
  shortestSeq([7, 5, 9, 0, 2, 1, 3, 5, 7, 9, 1, 1, 5, 8, 8, 9, 7], [1, 5, 9])
);
