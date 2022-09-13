/**
 * @param {number} num
 * @return {number}
 */
// 方法一：贪心
// 尝试将数字中右边较大的数字与左边较小的数字进行交换
var maximumSwap = function (num) {
  const charArray = [...("" + num)];
  const n = charArray.length;

  let maxIdx = n - 1;
  let idx1 = -1;
  let idx2 = -1;

  // 从右向左扫描数字数组
  // 并记录当前已经扫描过的数字的最大值的索引为 maxId，且保证 maxId 越靠近数字的右侧
  for (let i = n - 1; i >= 0; i--) {
    if (charArray[i] > charArray[maxIdx]) {
      maxIdx = i;
    } else if (charArray[i] < charArray[maxIdx]) {
      // 说明索引 i 的右侧的数字最大值为 charArray[maxId]
      // 此时将 charArray[i] 与 charArray[maxId] 进行交换即可得到一个比 num 更大的值
      idx1 = i;
      idx2 = maxIdx;
    }
  }

  if (idx1 >= 0) {
    swap(charArray, idx1, idx2);
    return parseInt(charArray.join(""));
  } else {
    return num;
  }
};
const swap = (charArray, i, j) => {
  const tmp = charArray[i];
  charArray[i] = charArray[j];
  charArray[j] = tmp;
};
// 时间复杂度：O(log num)
// 空间复杂度：O(log num)
