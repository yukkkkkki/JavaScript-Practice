let originArr = ['a', 'b', 'c'];
const map = {};
originArr.map((item, index) => {
  map[item] = index;
});

function diff(newArr) {
  let temp1; //del
  let temp2; // modify
  let temp3; // added
  newArr.map((item, index) => {
    if (!map[item]) {
      temp3.push(item);
    }
    if (map[item] !== index) {
      temp2.push(item);
    }
  });
}

let objectArr = [
  'a',
  {
    a,
    b,
  },
];
const map = new Map();

function diff(newObj) {
  
}
