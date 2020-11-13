// 给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。

// 对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。

// 你可以返回任何满足上述条件的数组作为答案。

// 示例：
// 输入：[4,2,5,7]
// 输出：[4,5,2,7]
// 解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。

/**
 * @param {number[]} A
 * @return {number[]}
 */

// 方法一：两次遍历
// 思路：
// 遍历一遍数组把所有的偶数放进 ans[0]，ans[2]，ans[4]，依次类推。
// 再遍历一遍数组把所有的奇数依次放进 ans[1]，ans[3]，ans[5]，依次类推。
var sortArrayByParityII = function (A) {
  const n = A.length;
  const ans = new Array(n);
  let i = 0;
  for (const x of A) {
    // 偶数
    if (!(x & 1)) {
      ans[i] = x;
      i += 2;
    }
  }

  i = 1;
  for (const x of A) {
    // 奇数
    if (x & 1) {
      ans[i] = x;
      i += 2;
    }
  }
  return ans;
};
// 时间复杂度：O(n)；空间复杂度：O(1)

// 方法二：双指针
var sortArrayByParityII = function (A) {
  const n = A.length;
  let j = 1;
  for (let i = 0; i < n; i += 2) {
    if (A[i] & 1) {
      while (A[j] & 1) {
        j += 2;
      }
      swap(A, i, j);
    }
  }
  return A;
};

const swap = (A, i, j) => {
  const temp = A[i];
  A[i] = A[j];
  A[j] = temp;
};
console.log(sortArrayByParityII([4, 2, 5, 7]));
// 时间复杂度：O(n)；空间复杂度：O(1)
