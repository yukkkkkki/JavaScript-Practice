var MyLinkedList = function () {
  this.head = null;
  this.tail = null;
  this.length = 0;
};

function Node(val) {
  //构造创建节点函数
  this.val = val;
  this.next = null;
}

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  let p = this.head;
  if (0 <= index && index < this.length) {
    for (let i = 0; i <= index; i++) {
      if (i === index) {
        return p.val;
      } else {
        p = p.next;
        continue;
      }
    }
  } else {
    return -1;
  }
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  this.addAtIndex(0, val);
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  this.addAtIndex(this.length, val);
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  let node = this.head;
  if ((index <= 0 && this.length != 0) || (this.length === 0 && index <= 0)) {
    //插入头部时
    this.head = new Node(val);
    this.head.next = node;
  } else {
    if (index > this.length) {
      return;
    }
    for (let i = 0; i < index - 1 && i <= this.length; i++) {
      node = node.next;
    }
    let temp = node.next;
    node.next = new Node(val);
    node.next.next = temp;
  }
  this.length++;
  return;
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index < 0 || index >= this.length) {
    return;
  } //排除不符合规范的索引
  let current = this.head;
  if (index == 0) {
    //删除第一个时
    this.head = this.head.next;
  } else {
    let i = 0;
    let previous = null;
    while (i++ < index) {
      previous = current;
      current = current.next;
    }
    previous.next = current.next;
  }
  this.length -= 1;
};
