// 找出数组中重复的数字。
// 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

// 示例 1：
// 输入：
// [2, 3, 1, 0, 2, 5, 3]
// 输出：2 或 3 

// 方法一
var findRepeatNumber = function(nums) {
    var set = new Set()
    for (var i of nums) {
        if (set.has(i)) {
            return i
        }
        set.add(i)
    }
};

// 方法二(耗时太久)
var findRepeatNumber = function(nums) {
    res = [];
    for(let i = 0; i < nums.length; i++){
        if(nums.indexOf(nums[i]) != nums.lastIndexOf(nums[i])) {
            return nums[i];
        }
    }
};