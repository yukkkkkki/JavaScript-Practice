function findSecond(arr) {
  if (arr.length <= 1) return null;
  return arr.filter((item, index) => index === 1);
}

// console.log(findSecond([1, 2]));
function findItem(arr) {
  arr.sort((a, b) => a - b);
  let left = 0,
    right = arr.length - 1;
  let mid = Math.floor(left + (right - left) / 2);
  return arr[mid];
}

// console.log(findItem([1, 2, 3, 2, 2, 2, 5, 4, 2]));

function addDigit(num) {
  if (num < 10) return num;
  let b = 0,
    c = 0;
  while (num >= 10) {
    b = Math.floor(num % 10);
    c += b;
    num = Math.floor(num / 10);
    if (num < 10) {
      num += c;
      c = 0;
    }
  }
  return num;
}

// console.log(addDigit(38));

// function getPoker() {

// }

// console.log([] == ![]);

function add(x) {
  return function (y) {
    return x + y;
  };
}
// console.log(add(3));

var getPermutation = function (n, k) {
  const res = [];

  const backTrack = (tmpPath) => {
    if (tmpPath.length === n) {
      res.push(tmpPath.slice());
      console.log(res);
      return;
    }

    for (let i = 0; i < n; i++) {
      if (tmpPath.indexOf(i)) continue;
      tmpPath.push(i);
      backTrack(tmpPath);
      tmpPath.pop();
    }
  };
  backTrack([]);
  // return res[k + 1];
};

console.log(getPermutation(3, 3));
