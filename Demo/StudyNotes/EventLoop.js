// JS事件循环 event loop
// 参考链接：
// 1.(incredibly easy to understand) https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/?utm_source=html5weekly
// 2.  https://juejin.im/post/6844903638238756878#heading-6

// 案例1
console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0);
Promise.resolve()
  .then(function () {
    console.log('promise1');
  })
  .then(function () {
    console.log('promise2');
  });
console.log('script end');

// 输出；
// script start
// script end
// promise1
// promise2
// setTimeout

// 案例2
console.log('1');
setTimeout(function () {
  console.log('2');
  process.nextTick(function () {
    console.log('3');
  });
  new Promise(function (resolve) {
    console.log('4');
    resolve();
  }).then(function () {
    console.log('5');
  });
});
process.nextTick(function () {
  console.log('6');
});
new Promise(function (resolve) {
  console.log('7');
  resolve();
}).then(function () {
  console.log('8');
});

setTimeout(function () {
  console.log('9');
  process.nextTick(function () {
    console.log('10');
  });
  new Promise(function (resolve) {
    console.log('11');
    resolve();
  }).then(function () {
    console.log('12');
  });
});

// 输出
// 1
// 7
// 6
// 8
// 2
// 4
// 3
// 5
// 9
// 11
// 10
// 12

// 解析：
// 整体script作为第一个宏任务进入主线程，遇到console.log，输出1。
// 遇到setTimeout，其回调函数被分发到宏任务Event Queue中。我们暂且记为setTimeout1。
// 遇到process.nextTick()，其回调函数被分发到微任务Event Queue中。我们记为process1。
// 遇到Promise，new Promise直接执行，输出7。then被分发到微任务Event Queue中。我们记为then1。
// 又遇到了setTimeout，其回调函数被分发到宏任务Event Queue中，我们记为setTimeout2。

// console.log("outer");
// setTimeout(() => {
//   setTimeout(() => {
//     console.log("setTimeout");
//   }, 0);
//   setImmediate(() => {
//     console.log("setImmediate");
//   });
// }, 0);

// Promise和process.nextTick谁先执行
// 因为process.nextTick为Node环境下的方法，所以后续的分析依旧基于Node。
// process.nextTick() 是一个特殊的异步API，其不属于任何的Event Loop阶段。事实上Node在遇到这个API时，Event Loop根本就不会继续进行，会马上停下来执行process.nextTick()，这个执行完后才会继续Event Loop。
// 所以，nextTick和Promise同时出现时，肯定是nextTick先执行，原因是nextTick的队列比Promise队列优先级更高。

// 案例3
console.log('script start');
async function async1() {
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2 end');
}
async1();

setTimeout(function () {
  console.log('setTimeout');
}, 0);

new Promise((resolve) => {
  console.log('Promise');
  resolve();
})
  .then(function () {
    console.log('promise1');
  })
  .then(function () {
    console.log('promise2');
  });
console.log('script end');

// 输出：
// script start
// async2 end
// Promise
// script end
// async1 end
// promise1
// promise2
// setTimeout

// 案例4
Promise.resolve().then(function promise1() {
  console.log('promise1');
});
setTimeout(function setTimeout1() {
  console.log('setTimeout1');
  Promise.resolve().then(function promise2() {
    console.log('promise2');
  });
}, 0);

setTimeout(function setTimeout2() {
  console.log('setTimeout2');
}, 0);

// 输出：
// promise1
// setTimeout1
// promise2
// setTimeout2

// 案例5
setTimeout((_) => console.log('setTimeout4'));
new Promise((resolve) => {
  resolve();
  console.log('Promise1');
}).then((_) => {
  console.log('Promise3');
  Promise.resolve()
    .then((_) => {
      console.log('before timeout');
    })
    .then((_) => {
      Promise.resolve().then((_) => {
        console.log('also before timeout');
      });
    });
});
// console.log(2);
// 输出
// Promise1
// 2
// Promise3
// before timeout
// also before timeout
// setTimeout4

