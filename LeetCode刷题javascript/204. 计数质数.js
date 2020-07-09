// 统计所有小于非负整数 n 的质数的数量。

// 示例:
// 输入: 10
// 输出: 4
// 解释: 小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。

// 方法一：暴力法
// 根据定义直接从 2 开始直到 n 根据定义判断每一个数字是否为质数
function isPrime(n) {
  if (n === 2 || n === 3) {
    return true;
  }

  if (n % 6 !== 1 && n % 6 !== 5) {
    return false;
  }

  const sqrtN = Math.sqrt(n);
  for (let i = 3; i <= sqrtN; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

var countPrimes = function (n) {
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime(i)) {
      count++;
    }
  }
  return count;
};

// 时间复杂度： O(n ∗ √n); 空间复杂度：O(1)

// 方法二：埃拉托斯特尼筛法
// 给出要筛选数值的范围 n，找出 √𝑛 以内的素数 p1, p2..., p𝑘。
// 先用 2 去筛，即把 2 留下，把 2 的倍数剔除掉；
// 再用下一个素数，也就是 3 筛，把 3 留下，把 3 的倍数剔除掉；
// 接下去用下一个素数 5筛，把 5 留下，把 5 的倍数剔除掉；
// 不断重复下去……不断的剔除不需要比对的元素；
// 每计算一个数，都要把它的倍数去掉。到了n，数一下留下了几个数。
var countPrimes = function (n) {
  let count = 0;
  const arr = new Uint8Array(n);
  for (let i = 2; i < n; i++) {
    if (!arr[i - 1]) {
      count++;
      for (let j = i * i; j <= n; j += i) {
        arr[j - 1] = true;
      }
    }
  }
  return count;
};
// 时间复杂度： O(nloglogn); 空间复杂度： O(n)
