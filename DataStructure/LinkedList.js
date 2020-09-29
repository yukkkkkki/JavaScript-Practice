// 单向链表
// 链表中的元素在内存中不必是连续的空间
// 链表的每个元素由一个存储元素本身的节点和一个指向下一个元素的引用组成

// 相对于数组，链表的优点
// 内存空间不是必须连续的，可以充分利用计算机的内存，实现灵活的内存动态管理
// 链表不必在创建时就确定大小，并且大小可以无限地延伸下去
// 链表在插入和删除数据时，时间复杂度可以达到O(1)，相对数组效率高很多

// 相对于数组，链表的缺点
// 链表访问任何一个位置的元素时，都需要从头开始访问(无法跳过第一个元素访问任何一个元素)
// 无法通过下标直接访问元素，需要从头一个个访问，知道找到对应的元素
export class Node {
  constructor(element) {  
    // 保存元素
    this.element = element;
    // 指向下一个节点
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // 链尾追加一个项
  append(element) {
    const newNode = new Node(element);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.length++;
  }

  // 插入到某个位置
  // 让前一个元素指向此节点，此节点指向下一个元素
  insert(position, element) {
    // 判断越界
    if (position < 0 || position > this.length) return false;

    const newNode = new Node(element);

    // 插入元素
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let index = 0;
      let current = this.head;
      let pre = null; // position位置元素的前一个元素
      while (index++ < position) {
        pre = current;
        current = current.next;
      }

      pre.next = newNode;
      newNode.next = current;
    }
    this.length++;
  }

  // 获取对应位置的元素
  get(position) {
    if (position < 0 || position > this.length - 1) return null;
    let index = 0;
    let current = this.head;
    while (index++ < position) {
      current = current.next;
    }
    return current.element;
  }

  // 根据元素获取链表中的位置
  indexOf(element) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.element === element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  // 修改某个位置的元素
  update(position, element) {
    if (position < 0 || position > this.length - 1) return false;
    this.removeAt(position); // 删除
    this.insert(element); // 插入
  }

  // 从链表的特定位置删除一项
  removeAt(position) {
    // 判断越界问题
    if (position < 0 || position > this.length - 1) return null;
    // 删除元素
    let current = this.head;
    let index = 0;
    let pre = null;
    if (position === 0) {
      this.head = current.next;
    } else {
      while (index++ < position) {
        pre = current;
        current = current.next;
      }
      pre.next = current.next;
    }

    this.length--;
    return current.element;
  }

  // 从链表中移除一项
  remove(element) {
    const index = this.indexOf(element);
    if (index === -1) return;

    // 移除
    this.removeAt(index);
    return index;
  }

  // 判断链表是否为空
  isEmpty() {
    return this.length === 0;
  }

  // 返回链表包含的元素个数
  size() {
    return this.length;
  }
}
