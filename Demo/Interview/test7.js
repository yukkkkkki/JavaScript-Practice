// //line=readline()
// //print(line)
// console.log('Hello World!');

// function fn() {
//     let timer ;
//     return function() {
//         console.log(timer);
//     }
// }

// var funcs = [];

// for (var i = 0; i < 10; i++) {

//   var func = function a() {
//     (return function () {
//         console.log(i);
//     })();
//   };

//    funcs.push(func);

// }

// funcs.forEach(function(f) {
//   f();
// });

// class Watcher {
//     constructor() {
//         this.dep = [];
//     }

//     emit(value) {
//         value.getter();
//     }

//     on(value) {
//         this.dep.push(value);
//     }
// }

// class Notify{
//     constructor() {
//         this.value = ''
//     }

//     getter() {

//     }

//     setter(value) {
//         let watcher = new Watcher();
//         watcher.emit(value)
//     }

// }

function fn(arr) {
  let maxNumber = arr[0];
  let curMax = arr[0];
  const res = [];

  for (let i = 1; i < arr.length; i++) {
    maxNumber = Math.max(maxNumber + arr[i], arr[i]);
    curMax = Math.max(maxNumber, curMax);
  }

  return curMax;
}

let arr = [2, 3, 4, 5, -1];
console.log(fn(arr));
