/**
 * Initialize your data structure here.
 */
// 方法一：变长数组 + 哈希表
var RandomizedSet = function () {
  this.nums = [];
  this.indices = new Map();
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (this.indices.has(val)) return false;

  let idx = this.nums.length;
  this.nums.push(val);
  this.indices.set(val, idx);
  return true;
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  if (!this.indices.has(val)) return false;

  let id = this.indices.get(val);
  // 数组里把要删除的元素换到结尾，然后相当于栈顶弹出
  this.nums[id] = this.nums[this.nums.length - 1];
  this.indices.set(this.nums[id], id);
  this.nums.pop();
  // 哈希表里也 delete
  this.indices.delete(val);
  return true;
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  let randomIndex = Math.floor(Math.random() * this.nums.length);
  return this.nums[randomIndex];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
// 时间复杂度：O(1)
// 空间复杂度：O(n)
