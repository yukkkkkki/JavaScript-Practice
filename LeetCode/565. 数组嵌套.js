/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：图
// 遍历数组，从 i 向 nums[i] 连边，得到一张有向图
// 由于题目保证 nums 中不含有重复的元素，因此有向图中每个点的出度和入度均为 1
var arrayNesting = function (nums) {
  let res = 0;
  const n = nums.length;
  const vis = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    let cnt = 0;
    while (!vis[i]) {
      vis[i] = true;
      i = nums[i];
      cnt++;
    }
    res = Math.max(res, cnt);
  }

  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法二：原地标记
// 省略 vis 数组，改为标记 nums[i] = n，来实现和 vis 数组同样的功能
var arrayNesting = function (nums) {
  let res = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    let cnt = 0;
    while (nums[i] < n) {
      const num = nums[i];
      nums[i] = n;
      i = num;
      cnt++;
    }
    res = Math.max(res, cnt);
  }
  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
