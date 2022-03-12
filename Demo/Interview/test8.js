// moka 二面

// 两道代码题：节流
// 一、1秒内只能输出一个
let timer;
function print(msg) {
  if (!timer) {
    console.log(msg);
    timer = setTimeout(() => {
      timer = null;
    }, 1000);
  }
}

print('print 1');
print('print 2');
print('print 3');
setTimeout(() => {
  print('print 4');
}, 1000);

// 二、1秒内只能输出一次
let count = 1;
let timer2;
function print2(msg) {
  if (!timer2) {
    if (count > 2) {
      count = 1;
    } else {
      console.log(msg);
      timer2 = setTimeout(() => {
        timer2 = null;
      }, 1000);
    }
  } else {
    if (count < 2) {
      console.log(msg);
      count++;
    }
  }
}

print2('print2 1');
print2('print2 2');
print2('print2 3');
setTimeout(() => {
  print2('print2 4');
}, 2000);
