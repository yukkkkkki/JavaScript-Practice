// 给定一个数组 nums ，如果 i < j 且 nums[i] > 2*nums[j] 我们就将 (i, j) 称作一个重要翻转对。

// 你需要返回给定数组中的重要翻转对的数量。

// 示例 1:
// 输入: [1,3,2,3,1]
// 输出: 2

// 示例 2:
// 输入: [2,4,3,5,1]
// 输出: 3

/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：归并排序
var reversePairs = function (nums) {
  if (nums.length == 0) return 0;
  return reversePairsRecursive(nums, 0, nums.length - 1);
};
const reversePairsRecursive = (nums, left, right) => {
  if (left === right) return 0;
  else {
    const mid = Math.floor((left + right) / 2);
    const n1 = reversePairsRecursive(nums, left, mid);
    const n2 = reversePairsRecursive(nums, mid + 1, right);
    let ret = n1 + n2;
    let i = left;
    let j = mid + 1;
    while (i <= mid) {
      while (j <= right && nums[i] > 2 * nums[j]) {
        j++;
      }
      ret += j - mid - 1;
      i++;
    }
    const sorted = new Array(right - left + 1);
    let p1 = left,
      p2 = mid + 1;
    let p = 0;
    while (p1 <= mid || p2 <= right) {
      if (p1 > mid) {
        sorted[p++] = nums[p2++];
      } else if (p2 > right) {
        sorted[p++] = nums[p1++];
      } else {
        if (nums[p1] < nums[p2]) {
          sorted[p++] = nums[p1++];
        } else {
          sorted[p++] = nums[p2++];
        }
      }
    }
    for (let k = 0; k < sorted.length; k++) {
      nums[left + k] = sorted[k];
    }
    return ret;
  }
};
// 时间复杂度：O(nlogn); 空间复杂度：O(n)

// 方法二：树状数组
var reversePairs = function (nums) {
  const allNumbers = Array.from(
    new Set([...nums, ...nums.map((x) => 2 * x)].sort((x, y) => x - y))
  );
  const values = new Map();
  let idx = 0;
  allNumbers.forEach((x) => values.set(x, ++idx));
  let ret = 0;
  const bit = new BIT(values.size);
  for (let i = 0; i < nums.length; i++) {
    let left = values.get(nums[i] * 2),
      right = values.size;
    ret += bit.query(right) - bit.query(left);
    bit.update(values.get(nums[i]), 1);
  }
  return ret;
};

let BIT = class {
  constructor(n) {
    this.n = n;
    this.tree = new Array(n + 1).fill(0);
  }
  lowbit(x) {
    return x & -x;
  }

  update(x, d) {
    while (x <= this.n) {
      this.tree[x] += d;
      x += this.lowbit(x);
    }
  }
  query(x) {
    let ans = 0;
    while (x > 0) {
      ans += this.tree[x];
      x -= this.lowbit(x);
    }
    return ans;
  }
};
