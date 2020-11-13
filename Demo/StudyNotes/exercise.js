// let str = 'ahbc345lkiol876kkk67';
// let res = [];
// let temp;
// for (let i = 0; i < str.length; i++) {
//   if (
//     str[i].charCodeAt() >= '0'.charCodeAt() &&
//     str[i].charCodeAt() <= '9'.charCodeAt()
//   ) {
//     res.push(parseInt(str[i]));
//   }
// }
// console.log(res);
// let reg = /\d+/g;
// let newreg = str.match(reg);
// console.log(newreg);
// console.log(str.charCodeAt

// // 原型链继承
// function SuperType() {}
// function SubType() {}

// SubType.prototype = new SuperType();
// SubType.prototype.getSubValue = function () {};

// // 构造函数继承
// function SuperType(name) {}
// function SubType() {
//   SubType.call(this, 'selena');
// }
// var instance = new SubType();

// function countingSort(arr) {
//   const n = arr.length;
//   let max = Math.max(...arr);
//   let min = Math.min(...arr);

//   let buckets = new Array(max - min + 1).fill(0);
//   for (let item of arr) {
//     buckets[item - min]++; // 解决出现负数的情况
//   }
//   let current = 0;
//   for (let i = 0; i < buckets.length; i++) {
//     while (buckets[i] > 0) {
//       arr[current++] = i + min; // 将桶的编号加上最小值，变回原来的元素
//       console.log(arr);
//       buckets[i]--;
//     }
//   }
//   return arr;
// }

// function bucketSort(arr, bucketSize) {
//   const n = arr.length;
//   if (n === 0) return arr;
//   // console.time('桶排序耗时');
//   let i = 0;
//   let min = arr[0];
//   let max = arr[0];
//   for (i = 1; i < n; i++) {
//     if (arr[i] < min) {
//       min = arr[i];
//     } else if (arr[i] > max) {
//       max = arr[i];
//     }
//   }
//   // 桶的初始化
//   const default_bucket_size = 5;
//   bucketSize = bucketSize || default_bucket_size;
//   const bucketCount = Math.floor((max - min) / bucketSize) + 1;
//   const buckets = new Array(bucketCount);
//   for (i = 0; i < buckets.length; i++) {
//     buckets[i] = [];
//   }
//   // 利用映射函数将数据分配到各个桶中
//   for (i = 0; i < n; i++) {
//     buckets[Math.floor((arr[i] - min) / bucketSize)].push(arr[i]);
//   }
//   arr.length = 0;
//   for (i = 0; i < buckets.length; i++) {
//     quickSort(buckets[i]); //对每个桶进行排序，这里使用了快速排序
//     for (let j = 0; j < buckets[i].length; j++) {
//       arr.push(buckets[i][j]);
//     }
//   }
//   // console.timeEnd('桶排序耗时');
//   return arr;
// }

// const quickSort = (arr, left, right) => {
//   let len = arr.length,
//     partitionIndex;
//   left = typeof left != 'number' ? 0 : left;
//   right = typeof right != 'number' ? len - 1 : right;
//   if (left < right) {
//     partitionIndex = partition(arr, left, right);
//     quickSort(arr, left, partitionIndex - 1);
//     quickSort(arr, partitionIndex + 1, right);
//   }
//   return arr;
// };
// //分区操作
// const partition = (arr, left, right) => {
//   let pivot = left,
//     index = pivot + 1;
//   for (let i = index; i <= right; i++) {
//     if (arr[i] < arr[pivot]) {
//       swap(arr, i, index);
//       index++;
//     }
//   }
//   swap(arr, pivot, index - 1);
//   return index - 1;
// };

// const swap = (arr, i, j) => {
//   let temp = arr[i];
//   arr[i] = arr[j];
//   arr[j] = temp;
// };

/**
 * name: 基数排序
 * @param  array 待排序数组
 * @param  max 最大位数
 */
// const radixSort = (array, max) => {
//   console.time('计数排序耗时');
//   const buckets = [];
//   let unit = 10,
//     base = 1;
//   for (let i = 0; i < max; i++, base *= 10, unit *= 10) {
//     for (let j = 0; j < array.length; j++) {
//       // 依次过滤出个位，十位等等数字
//       let index = ~~((array[j] % unit) / base);
//       if (buckets[index] == null) {
//         buckets[index] = []; //初始化桶
//       }
//       buckets[index].push(array[j]); //往不同桶里添加数据
//     }
//     let pos = 0,
//       value;
//     for (let j = 0, length = buckets.length; j < length; j++) {
//       if (buckets[j] != null) {
//         while ((value = buckets[j].shift()) != null) {
//           // 将不同桶里数据挨个捞出来，为下一轮高位排序做准备
//           // 由于靠近桶底的元素排名靠前，因此从桶底先捞
//           array[pos++] = value;
//         }
//       }
//     }
//   }
//   console.timeEnd('计数排序耗时');
//   return array;
// };

