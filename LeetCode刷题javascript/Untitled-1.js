function getRes(n, likeList, queryList, queryLen) {
  let res = [];
  let temp;
  for (let i = 0; i < queryLen; i++) {
    temp = 0;
    let l = queryList[i].l - 1;
    let r = queryList[i].r - 1;
    let k = queryList[i].k;
    while (l <= r) {
      if (likeList[l] === k) {
        temp += 1;
      }
      l++;
    }
    print(temp);
    // res.push(temp);
  }
  // return res;
}

console.log(
  getRes(
    n,
    [1, 2, 3, 3, 5],
    [
      { l: 1, r: 2, k: 1 },
      { l: 2, r: 4, k: 5 },
      { l: 3, r: 5, k: 3 },
    ],
    3
  )
);

let n = 5;
let likeList = [1, 2, 3, 3, 5];
let queryLen = 3;
let queryList = [
  [1, 2, 1],
  [2, 4, 5],
  [3, 5, 3],
];

let n = readline(); // 用户个数
let likeList = readline().split(" "); // 喜好程度
let queryLen = readline(); // 查询的组数
let queryList = []; // 查询组
for (let i = 0; i < queryLen; i++) {
  let temp = readline().split(" ");
  queryList.push({
    l: temp[0],
    r: temp[1],
    k: temp[2],
  });
}

let res = getRes(n, likeList, queryList, queryLen);
for (let i = 0; i < n; i++) {
  print(res[i]);
}
