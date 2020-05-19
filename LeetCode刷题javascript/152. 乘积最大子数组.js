// 给你一个整数数组 nums， 请你找出数组中乘积最大的连续子数组（ 该子数组中至少包含一个数字）， 并返回该子数组所对应的乘积。


// 示例 1:
//     输入: [2, 3, -2, 4]
// 输出: 6
// 解释: 子数组[2, 3] 有最大乘积 6。

// 示例 2:
//     输入: [-2, 0, -1]
// 输出: 0
// 解释: 结果不能为 2, 因为[-2, -1] 不是子数组。

// 方法一
// 求积
// 子序列必须连续
// 当前值为负数时， 要想乘积最大， 则必须乘以前n - 1 个连续子序列中的最小值

// 乘以正数， 正数越大， 积会越来越小， 不合题意

// 因此本题要多维护一个dpMIn数组， 用以表示前n - 1 个连续子序列中的最小值

// dpMax[i - 1] > 0
// nums[i] > 0
// dpMax[i] = dpMax[i - 1] * nums[i]
// nums[i] <= 0
// dpMax[i] = dpMin[i - 1] * nums[i]
// dpMin[i] = nums[i]

// dpMax[i - 1] <= 0
// nums[i] > 0
// dpMax[i] = nums[i]
// dpMin[i] = dpMax[i - 1] * nums[i]
// nums[i] <= 0
// dpMax[i] = dpMin[i - 1] * nums[i]
// dpMin[i] = nums[i]

// 因此可以直接省去以上应用于代码中的if / else判断
// dpMax[i] = Max(dpMax[i - 1] * nums[i], dpMin[i - 1] * nums[i], nums[i])
// dpMin[i] = Max(dpMax[i - 1] * nums[i], dpMin[i - 1] * nums[i], nums[i])
var maxProduct = function (nums) {
    var preMax = 1;
    var preMin = 1;
    var max = Number.MIN_SAFE_INTEGER;

    for (var i = 0; i < nums.length; i++) {
        if (nums[i] < 0) {
            var temp = preMax;
            preMax = preMin;
            preMin = temp;
        }
        preMax = Math.max(preMax * nums[i], nums[i]);
        preMin = Math.min(preMin * nums[i], nums[i]);
        max = Math.max(max, preMax);
    }
    return max;
};

// 方法二：效果没有第一个好
var maxProduct = function (nums) {
    let max = nums[0];
    let min = nums[0];
    let res = nums[0];

    for (let i = 1; i < nums.length; i++) {
        let tmp = min;
        // 取最小
        min = Math.min(nums[i], Math.min(max * nums[i], min * nums[i]));
        // 取最大
        max = Math.max(nums[i], Math.max(max * nums[i], tmp * nums[i]));
        res = Math.max(res, max);
    }
    return res;
};