// 动物收容所。有家动物收容所只收容狗与猫，且严格遵守“先进先出”的原则。在收养该收容所的动物时，收养人只能收养所有动物中“最老”（由其进入收容所的时间长短而定）的动物，或者可以挑选猫或狗（同时必须收养此类动物中“最老”的）。换言之，收养人不能自由挑选想收养的对象。请创建适用于这个系统的数据结构，实现各种操作方法，比如enqueue、dequeueAny、dequeueDog和dequeueCat。允许使用Java内置的LinkedList数据结构。

// enqueue方法有一个animal参数，animal[0]代表动物编号，animal[1]代表动物种类，其中 0 代表猫，1 代表狗。

// dequeue*方法返回一个列表[动物编号, 动物种类]，若没有可以收养的动物，则返回[-1,-1]。

// 示例1:
//  输入：
// ["AnimalShelf", "enqueue", "enqueue", "dequeueCat", "dequeueDog", "dequeueAny"]
// [[], [[0, 0]], [[1, 0]], [], [], []]
//  输出：
// [null,null,null,[0,0],[-1,-1],[1,0]]

// 示例2:
//  输入：
// ["AnimalShelf", "enqueue", "enqueue", "enqueue", "dequeueDog", "dequeueCat", "dequeueAny"]
// [[], [[0, 0]], [[1, 0]], [[2, 1]], [], [], []]
//  输出：
// [null,null,null,null,[2,1],[0,0],[1,0]]

class AnimalShelf {
  constructor() {
    this.cats = [];
    this.dogs = [];
    this.index = 0;
  }

  enqueue(animal) {
    const [id, type] = animal;
    if (type == 0) {
      this.cats.push([id, this.index++]);
    } else {
      this.dogs.push([id, this.index++]);
    }
  }

  dequeueAny() {
    if (this.cats.length == 0) return this.dequeueDog();
    if (this.dogs.length == 0) return this.dequeueCat();
    const dog = this.dogs[0];
    const cat = this.cats[0];
    if (dog[1] > cat[1]) {
      this.cats.shift();
      return [cat[0], 0];
    }
    this.dogs.shift();
    return [dog[0], 1];
  }

  dequeueDog() {
    if (this.dogs.length == 0) return [-1, -1];
    const dog = this.dogs.shift();
    return [dog[0], 1];
  }

  dequeueCat() {
    if (this.cats.length == 0) return [-1, -1];
    const cat = this.cats.shift();
    return [cat[0], 0];
  }
}

/**
 * Your AnimalShelf object will be instantiated and called as such:
 * var obj = new AnimalShelf()
 * obj.enqueue(animal)
 * var param_2 = obj.dequeueAny()
 * var param_3 = obj.dequeueDog()
 * var param_4 = obj.dequeueCat()
 */
