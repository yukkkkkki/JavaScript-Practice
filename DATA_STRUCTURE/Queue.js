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
    return this.items[0]
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}