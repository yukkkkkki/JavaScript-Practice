let str = 'ahbc345lkiol876kkk67';
// let res = [];
// let temp;
// for (let i = 0; i < str.length; i++) {
//   if (
//     str[i].charCodeAt() >= '0'.charCodeAt() &&
//     str[i].charCodeAt() <= '9'.charCodeAt()
//   ) {
//     res.push(parseInt(str[i]));
//   }
// }
// console.log(res);
// let reg = /\d+/g;
// let newreg = str.match(reg);
// console.log(newreg);
// console.log(str.charCodeAt

// 原型链继承
function SuperType() {}
function SubType() {}

SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function () {};

// 构造函数继承
function SuperType(name) {}
function SubType() {
  SubType.call(this, 'selena');
}
var instance = new SubType();
