function fn(str) {
  let res = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i].match(/[A-Z]/)) {
      res[i] = '_' + str[i].toLowerCase();
    } else res[i] = str[i];
  }
  return res.join('');
}
console.log(fn('getElementById'));

// kailwangziyang@didichuxing.com对所有人说： 11:07 AM
// getElementById -> get_element_by_id
// kailwangziyang@didichuxing.com对所有人说： 11:16 AM
setTimeout(function () {
  console.log('1');
});
new Promise(function (resolve) {
  console.log('2');
  resolve();
}).then(function () {
  console.log('3');
});
console.log('4');

// [[5, 8], [0, 4], [9, 18], [15, 23]]， 有重叠返回false
function fn2(arr) {
  arr.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i][1] < arr[i + 1][0]) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}
console.log(
  fn2([
    [5, 8],
    [0, 4],
    [9, 18],
    [15, 23],
  ])
);
