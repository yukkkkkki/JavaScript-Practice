class ArrayList {
  constructor() {
    this.array = [];
  }

  insert() {
    this.array.push(item);
  }

  toString() {
    this.array.join();
  }

  // 冒泡排序
  bubbleSort() {
    let length = this.array.length;

    for (let i = length - 1; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        if (this.array[j] > this.array[j + 1]) {
          this.swap(j, j + 1);
        }
      }
    }
  }

  // 选择排序(o(n^2))
  selectionSort() {
    let length = this.array.length;

    // 外层循环: 从0位置开始取出数据, 直到length-2位置
    for (let i = 0; i < length; i++) {
      // 内层循环: 从i+1位置开始, 和后面的内容比较
      let min = i;
      for (let j = min + 1; j < length; j++) {
        // 如果i位置的数据大于j位置的数据, 记录最小的位置
        if (this.array[min] > this.array[j]) {
          min = j;
        }
      }
      this.swap(min, i);
    }
  }

  // 插入排序
  insertionSort() {
    let length = this.array.length;

    // 外层循环: 外层循环是从1位置开始, 依次遍历到最后
    for (let i = 1; i < length; i++) {
      let j = i;
      let temp = this.array[i];

      // 内层循环: 内层循环不确定循环的次数, 最好使用while循环
      while (j > 0 && this.array[j - 1] > temp) {
        this.array[j] = this.array[j - 1];
        j--;
      }

      // 将选出的j位置, 放入temp元素
      this.array[j] = temp;
    }
  }

  shellSort() {

  }

  swap(m, n) {
    let temp = this.array[m];
    this.array[m] = this.array[n];
    this.array[n] = temp;
  }

  quickSort() {

  }

  quickSortRec() {

  }
}