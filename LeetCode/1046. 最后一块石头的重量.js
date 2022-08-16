/**
 * @param {number[]} stones
 * @return {number}
 */
// 方法一：sort 之后每次用二分法插入
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  stones.sort((a, b) => a - b);

  while (stones.length > 1) {
    let first = stones.pop();
    let second = stones.pop();
    if (first !== second) {
      binsert(stones, 0, stones.length - 1, first - second);
    }
  }

  if (stones.length) return stones[0];
  return 0;
};

var binsert = function (arr, left, right, afterCrash) {
  if (arr[right] < afterCrash) {
    arr.splice(right + 1, 0, afterCrash);
  } else if (left === right || arr[left] >= afterCrash) {
    arr.splice(left, 0, afterCrash);
  } else {
    var mid = Math.floor((left + right) / 2);

    if (arr[mid] <= afterCrash && arr[mid + 1] >= afterCrash) {
      arr.splice(mid + 1, 0, afterCrash);
      return;
    } else if (arr[mid] >= afterCrash) {
      binsert(arr, left, mid, afterCrash);
    } else {
      binsert(arr, mid, right, afterCrash);
    }
  }
};

// console.log(lastStoneWeight([2, 7, 4, 1, 8, 1]));

// 方法二：最大堆
var lastStoneWeight = function (stones) {
  const pq = new MaxPriorityQueue();
  for (const stone of stones) {
    pq.enqueue("x", stone);
  }

  while (pq.size() > 1) {
    // 每次依次从队列中取出最重的两块石头 a 和 b，必有 a >= b
    const a = pq.dequeue()["priority"];
    const b = pq.dequeue()["priority"];
    // 若 a > b，则将新石头 a - b 放回到最大堆中
    if (a > b) pq.enqueue("x", a - b);
    // 如果 a === b，两块石头完全被粉碎，因此不会产生新的石头
  }

  return pq.isEmpty() ? 0 : pq.dequeue()["priority"];
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(n)
