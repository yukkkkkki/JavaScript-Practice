// 栈结构封装
class Stack {
  constructor() {
    this.items = [];
  }

  // 压栈操作
  push(element) {
    this.items.push();
  }

  // 出栈操作
  pop() {
    return this.items.pop();
  }

  // 看一下栈顶元素
  peek() {
    return this.items(this.items.length - 1);
  }

  // 判断栈中的元素是否为空
  isEmpty() {
    return this.items.length === 0;
  }

  // 获取栈中元素的个数
  size() {
    return this.items.length;
  }
}

export function dec2bin(num) {
  const stack = new Stack();

  // 循环取余数
  while (num > 0) {
    let remainder = num % 2;
    num = Math.floor(num / 2);
    Stack.push(remainder);
  }

  // 拼接字符串
  let binString = "";
  while (!stack.isEmpty()) {
    binString += stack.pop();
  }

  return binString;
}