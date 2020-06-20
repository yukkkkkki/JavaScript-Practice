// 双向链表
// 既可以从头遍历到尾，又可以从尾遍历到头
// 也就是链表相连的过程是双向的
// 一个节点既有向前链接的引用，也有一个向后连接的引用
// 双向链表可以有效地解决单向链表中提到的问题
import { LinkedList, Node } from "./LinkedList";

// 使用了继承
class DoublyNode extends Node {
  constructor(element) {
    super(element);
    this.prev = null;
  }
}

export class DoublyLinkedList extends LinkedList {
  constructor() {
    super();
    this.tail = null;
  }

  // 在尾部追加数据
  append(element) {
    // 根据element创建元素
    const newNode = new DoublyNode(element);

    if (this.head === null) {
      // 原来没有任何元素
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 查询最后一个节点
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
  }

  // 在任意位置插入数据
  insert(position, element) {
    // 越界判断
    if (position < 0 || position > this.length) return false;

    const newNode = new DoublyNode(element);

    // 判断多钟插入情况
    if (position === 0) {
      if (this.head === null) {
        // 原来是没有元素的情况
        this.head = newNode;
        this.tail = newNode;
      } else {
        // 原来是有元素的情况
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      }
    } else if (position === this.length) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    } else {
      let index = 0;
      let current = this.head;
      let previous = null;

      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      // 交换节点信息
      previous.next = newNode;
      newNode.prev = previous;
      newNode.next = current;
      current.prev = newNode;
    }
    this.length++;
    return true;
  }

  // get(position) 获取对应位置的元素(继承LinkedList)
  // indexOf(element) 根据元素获取在链表中的位置(继承LinkedList)

  // 根据位置删除对应的元素
  removeAt(position) {
    if (position < 0 || position > this.length - 1) return null;

    let current = this.head;
    // 根据不同情况删除元素
    if (position === 0) {
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.prev = null;
      }
    } else if (position === this.length - 1) {
      current = this.tail;
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
    } else {
      let index = 0;
      let previous = null;
      while (index++ <= position) {
        previous = current;
        current = current.next;
      }

      previous.next = current.next;
      current.next.prev = previous;
    }
    this.length--;
    return current.element;
  }

  // update(position, element) (继承LinkedList) // 修改某个位置的元素

  // remove(element) (继承LinkedList) // 根据元素删除

  // isEmpty() // 判断是否为空

  // size() // 获取链表长度

  // 获取第一个元素
  getHeat() {
    return this.head.element;
  }

  // 获取最后一个元素
  getTail() {
    return this.tail.element;
  }

  // 遍历方法的实现
  // 正向遍历的方法
  forwardString() {
    let current = this.head;
    let forwardStr = "";

    while (current) {
      forwardStr += "," + current.element;
      current = current.next;
    }

    return forwardStr.slice(1);
  }

  // 反向遍历的方法
  reverseString() {
    let current = this.tail;
    let reverseStr = "";

    while (current) {
      reverseStr += "," + current.element;
      current = current.prev;
    }

    return reverseStr.slice(1);
  }

  // 实现toString方法
  toString() {
    this.forwardString();
  }
}
