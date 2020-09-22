var arr = readline().split(',');
function arrClassifation(arr) {
  // 数组去重
  arr = [...new Set(arr)];
  arr.sort((a, b) => a - b);
  const res = [];
  let i = 0;
  // 数字归类
  arr.forEach((item, index) => {
    if (index == 0) res[0] = [item];
    else if (item - arr[index - 1] === 1) res[i].push(item);
    else res[++i] = [item];
  });
  return res;
}

var res = arrClassifation(arr);
const n = res.length;
for (let i = 0; i < n; i++) {
  print(res[i].join(','));
}
// arrClassifation([5, 3, 8, 9, 1, 2, 2, 3, 1, 5, 6]);