// const radixSort = (array) => {
//   // console.time('基数排序耗时');
//   let min = Math.min(...array);
//   if (min < 0) {
//     // 处理有负数的情况
//     var abs = Math.abs(min);
//     for (let i = 0; i < array.length; i++) {
//       array[i] = array[i] + abs;
//     }
//   }
//   let maxDigits = String(Math.max(...array)).length;
//   const buckets = [];
//   let unit = 10,
//     base = 1;
//   for (let i = 0; i < maxDigits; i++, base *= 10, unit *= 10) {
//     for (let j = 0; j < array.length; j++) {
//       // 依次过滤出个位，十位等等数字
//       let index = ~~((array[j] % unit) / base);
//       if (buckets[index] == null) {
//         buckets[index] = []; //初始化桶
//       }
//       buckets[index].push(array[j]); //往不同桶里添加数据
//     }
//     let pos = 0,
//       value;
//     for (let j = 0; j < buckets.length; j++) {
//       if (buckets[j] != null) {
//         while ((value = buckets[j].shift()) != null) {
//           // 将不同桶里数据挨个捞出来，为下一轮高位排序做准备
//           // 由于靠近桶底的元素排名靠前，因此从桶底先捞
//           array[pos++] = value;
//         }
//       }
//     }
//   }
//   if (min < 0) {
//     for (let i = 0; i < array.length; i++) {
//       array[i] = array[i] - abs;
//     }
//   }
//   // console.timeEnd('基数排序耗时');
//   return array;
// };

const radixSort = (array, maxDigits) => {
  console.time('计数排序耗时');
  const buckets = [];
  let unit = 10,
    base = 1;
  for (let i = 0; i < maxDigits; i++, base *= 10, unit *= 10) {
    for (let j = 0; j < array.length; j++) {
      // 依次过滤出个位，十位等等数字
      let index = ~~((array[j] % unit) / base);
      if (buckets[index] == null) {
        buckets[index] = []; //初始化桶
      }
      buckets[index].push(array[j]); // 往不同桶里添加数据
    }
    let pos = 0,
      value;
    for (let j = 0, length = buckets.length; j < length; j++) {
      if (buckets[j] != null) {
        while ((value = buckets[j].shift()) != null) {
          // 将不同桶里数据挨个捞出来，为下一轮高位排序做准备
          // 由于靠近桶底的元素排名靠前，因此从桶底先捞
          array[pos++] = value;
        }
      }
    }
  }
  console.timeEnd('计数排序耗时');
  return array;
};
// console.log(
//   radixSort([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48], 2)
// );
// console.log(
//   radixSort([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48], 2)
// );

// var obj = {};
// var value = null;
// Object.defineProperty(obj, 'num', {
//   get: function () {
//     console.log('执行了 get 操作');
//     return value;
//   },
//   set: function (newValue) {
//     console.log('执行了 set 操作');
//     value = newValue;
//   },
// });
// obj.num = 1; // 执行了 set 操作
// console.log(obj.num); // 执行了 get 操作 // 1

// function Watcher() {
//   let value = null;
//   let watch = [];

//   Object.defineProperty(this, 'num', {
//     get: function () {
//       console.log('执行了 get 操作');
//       return value;
//     },
//     set: function (newValue) {
//       console.log('执行了 set 操作');
//       value = newValue;
//       watch.push({ val: value });
//     },
//   });
//   this.getWatch = function () {
//     return watch;
//   };
// }

// var tmp = new Watcher();
// tmp.num; // 执行了 get 操作
// tmp.num = 11; // 执行了 set 操作
// tmp.num = 13; // 执行了 set 操作
// console.log(tmp.getWatch()); // [ { val: 11 }, { val: 13 } ]

// let target = { _prop: 'foo', prop: 'foo' }; // 要拦截的对象
// var proxy = new Proxy(target, {
//   get: function (obj, prop) {
//     console.log('设置 get 操作');
//     return obj[prop];
//   },
//   set: function (obj, prop, value) {
//     console.log('设置 set 操作');
//     obj[prop] = value;
//   },
//   has(target, key) {
//     if (key[0] === '_') {
//       return false;
//     }
//     return key in target;
//   },
// });

// proxy.time = 35; // 设置 set 操作
// console.log(proxy.time); // 设置 get 操作 // 35
// console.log('_prop' in proxy); // false

// function createArray(...elements) {
//   let handler = {
//     get(target, propKey, receiver) {
//       let index = Number(propKey);
//       if (index < 0) {
//         propKey = String(target.length + index);
//       }
//       return Reflect.get(target, propKey, receiver);
//     },
//   };

//   let target = [];
//   target.push(...elements);
//   return new Proxy(target, handler);
// }

// let arr = createArray('a', 'b', 'c');
// console.log(arr[-1]); // c

// let a = [1, 2, 3];
// let b = a;

let count = 0;
let arr = [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
for (let i = 0; i < 4; i++) {
  let index = i * 5;
  let tmp = arr.slice(index, index + 5).filter((item) => item == 1);
  if (tmp.length) count++;
  // if (tmp.filter((item) => item == 1)) count++;
  // for (let j = 0; j < 5; j++) {
  //   if (tmp[j]) count += 1;
  // }
}
console.log(count);
