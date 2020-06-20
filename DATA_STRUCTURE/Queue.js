// 队列
// 先进先出
// 应用：打印机，线程队列
// JS任务队列
export class Queue {
  constructor() {
    this.items = [];
  }

  // 向队列尾部添加一个或多个新的项
  enqueue(element) {
    this.items.push(element);
  }

  // delete queue方法
  dequeue() {
    return this.items.shift();
  }

  front() {
    if (this.items.length === 0) return null;
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

// 击鼓传花
export function passGame(nameList, num) {
  // 创建队列
  const queue = new Queue();

  // 通过for循环，将nameList中的人放在队列中
  for (let i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }

  // 循环让游戏者进入队列
  while (queue.size() > 1) {
    for (let i = 0; i < 7; i++) {
      queue.enqueue(queue.dequeue());
    }
    // 将第num个人, 从队列中移除
    queue.dequeue();
  }

  // 获取剩下的一个人
  alert(queue.size());
  let endName = queue.dequeue();
  alert("最终留下来的人：" + endName);

  // return queue.front();
  // 获取该人在队列中的位置
  return nameList.indexOf(endName);
}
