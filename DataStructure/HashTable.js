// 哈希表
// 通常是基于数组实现的，但是相对于数组，它也有很多优势：
// 1.可以提供非常快速的插入-删除-查找操作
// 2.无论多少数据，插入和删除值需要接近常量的时间，即O(1)
// 3.哈希表的速度比树还快

// 哈希表相对于数组的一些不足：
// 1.哈希表中的数据没有顺序，所以不能以一种固定的方式来遍历其中的元素
// 2.通常哈希表中的key值不允许重复，不能放置相同的key，用于保存不同的元素

// 哈希化

// console.log(hashFunc('name', 10));
const MAX_LOAD_FACTOR = 0.75;
const MIN_LOAD_FACTOR = 0.25;

// export function isPrime(num) {
//   // for (let i = 2; i < num; i++) {
//   //   if (num % i === 0) {
//   //     return false;
//   //   }
//   // }
//   // return true;
//   let temp = Math.ceil(Math.sqrt(num));
//   for (let i = 2; i < temp; i++) {
//     if (num % i === 0) {
//       return false;
//     }
//   }
//   return true;
// }

// function getPrime(num) {
//   while (!isPrime(num)) {
//     num++;
//   }
//   return num;
// }

export class HashTable {
  constructor() {
    this.storage = []; // 数组存储元素
    this.count = 0; // 当前存放了多少元素
    this.limit = 8; // 总个数
  }

  // 哈希函数
  hashFunc(str, max) {
    // 1.定义hashCode
    let hashCode = 0;
    // 2.霍纳算法
    for (let i = 0; i < str.length; i++) {
      hashCode = 31 * hashCode + str.charCodeAt(i);
    }

    hashCode = hashCode % max;
    return hashCode;
  }

  isPrime(num) {
    // for (let i = 2; i < num; i++) {
    //   if (num % i === 0) {
    //     return false;
    //   }
    // }
    // return true;
    let temp = Math.ceil(Math.sqrt(num));
    for (let i = 2; i < temp; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }

  getPrime(num) {
    while (!isPrime(num)) {
      num++;
    }
    return num;
  }

  // 放入/修改元素：HashMap -> {key, value}
  put(key, value) {
    // 根据key映射到index
    const index = this.hashFunc(ket, this.limit);
    // 取出数组
    let bucket = this.storage[index];
    if (bucket === undefined) {
      bucket = [];
      this.storage[index] = bucket;
    }
    // 判断是插入还是修改
    let override = false;
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i];
      if (tuple[0] === key) {
        tuple[1] = value;
        override = true;
      }
    }

    // 如果没有覆盖，则为新增
    if (!override) {
      bucket.push([key, value]);
      this.count++;

      if (this.count > this.limit * MAX_LOAD_FACTOR) {
        let newLimit = this.limit * 2;
        newLimit = this.getPrime(newLimit);
        this.resize(this.limit * 2);
      }
    }
  }

  // 根据key获取value
  get(key) {
    // 根据key获取index
    const index = this.hashFunc(key, this.limit);
    // 获取bucket
    const bucket = this.storage[index];
    if (bucket === undefined) {
      return null;
    }
    // 遍历bucket，一个个查找
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i];
      if (tuple[0] === key) {
        return tuple[1];
      }
    }
    return null;
  }

  // 删除元素
  remove(key) {
    // key获取index
    const index = this.hashFunc(key, this.limit);
    // 获取bucket
    const bucket = this.storage[index];
    if (bucket === undefined) {
      return null;
    }
    // 遍历bucket，找到元素，并且将删除的元素返回
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i];
      if (tuple[0] === key) {
        bucket.splice(i, 1);
        this.count--;
        if (this.limit > 8 && this.count < this.limit * MIN_LOAD_FACTOR) {
          let newLimit = Math.floor(this.limit / 2);
          newLimit = this.getPrime(newLimit);
          this.resize(newLimit);
        }
        return tuple[1];
      }
    }
  }

  // 是否为空
  isEmpty() {
    return this.count === 0;
  }

  // 返回长度
  size() {
    return this.count;
  }

  // 扩容
  resize(newLimit) {
    // 保存旧数组中的内容
    let oldStorage = this.storage;
    this.limit = this.limit * 2;
    this.storage = [];
    this.count = 0;
    // 取出oldStorage所有元素
    oldStorage.forEach((bucket) => {
      if (bucket === null) {
        return;
      }
      for (let i = 0; i < bucket.length; i++) {
        let tuple = bucket[i];
        this.put(tuple[0], tuple[1]);
      }
    });
  }
}
