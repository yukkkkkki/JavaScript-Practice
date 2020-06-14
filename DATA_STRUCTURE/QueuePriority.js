// 优先级队列
// 在插入一个元素时会考虑该数据的优先级
// 和其他数据优先级进行比较
// 比较完成后，可以得出这个元素在队列中正确的位置
// 其他处理方式，和基本队列的处理方式一样

// 主要考虑的问题
// 每个元素不再只是一个数据，而且包含数据的优先级
// 在添加方法中，根据优先级放入争取的位置

// 应用：机场登机顺序、医院的急诊科
import {
  Queue
} from "./Queue"

export class PriorityQueue extends Queue {
  enqueue(element, priority) {
    // 1.创建QueueElement对象
    const queueElement = new queueElement(element, priority);

    // 2.考虑如何插入新的元素
    if (this.isEmpty()) {
      this.items.push(queueElement);
    } else {
      let added = false;
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].priority > queueElement.priority) {
          this.items.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }

      if (!added) {
        this.items.push(queueElement);
      }
    }

  }
}