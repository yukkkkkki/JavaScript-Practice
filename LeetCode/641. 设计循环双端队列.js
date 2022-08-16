// 方法一：数组
/**
 * @param {number} k
 */
var MyCircularDeque = function (k) {
  this.capacity = k + 1;
  this.rear = this.front = 0;
  this.elements = new Array(k + 1).fill(0);
};

/**
 * @description 队列未满时，在队首插入一个元素
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function (value) {
  if (this.isFull()) return false;
  this.front = (this.front - 1 + this.capacity) % this.capacity;
  this.elements[this.front] = value;
  return true;
};

/**
 * @description 队列未满时，在队尾插入一个元素
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function (value) {
  if (this.isFull()) return false;
  this.elements[this.rear] = value;
  this.rear = (this.rear + 1) % this.capacity;
  return true;
};

/**
 * @description 队列不为空时，从队首删除一个元素
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function () {
  if (this.isEmpty()) return false;
  this.front = (this.front + 1) % this.capacity;
  return true;
};

/**
 * @description 队列不为空时，从队尾删除一个元素
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function () {
  if (this.isEmpty()) return false;
  this.rear = (this.rear - 1 + this.capacity) % this.capacity;
  return true;
};

/**
 * @description 返回队首的元素，需要检测队列是否为空
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function () {
  if (this.isEmpty()) return -1;
  return this.elements[this.front];
};

/**
 * @description 返回队尾的元素，需要检测队列是否为空
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function () {
  if (this.isEmpty()) return -1;
  return this.elements[(this.rear - 1 + this.capacity) % this.capacity];
};

/**
 * @description 检测队列是否为空，根据之前的定义只需判断 rear 是否等于 front
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function () {
  return this.rear == this.front;
};

/**
 * @description 检测队列是否已满，根据之前的定义只需判断 front 是否等于 (rear + 1) mod capacity
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function () {
  return (this.rear + 1) % this.capacity === this.front;
};

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */
