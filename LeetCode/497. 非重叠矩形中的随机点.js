/**
 * @param {number[][]} rects
 */
// 方法一：前缀和 + 二分查找
// 记 rects 的长度为 n。矩形 rects[i] 的左下角点为 (a_i, b_i), 右上角点为 (x_i, y_i)
// 则它覆盖的整数点有 s_i = (x_i - a_i + 1) * (y_i - b_i + 1) 个
var Solution = function (rects) {
  this.arr = [0];
  this.rects = rects;
  for (const rect of rects) {
    const [a, b, x, y] = rect;
    this.arr.push(this.arr[this.arr.length - 1] + (x - a + 1) * (y - b + 1));
  }
};

/**
 * @return {number[]}
 */
Solution.prototype.pick = function () {
  let k = Math.floor(Math.random() * this.arr[this.arr.length - 1]);
  const rectIndex = binarySearch(this.arr, k + 1) - 1;
  k -= this.arr[rectIndex];
  const rect = this.rects[rectIndex];
  const a = rect[0];
  const b = rect[1];
  const y = rect[3];
  const col = y - b + 1;
  const da = Math.floor(k / col);
  const db = k - col * da;
  return [a + da, b + db];
};

const binarySearch = (arr, target) => {
  let low = 0;
  let high = arr.length;
  while (low <= high) {
    const mid = Math.floor((high - low) / 2) + low;
    const num = arr[mid];
    if (num === target) {
      return mid;
    } else if (num > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return low;
};
/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(rects)
 * var param_1 = obj.pick()
 */
