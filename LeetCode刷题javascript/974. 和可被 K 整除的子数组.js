// 给定一个整数数组 A，返回其中元素之和可被 K 整除的（连续、非空）子数组的数目。

// 示例：
// 输入：A = [4,5,0,-2,-3,1], K = 5
// 输出：7
// 解释：
// 有 7 个子数组满足其元素之和可被 K = 5 整除：
// [4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]

// 效果没第二种写法好
var subarraysDivByK = function (A, K) {
  let map = { 0: 1 };
  // 保存前缀和模K的结果，初始值0
  let preSum = 0;
  let count = 0;
  for (let i = 0; i < A.length; i++) {
    // 上一次的前缀和累加当前项，再mod
    preSum = (preSum + A[i]) % K;
    // 处理preSum为负数的情况，需要加 K
    if (preSum < 0) preSum += K;
    // 之前存过的 与当前preSum相等的key
    if (map[preSum]) {
      count += map[preSum];
    }
    if (map[preSum]) {
      // 以前存过，出现次数+1
      map[preSum]++;
    } else {
      // 新存入，初始值1
      map[preSum] = 1;
    }
  }
  return count;
};

// 用数组代替map存mod
var subarraysDivByK = (A, K) => {
  let map = new Array(K).fill(0); // 初始化map数组，长度K
  map[0] = 1; // 预置边界情况，第0项1。其他项0
  let preSum = 0;
  let count = 0;
  for (let i = 0; i < A.length; i++) {
    preSum = (preSum + A[i]) % K;
    if (preSum < 0) preSum += K;
    count += map[preSum]; // 索引是mod，值是出现次数
    map[preSum]++; // 出现次数+1
  }
  return count;
};
