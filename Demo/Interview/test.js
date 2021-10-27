// 两个升序链表合并

function mergeList(a, b) {
  if (!a) return b;
  else if (!b) return a;

  let node;
  while (a.next || b.next) {
    if (a.val <= b.val) {
      if (!node.next) {
        node = a;
        node.next = b;
      } else {
        node.next = b;
      }
      a = a.next;
    } else if (a.val > b.val) {
      if (!node.next) {
        node = b;
        node.next = a;
      } else node.next = b;
      b = b.next;
    }
  }
  return node;
}

function mergeList2(a, b) {
  if (!a) return b;
  if (!b) return a;

  let node;
  // const stack = [];
  let helper = a;
  while (helper.next) {
    if (a.val <= b.val) {
      node = helper;
      node.next = b;
      helper = a.next;
      b = b.next;
    } else {
      node = b;
      node.next = stack.pop();
      stack.push(b.next);
      a = a.next;
    }
  }

  return node;
}

let temp = [];
temp.map(() => {});
// let p1 = new Promise(async (resolve, reject) => {
//   await getUser();
//   resolve();
// });
// let p2 = new Promise()
Promise.all(temp);

//

// console.log(typeof null);      // object
// console.log(typeof undefined); // undefined

// Number() 函数的转换规则

// - Boolean 值，true -> 1， false -> 0
// - null 值 -> 返回 0
// - undefined -> 返回 NaN
// - 字符串
//   - 只包含数字，则将其转换为十进制数值
//   - 字符串中包含有效的浮点格式，转换为对应的浮点数值
//   - 字符串中包含有效的十六进制格式，转换为相同大小的十进制整数值
//   - 字符串为空 -> 转换为 0
//   - 字符串除上述格式之外的字符，转换为 NaN
// - 对象，调用对象的 valueOf()方法，然后依照前面的规则转换返回的值。若结果是 NaN，则调用对象的 toString()方法，然后在依照前面的规则转换返回的字符串值

// Boolean值：true -> 1， false -> 0
console.log(Number(Boolean(true))); // 1
console.log(Number(Boolean(false))); // 0
// null值：0
console.log(Number(null)); // 0
// undefined：NAN
console.log(Number(undefined)); // NaN

// 字符串
// 只包含数字：将其转换为十进制数
console.log(Number('10')); // 10
// 包含有效的浮点格式，转换为对应的浮点数值
console.log(Number('10.8')); // 10.8
// 包含有效的十六进制格式，转换为相同大小的十进制整数值
console.log(Number('0xA')); // 十六进制的10
// 字符串为空 -> 转换为 0
console.log(Number('')); // 0
// 字符串除上述格式之外的字符，转换为 NaN
console.log(Number('hello')); // NaN

// 对象：
// 调用对象的 valueOf()方法，然后依照前面的规则转换返回的值。
// 若结果是 NaN，则调用对象的 toString()方法，然后在依照前面的规则转换返回的字符串值


