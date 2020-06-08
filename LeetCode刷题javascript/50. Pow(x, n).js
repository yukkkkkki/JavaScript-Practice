// 实现 pow(x, n) ，即计算 x 的 n 次幂函数。

// 示例 1:
// 输入: 2.00000, 10
// 输出: 1024.00000

// 示例 2:
// 输入: 2.10000, 3
// 输出: 9.26100

// 示例 3:
// 输入: 2.00000, -2
// 输出: 0.25000
// 解释: 2-2 = 1/22 = 1/4 = 0.25

// 说明:
//     -100.0 < x < 100.0
//     n 是 32 位有符号整数，其数值范围是 [−231, 231 − 1] 。
var myPow = function (x, n) {
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }
    let result = 1;
    while (n) {
        //判断n的二进制最后一位是否是1， 如果是1则将结果乘以x
        if (n & 1) result *= x;

        x *= x;
        n >>>= 1;
        //进行无符号右移1位，此处不能使用有符号右移（>>）
        //当n为-2^31转换成正数时的二进制位“10000000000000000000000000000000” , 
        // 如果采用有符号右移时会取最左侧的数当符号即（1），所以返回的结果是 -1073741824
    }
    return result;
}

// 快速幂算法（递归）
var myPow = function (x, n) {
    if (n == 0) return 1;
    if (n < 1) return 1 / myPow(x, -n);
    if (n % 2) return x * myPow(x, n - 1);
    return myPow(x * x, n / 2);
};

// 直接调用Math.pow()
var myPow = function (x, n) {
    return Math.pow(x, n);
};

// 二分法
// 如果exponent是偶数，help(base, exponent) = help(base, exponent / 2) * help(base, exponent / 2)
// 如果exponent是奇数，help(base, exponent) = base * help(base, exponent / 2) * help(base, exponent / 2)
// 对于负指数exponent的情况，取其绝对值先计算。将最后结果取倒数即可。

var myPow = function (x, n) {
    const isNegative = n > 0; // 判断n是否是负数
    const res = help(x, Math.abs(n));
    return isNegative ? 1 / res : res;
}

function help(x, n) {
    if (n == 0) return 1;
    if (n == 1) return 1;

    const res = help(x, Math.floor(n / 2));
    // 如果n是偶数，则help(x, n) = help(x, n / 2) * help(x, n / 2)
    // 如果n是奇数，help(x, n) = x * help(x, n / 2) * help(x, n / 2)
    return n % 2 ? res * res * x : res * res;
}