var MaxQueue = function () {
  this.queue = [];
  this.dequeue = [];
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function () {
  return this.dequeue.length ? this.dequeue[0] : -1;
};

/**
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function (value) {
  this.queue.push(value);
  while (this.dequeue.length && value > this.dequeue[this.dequeue.length - 1]) {
    this.dequeue.pop();
  }
  this.dequeue.push(value);
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function () {
  if (!this.dequeue.length) {
    return -1;
  }
  if (this.queue[0] === this.dequeue[0]) {
    this.dequeue.shift();
  }
  return this.queue.shift();
};
