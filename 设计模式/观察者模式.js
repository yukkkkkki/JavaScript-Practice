// 观察者模式又叫发布订阅模式，或者消息模式
// 该模式一般会定义一个主体和众多的个体，这里主体可以想象为一个消息中心，里面有各种各样的消息
// 众多的个体可以订阅不同的消息，当未来消息中心发布某条消息的时候，订阅过他的个体就会得到通知
let msgCenter = (function () {
  let _msg = {} // 存储消息

  return {
    // 用于订阅一个消息
    register: function (type, fn) {
      if (_msg[type]) {
        _msg[type].push(fn);
      } else {
        _msg[type] = [fn];
      }
    },

    // 用于发布消息
    fire: function (type, args) {
      if (!_msg[type]) {
        return
      }
      let event = {
        type: type,
        args: args || {}
      }
      for (let i = 0; i < _msg[type].length; i++) {
        _msg[type][i][args];
      }
    },
    // 用于取消订阅的消息
    cancel: function (type, fn) {
      if (!_msg[type]) {
        return;
      }
      for (let i = 0; i < _msg[type].length; i++) {
        if (_msg[type][i] === fn) {
          _msg[type].splice(i, 1);
          break;
        }
      }
    }
  }
})();

function Person() {
  this.alreadyRegister = {};
}
// 原型链继承
Person.prototype.register = function (type, fn) {
  if (this.alreadyRegister[type]) {
    console.log("您已经订阅过这个消息了，请不要重复订阅");
  } else {
    msgCenter.register(type, fn);
    this.alreadyRegister[type] = fn;
  }

}
Person.prototype.cancel = function (type) {
  msgCenter.cancel(type, this.alreadyRegister[type]);
  delete this.alreadyRegister[type];
}

let person1 = new Person();
let person2 = new Person();
let person3 = new Person();

person1.register('carInfo', function (e) {
  console.log("person1得到了" + e.type + "的消息, 内容是:" + e.args.info);
});
person1.register('newsInfo', function (e) {
  console.log("person1得到了" + e.type + "的消息, 内容是:" + e.args.info);
});

person2.register('carInfo', function (e) {
  console.log("person2得到了" + e.type + "的消息, 内容是:" + e.args.info);
});
// person2.register('newsInfo', function (e) {
//   console.log("person2得到了" + e.type + "的消息, 内容是:" + e.args.info);
// });

person3.register('carInfo', function (e) {
  console.log("person3得到了" + e.type + "的消息, 内容是:" + e.args.info);
});
person3.register('newsInfo', function (e) {
  console.log("person3得到了" + e.type + "的消息, 内容是:" + e.args.info);
});

msgCenter.fire('carInfo', {
  info: '新款汽车上市!'
});
msgCenter.fire('newsInfo', {
  info: '有新闻!'
});