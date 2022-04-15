// 设计一个支持在平均 时间复杂度 O(1) 下， 执行以下操作的数据结构。

// 注意: 允许出现重复元素。

// insert(val)：向集合中插入元素 val。
// remove(val)：当 val 存在时，从集合中移除一个 val。
// getRandom：从现有集合中随机获取一个元素。每个元素被返回的概率应该与其在集合中的数量呈线性相关。

// 示例:
// // 初始化一个空的集合。
// RandomizedCollection collection = new RandomizedCollection();

// // 向集合中插入 1 。返回 true 表示集合不包含 1 。
// collection.insert(1);

// // 向集合中插入另一个 1 。返回 false 表示集合包含 1 。集合现在包含 [1,1] 。
// collection.insert(1);

// // 向集合中插入 2 ，返回 true 。集合现在包含 [1,1,2] 。
// collection.insert(2);

// // getRandom 应当有 2/3 的概率返回 1 ，1/3 的概率返回 2 。
// collection.getRandom();

// // 从集合中删除 1 ，返回 true 。集合现在包含 [1,2] 。
// collection.remove(1);

// // getRandom 应有相同概率返回 1 和 2 。
// collection.getRandom();

class RandomizedCollection {
  constructor() {
    this.index = new Map();
    this.nums = [];
  }
  insert(val) {
    this.nums.push(val);
    const set = this.index.has(val) ? this.index.get(val) : new Set();
    set.add(this.nums.length - 1);
    this.index.set(val, set);
    return set.size === 1;
  }
  remove(val) {
    if (!this.index.has(val)) return false;
    let i = undefined;
    for (let item of this.index.get(val)) {
      if (!i) {
        i = item;
        break;
      }
    }
    const lastNum = this.nums[this.nums.length - 1];
    this.nums[i] = lastNum;
    this.index.get(val).delete(i);
    this.index.get(lastNum).delete(this.nums.length - 1);
    if (i < this.nums.length - 1) {
      this.index.get(lastNum).add(i);
    }
    if (this.index.get(val).size === 0) {
      this.index.delete(val);
    }
    this.nums.pop();
    return true;
  }
  getRandom() {
    return this.nums[Math.floor(Math.random() * this.nums.length)];
  }
}
// // // 初始化一个空的集合。
// let collection = new RandomizedCollection();

// // 向集合中插入 1 。返回 true 表示集合不包含 1 。
// collection.insert(1);

// // 向集合中插入另一个 1 。返回 false 表示集合包含 1 。集合现在包含 [1,1] 。
// collection.insert(1);

// // 向集合中插入 2 ，返回 true 。集合现在包含 [1,1,2] 。
// collection.insert(2);

// // getRandom 应当有 2/3 的概率返回 1 ，1/3 的概率返回 2 。
// collection.getRandom();

// // 从集合中删除 1 ，返回 true 。集合现在包含 [1,2] 。
// collection.remove(1);

// // getRandom 应有相同概率返回 1 和 2 。
// collection.getRandom();
