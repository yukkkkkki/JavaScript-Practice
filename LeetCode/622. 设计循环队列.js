/**
 * @param {number} k
 */
var MyCircularQueue = function (k) {
  this.capacity = k;
  this.queue = [];
  this.head = -1;
  this.tail = -1;
};

/**
 *  @description 向循环队列插入一个元素
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
  if (this.isFull()) return false;

  if (this.isEmpty()) {
    this.head = 0;
  }
  this.tail = (this.tail + 1) % this.capacity;
  this.queue[this.tail] = value;
  return true;
};

/**
 * @description 从循环队列中删除一个元素
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) return false;
  if (this.head === this.tail) {
    this.head = -1;
    this.tail = -1;
  } else {
    this.head = (this.head + 1) % this.capacity;
  }
  return true;
};

/**
 * @description 从队首获取元素
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
  if (this.isEmpty()) return -1;
  return this.queue[this.head];
};

/**
 * @description 从队尾获取元素
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
  if (this.isEmpty()) return -1;
  return this.queue[this.tail];
};

/**
 * @description 队列是否为空
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function () {
  return this.head === -1;
};

/**
 * @description 队列是否已满
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function () {
  return this.head === (this.tail + 1) % this.capacity;
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
