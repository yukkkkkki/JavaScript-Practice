export function foo() {
  // ...
}
export var awesome = 42;
var bar = [1, 2, 3];
export { bar };

// 或者写成：
function foo() {
  // ...
}
var awesome = 42;
var bar = [1, 2, 3];
export { foo, awesome, bar };

function foo() {
  // ...
}
export default foo;

// 或者
function foo() {
  // ...
}
export { foo as default };

// 或者
export default function foo() {
  // ...
}

export function bar() {}
export var x = 42;
export function baz() {}

import * as foo from 'foo';
foo.bar();
foo.x;
foo.baz();
