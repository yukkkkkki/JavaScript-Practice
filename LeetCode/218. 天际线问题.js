/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
// 方法一：排序+ 优先队列
/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
var getSkyline = function (buildings) {
  const arr = [];
  for (let i of buildings) {
    // 取出所有端点（右端点高度取反标记）
    arr.push([i[0], i[2]], [i[1], -i[2]]);
  }
  arr.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0])); // 排序

  const ret = [];
  const priorityQue = [0]; // 预置地面高度

  const pushPQ = (h) => {
    // 入堆
    if (h > priorityQue[0]) {
      // 最大高度
      priorityQue.unshift(h);
      return true;
    }
    for (let i = 0; i < priorityQue.length; ++i) {
      if (h > priorityQue[i]) {
        // 找到插入位置
        const temp = priorityQue.splice(i);
        priorityQue.push(h, ...temp);
        break;
      }
    }
    return false;
  };

  const popPQ = (h) => {
    // 出堆
    const index = priorityQue.indexOf(h); // 找到位置
    priorityQue.splice(index, 1); // 删除高度
    return index === 0 && priorityQue[0] !== h; // 最大高度 && 唯一最大
  };

  for (let i of arr) {
    if (i[1] > 0) {
      // 左端点 入堆
      if (pushPQ(i[1])) ret.push([i[0], i[1]]); // 入堆 且是目前最大高度
    } else {
      // 右端点 出堆
      if (popPQ(-i[1])) ret.push([i[0], priorityQue[0]]); // 出堆 且是唯一最大高度 压入第二高度
    }
  }

  return ret;
};
// 作者：leon-8b
// 链接：https://leetcode.cn/problems/the-skyline-problem/solution/pai-xu-you-xian-dui-lie-by-leon-8b-wkdi/
