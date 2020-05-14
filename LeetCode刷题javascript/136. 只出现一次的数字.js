// 给定一个非空整数数组， 除了某个元素只出现一次以外， 其余每个元素均出现两次。 找出那个只出现了一次的元素。

// 说明：
// 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

// 示例 1:
// 输入: [2, 2, 1]
// 输出: 1

// 示例 2:
// 输入: [4, 1, 2, 1, 2]
// 输出: 4

// 方法一：
var singleNumber = function (nums) {
    // 先排序。再暴力
    nums = nums.sort();
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1] && nums[i] !== nums[i + 1]) return nums[i];
    }
};

// 方法二：哈希(这个效果更好)
var singleNumber = function (nums) {
    let numsObj = {};
    for (let i = 0; i < nums.length; i++) {
        if (numsObj[nums[i]]) {
            delete numsObj[nums[i]];
        } else {
            numsObj[nums[i]] = 1;
        }
    }
    return Object.keys(numsObj)[0];
};