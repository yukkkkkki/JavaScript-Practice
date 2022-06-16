/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
// 方法一：二分查找
// 由于每小时都要吃香蕉，即每小时至少吃 1 个香蕉，因此二分查找的下界是 1
// 由于每小时最多吃一堆香蕉，即每小时吃的香蕉数目不会超过最多的一堆中的香蕉数目，因此二分查找的上界是最多的一堆中的香蕉数目
var minEatingSpeed = function (piles, h) {
  let low = 1;
  let high = 0;
  for (const pile of piles) {
    high += pile;
  }

  while (low < high) {
    const speed = Math.floor((high - low) / 2) + low;
    const time = getTime(piles, speed);
    if (time <= h) {
      // 如果在速度 speed 下可在 h 小时内吃掉所有香蕉，则最小速度一定 <= speed，因此将上界调整为 speed
      high = speed;
    } else {
      // 否则，最小速度一定大于 speed，因此将下界调整为 speed + 1
      low = speed + 1;
    }
  }

  return k;
};
const getTime = (piles, speed) => {
  let time = 0;
  for (const pile of piles) {
    // 当一堆香蕉的个数是 pile 时，吃掉这堆香蕉需要 ⌈ pile / speed ⌉ 小时
    // 由于 pile 和 speed 都大于 0，因此 ⌈ pile / speed ⌉ 等价于 ⌈ (pile + speed - 1) / speed ⌉
    const curTime = Math.floor((pile + speed - 1) / speed);
    time += curTime;
  }
  return time;
};
// 时间复杂度：O(nlogm) n 是 piles 长度，m 是 piles 中最大值
// 空间复杂度：O(1)
