// 在一条环路上有 N 个加油站，其中第 i 个加油站有汽油 gas[i] 升。
// 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱为空。
// 如果你可以绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1。

// 说明:
// 如果题目有解，该答案即为唯一答案。
// 输入数组均为非空数组，且长度相同。
// 输入数组中的元素均为非负数。

// 示例 1:
// 输入:
// gas  = [1,2,3,4,5]
// cost = [3,4,5,1,2]
// 输出: 3
// 解释:
// 从 3 号加油站(索引为 3 处)出发，可获得 4 升汽油。此时油箱有 = 0 + 4 = 4 升汽油
// 开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
// 开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
// 开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
// 开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
// 开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
// 因此，3 可为起始索引。

// 示例 2:
// 输入:
// gas  = [2,3,4]
// cost = [3,4,3]
// 输出: -1
// 解释:
// 你不能从 0 号或 1 号加油站出发，因为没有足够的汽油可以让你行驶到下一个加油站。
// 我们从 2 号加油站出发，可以获得 4 升汽油。 此时油箱有 = 0 + 4 = 4 升汽油
// 开往 0 号加油站，此时油箱有 4 - 3 + 2 = 3 升汽油
// 开往 1 号加油站，此时油箱有 3 - 3 + 3 = 3 升汽油
// 你无法返回 2 号加油站，因为返程需要消耗 4 升汽油，但是你的油箱只有 3 升汽油。
// 因此，无论怎样，你都不可能绕环路行驶一周。

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
// 方法一：贪心法
// 思路：
// 累加每站的剩余量 left += gas[i] - cost[i]，若left一直大于0，则可以一直走下去
// 假设到不了d站，则 [gas[a] - cost[a]] + [gas[b] - cost[b]] + [gas[c] - cost[c]] < 0，即 left(a) + left(b) + left(c) < 0
// 结论1：累加 gas[i] - cost[i]后，若结果 < 0，则出发点到站 i 都不能作为起点。如果总加油量 sum(gas) < sum(cost) 总耗油量，问题无解，因为油不够走完全程
// 结论2：如果总加油量(gas) >= sum(cost)总耗油量，则问题一定有解
var canCompleteCircuit = function (gas, cost) {
  let left = 0,
    start = 0,
    totalGas = 0,
    totalCost = 0;
  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i];
    totalCost += cost[i];
    left += gas[i] - cost[i];
    if (left < 0) {
      start = i + 1;
      left = 0;
    }
  }
  if (totalGas < totalCost) return -1;
  return start;
};

// 方法二：一次遍历
// 思路：我们首先检查第 0 个加油站，并试图判断能否环绕一周；如果不能，就从第一个无法到达的加油站开始继续检查。
var canCompleteCircuit = function (gas, cost) {
  const n = gas.length;
  let i = 0;
  while (i < n) {
    let sumOfGas = 0,
      sumOfCost = 0;
    let cnt = 0;
    while (cnt < n) {
      const j = (i + cnt) % n;
      sumOfGas += gas[j];
      sumOfCost += cost[j];
      if (sumOfCost > sumOfGas) {
        break;
      }
      cnt++;
    }
    if (cnt === n) return i;
    else {
      i = i + cnt + 1;
    }
  }
  return -1;
};
// 时间复杂度：O(N); 空间复杂度：O(1)

// console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]));
