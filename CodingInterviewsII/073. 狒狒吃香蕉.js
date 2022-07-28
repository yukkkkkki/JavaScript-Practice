/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
// 方法一：二分查找
var minEatingSpeed = function (piles, h) {
  // 每小时至少吃 1 个香蕉，因此二分查找的下界是 1
  let low = 1;
  // 每小时最多吃一堆香蕉，即每小时吃的香蕉数目不会超过最多的一堆中的香蕉数目
  // 因此二分查找的上界是最多的一堆中的香蕉数目。
  let high = 0;
  for (const pile of piles) {
    high = Math.max(high, pile);
  }
  let k = high;
  while (low < high) {
    const speed = Math.floor((high - low) / 2) + low;
    const time = getTime(piles, speed);

    if (time <= h) {
      k = speed;
      high = speed;
    } else {
      low = speed + 1;
    }
  }

  return k;
};
const getTime = (piles, speed) => {
  let time = 0;
  for (const pile of piles) {
    // 由于 pile 和 speed 都大于 0
    // 因此  ⌈ pile / speed ⌉ 等价于 ⌊ (pile + speed − 1) / speed⌋
    const curTime = Math.floor((pile + speed - 1) / speed);
    time += curTime;
  }
  return time;
};
// 时间复杂度：O(nlogm)
// 空间复杂度：O(1)
