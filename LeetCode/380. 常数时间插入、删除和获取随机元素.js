// 设计一个支持在平均 时间复杂度 O(1) 下，执行以下操作的数据结构。
//     insert(val)：当元素 val 不存在时，向集合中插入该项。
//     remove(val)：元素 val 存在时，从集合中移除该项。
//     getRandom：随机返回现有集合中的一项。每个元素应该有相同的概率被返回。

// 示例 :
// // 初始化一个空的集合。
// RandomizedSet randomSet = new RandomizedSet();

// // 向集合中插入 1 。返回 true 表示 1 被成功地插入。
// randomSet.insert(1);

// // 返回 false ，表示集合中不存在 2 。
// randomSet.remove(2);

// // 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
// randomSet.insert(2);

// // getRandom 应随机返回 1 或 2 。
// randomSet.getRandom();

// // 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
// randomSet.remove(1);

// // 2 已在集合中，所以返回 false 。
// randomSet.insert(2);

// // 由于 2 是集合中唯一的数字，getRandom 总是返回 2 。
// randomSet.getRandom();

// 方法一：Array + Object(Map)
// 使用动态数组存储元素值，对象存储值到索引的映射；有索引可以实现常数时间的 insert 和
// getRandom。remove 的常数时间则使用：总是删除最后一个元素，将要删除元素和最后一个元素
// 交换，然后将最后一个元素删除来实现
var RandomizedSet = function () {
  this.arr = [];
  this.values = {};
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (this.values[val] >= 0) {
    return false;
  } else {
    this.values[val] = this.arr.length;
    this.arr.push(val);
    return true;
  }
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  const i = this.values[val];
  const l = this.arr.length;
  if (i >= 0) {
    this.values[this.arr[l - 1]] = i;
    this.values[val] = -1;
    this.arr.splice(i, 1, this.arr[l - 1]);
    this.arr.pop();
    return true;
  } else {
    return false;
  }
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  const i = Math.floor(Math.random() * this.arr.length);
  return this.arr[i];
};
// 时间复杂度：O(1); 空间复杂度：O(n)
