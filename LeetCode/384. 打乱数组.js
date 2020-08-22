// 打乱一个没有重复元素的数组。

// 示例:
// // 以数字集合 1, 2 和 3 初始化数组。
// int[] nums = {1,2,3};
// Solution solution = new Solution(nums);

// // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。
// solution.shuffle();

// // 重设数组到它的初始状态[1,2,3]。
// solution.reset();

// // 随机返回数组[1,2,3]打乱后的结果。
// solution.shuffle();

// 方法一：
// 思路
// reset 函数：
// 缓存传入的原始数据，用于在函数调用时返回。
// 但值得一提的是，进行缓存原始数据时，必须进行浅拷贝，
// 因为原始数据为数组，普通的赋值会导致引用对象传递，
// 一旦变更了 this.nums 的数组内容，缓存的数组也将同步变更
// shuffle 函数：
// 我们模拟一个这样的场景，有 n 个标着数的球，我们把这 n 个球放入一个看不见的袋子中，
// 每次从中摸一个球出来，并按照摸出的顺序，直到摸空袋子。
// 具体的操作，我们把原始数组复制一份为 nums，
// 每次根据 nums 的长度随机生成一个下标从 nums 中取一个数出来，将其放入新数组 ary 中，并删除 nums 中对应下标的数
var Solution = function (nums) {
  this.nums = nums;
  this.original = nums.slice(0);
};

/**
 * Resets the array to its original configuration and return it.
 * @return {number[]}
 */
Solution.prototype.reset = function () {
  this.nums = this.original;
  this.original = this.original.slice(0);
  return this.original;
};

/**
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
Solution.prototype.shuffle = function () {
  const ary = [];
  const nums = this.nums.slice(0);
  const len = nums.length;
  for (let i = 0; i < len; i += 1) {
    const targetIndex = Math.floor(Math.random() * nums.length);
    ary[i] = nums[targetIndex];
    nums.splice(targetIndex, 1);
  }
  return ary;
};
// 时间复杂度：O(n^2); 空间复杂度: O(n)

// 方法二：
// 思路：
// reset 函数：同方法一
// shuffle 函数：为降低方法一中的时间复杂度，我们可以让数组中的元素进行互换，从而减少 splice 方法所需执行的时间。
// 具体的操作，我们从数组的最后往前迭代，生成一个范围在 0到当前遍历下标之间的随机整数，和当前遍历下标的元素进行互换。
// 这跟方法一中的模拟摸球是一样的，每次被摸出的球便不能再被摸出来。
var Solution = function (nums) {
  this.nums = nums;
  this.original = nums.slice(0);
};

/**
 * Resets the array to its original configuration and return it.
 * @return {number[]}
 */
Solution.prototype.reset = function () {
  this.nums = this.original;
  this.original = this.original.slice(0);
  return this.original;
};

/**
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
Solution.prototype.shuffle = function () {
  const nums = this.nums.slice(0);
  const len = nums.length;
  for (let i = len - 1; i > 0; i -= 1) {
    const targetIndex = Math.floor(Math.random() * (i + 1));
    const tmp = nums[i];
    nums[i] = nums[targetIndex];
    nums[targetIndex] = tmp;
  }
  return nums;
};
// 时间复杂度：O(n); 空间复杂度：O(n)
