// 方法一：哈希表
var findRepeatNumber = function (nums) {
  var set = new Set();
  for (var i of nums) {
    if (set.has(i)) {
      return i;
    }
    set.add(i);
  }
};

// 方法二
var findRepeatNumber = function (nums) {
  res = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums.indexOf(nums[i]) != nums.lastIndexOf(nums[i])) {
      return nums[i];
    }
  }
};