// 案例6
// 宏任务队列 1
setTimeout(() => {
  // 宏任务队列 1.1
  console.log('timer_1');
  setTimeout(() => {
    // 宏任务队列 3
    console.log('timer_3');
  }, 0);
  new Promise((resolve) => {
    resolve();
    console.log('new promise');
  }).then(() => {
    // 微任务队列 1
    console.log('promise then');
  });
}, 0);

setTimeout(() => {
  // 宏任务队列 2.2
  console.log('timer_2');
}, 0);

console.log('========== Sync queue ==========');

// 输出
// ========== Sync queue ==========
// timer_1
// new promise
// promise then
// timer_2
// timer_3

// 案例7：微任务队列中创建的宏任务
// 宏任务1
new Promise((resolve) => {
  console.log('new Promise(macro task 1)');
  resolve();
}).then(() => {
  // 微任务1
  console.log('micro task 1');
  setTimeout(() => {
    // 宏任务3
    console.log('macro task 3');
  }, 0);
});

setTimeout(() => {
  // 宏任务2
  console.log('macro task 2');
}, 0);

console.log('========== Sync queue(macro task 1) ==========');
// 输出
// new Promise(macro task 1)
// ========== Sync queue(macro task 1) ==========
// micro task 1
// macro task 2
// macro task 3

// async function async1() {
//   console.log("async1 start");
//   await async2();
//   console.log("async1 end");
// }

// 等价于
// async function async1() {
//   console.log("async1 start");
//   Promise.resolve(async2()).then(() => {
//     console.log("async1 end");
//   });
// }

// 案例8
console.log('a');

new Promise((resolve) => {
  console.log('b');
  resolve();
}).then(() => {
  console.log('c');
  setTimeout(() => {
    console.log('d');
  }, 0);
});

setTimeout(() => {
  console.log('e');
  new Promise((resolve) => {
    console.log('f');
    resolve();
  }).then(() => {
    console.log('g');
  });
}, 100);

setTimeout(() => {
  console.log('h');
  new Promise((resolve) => {
    resolve();
  }).then(() => {
    console.log('i');
  });
  console.log('j');
}, 0);

// 输出：
// a
// b
// c
// h
// j
// i
// d
// e
// f
// g

// 案例 9
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  //async2做出如下更改：
  new Promise(function (resolve) {
    console.log('promise1');
    resolve();
  }).then(function () {
    console.log('promise2');
  });
}
console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);
async1();

new Promise(function (resolve) {
  console.log('promise3');
  resolve();
}).then(function () {
  console.log('promise4');
});

console.log('script end');

// 输出：
// script start
// async1 start
// promise1
// promise3
// script end
// promise2
// async1 end
// promise4
// setTimeout

// 案例10
async function async1() {
  console.log('async1 start');
  await async2();
  // 更改如下：
  setTimeout(function () {
    console.log('setTimeout1');
  }, 0);
}

async function async2() {
  // 更改如下：
  setTimeout(function () {
    console.log('setTimeout2');
  }, 0);
}

console.log('script start');

setTimeout(function () {
  console.log('setTimeout3');
}, 0);

async1();

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end');

// 输出
// script start
// async1 start
// promise1
// script end
// promise2
// setTimeout3
// setTimeout2
// setTimeout1

// 案例11
async function a1() {
  console.log('a1 start');
  await a2();
  console.log('a1 end');
}

async function a2() {
  console.log('a2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('promise1');
});

a1();

let promise2 = new Promise((resolve) => {
  resolve('promise2.then');
  console.log('promise2');
});

promise2.then((res) => {
  console.log(res);
  Promise.resolve().then(() => {
    console.log('promise3');
  });
});
console.log('script end');

// 输出
// script start
// a1 start
// a2
// promise2
// script end
// promise1
// a1 end
// promise2.then
// promise3
// setTimeout

// 案例参考链接：https://juejin.im/post/6844904202871799821
