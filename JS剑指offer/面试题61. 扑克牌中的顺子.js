// 从扑克牌中随机抽5张牌，判断是不是一个顺子，即这5张牌是不是连续的。2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。


// 示例 1:
// 输入: [1,2,3,4,5]
// 输出: True

// 示例 2:
// 输入: [0,0,1,2,5]
// 输出: True


// 限制：
// 数组长度为 5 
// 数组的数取值为 [0, 13]

var isStraight = function (nums) {
  /*
    1. 升序,统计大、小王数量 king
    2. 遍历从非0开始，旦遇到不连续的，king--
    3. 如果循环能遍历到最后结束，说明是顺子，否则不是
    */
  nums.sort((a, b) => a - b);
  let king = 0,
    i = 0;
  // 统计大小王数量
  while (i < nums.length && nums[i] === 0) {
    king++;
    i++;
  }
  while (i < nums.length - 1) {
    let difLen = nums[i + 1] - nums[i];
    if (difLen > 1) {
      king -= (difLen - 1);
      if (king < 0) return false;
    } else if (difLen == 0) { //相同的，肯定不是顺子
      return false;
    }
    i++;
  }
  return true;
}

// 方法二
// 如果空缺的总数 <= 0的个数，那么这个数组就是连续的；反之则不连续
// 如果数组中的非0数字重复出现，则该数组不是连续的
var isStraight = function (nums) {
  nums.sort((a, b) => a - b);
  // 0 的个数,第一个非0的坐标
  let zero = nums.lastIndexOf(0) + 1;
  let count = 0,
    len = nums.length;

  for (let i = zero; i < len - 1; i++) {
    let cut = nums[i + 1] - nums[i] - 1;
    // 这里等于-1代表两个数相等的，那肯定不是顺子
    if (cut == -1) return false;
    count += cut;
  }

  return zero >= count ? true : false;
};

// 方法三
var isStraight = function (nums) {
  nums.sort((a, b) => a - b);
  let zeros = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === 0) {
      zeros++;
      continue;
    }
    if (nums[i + 1] === nums[i]) return false;
    if (nums[i + 1] - nums[i] > 1) {
      zeros -= nums[i + 1] - nums[i] - 1;
      if (zeros < 0) return false;
      continue;
    }
    if (nums[i + 1] !== nums[i] + 1) {
      return false;
    }
  }
  return true;
};