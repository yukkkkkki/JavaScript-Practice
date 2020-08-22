// 你有 k 个升序排列的整数数组。找到一个最小区间，使得 k 个列表中的每个列表至少有一个数包含在其中。
// 我们定义如果 b-a < d-c 或者在 b-a == d-c 时 a < c，则区间 [a,b] 比 [c,d] 小。

// 示例 1:
// 输入:[[4,10,15,24,26], [0,9,12,20], [5,18,22,30]]
// 输出: [20,24]
// 解释:
// 列表 1：[4, 10, 15, 24, 26]，24 在区间 [20,24] 中。
// 列表 2：[0, 9, 12, 20]，20 在区间 [20,24] 中。
// 列表 3：[5, 18, 22, 30]，22 在区间 [20,24] 中。

// 方法一：滑动窗口
// 思路
// 给我们k个升序数组，求出一个最短区间，这个区间包含了每个数组的一个数字
// 为了尽可能短，最短区间的两端肯定是数组中的数字，肯定是从k个数组中挑的
// 可以把k个数组合并为一个升序数组，用两个指针圈定一个活动的窗口，去捕获目标数字
// 要找齐每个数组的数字，必须知道各个数字来自哪个数组，我们要标记出它们所属的数组

// 找齐所有数组的数字
// 用一个 hashMap 去记录：
//     key：数组编号
//     value：该数组的数字在窗口出现的次数
// 变量 count 记录当前窗口包含了几个数组的数字，count==k 就是找齐了目标数字
// count 和 map 的联系是：
// 如果某个数组的数字的出现次数变为 0，该数组不再出现在窗口中，count要-1
// 如果某个数组的数字的出现次数从0变1，该数组第一次在窗口出现，count要+1

// 窗口扩张和收缩的时机
// 窗口扩张，right右移，为了纳入目标数字，可以看作主旋律，扩张是肯定要扩张的，在扩张的间隙去收缩
//     如果纳入了一个正好缺失的数组的数字，count就+1
//     哈希表中对应的数组的出现次数 +1
//     如果此时count正好等于数组的个数k，则我们找到了一个可行解，此时再扩张没有意义，反而与“最小窗口”背道而驰
//     此时应该收缩窗口，让窗口长度尽量小，left右移

// 窗口收缩，意味着丢失数字，直到条件不再满足，可行解被破坏，就不收缩了
//     如果哈希表中有数组的出现次数因此变0，此时窗口缺失了目标数字，条件被破坏了
//     这之前的窗口长度，是当前可行解下的最优解，记录下来

// 此时要重新扩张窗口，去寻找下一个可行解，再进行优化，得到新的潜在的最优解，再优中取优
var smallestRange = function (nums) {
  let allNums = [];
  let map = {};
  for (let i = 0; i < nums.length; i++) {
    map[i] = 0;
    for (let j = 0; j < nums[i].length; j++) {
      allNums.push({
        num: nums[i][j],
        type: i, // 来源于哪个数组
      });
    }
  }

  allNums.sort((a, b) => a.num - b.num);
  let left = 0;
  let count = 0;
  let minLen = Infinity;
  let minStart = 0;
  for (let right = 0; right < allNums.length; right++) {
    if (map[allNums[right].type] == 0) count++;
    map[allNums[right].type]++; // 纳入数字，对应的出现次数+1
    // 找齐所有目标数字，且区间不被破坏的前提下收缩
    while (count == nums.length && left <= right) {
      // 出现了比minLen更小的解
      if (allNums[right].num - allNums[left].num < minLen) {
        minLen = allNums[right].num - allNums[left].num; // 更新minLen
        minStart = allNums[left].num; // 更新minStart
      }
      map[allNums[left].type]--; // 收缩之前更新一下map
      if (map[allNums[left].type] == 0) count--; // map对应的数字出现次数减为0，count--
      left++; // 收缩窗口
    }
  }
  return [minStart, minStart + minLen];
};
