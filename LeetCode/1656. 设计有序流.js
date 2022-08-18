// 方法一：使用数组存储 + 遍历
/**
 * @param {number} n
 */
var OrderedStream = function (n) {
  this.stream = new Array(n + 1).fill(undefined);
  this.ptr = 1;
};

/**
 * @param {number} idKey
 * @param {string} value
 * @return {string[]}
 */
// 若流存储有 id = ptr 的 (id, value) 对，找出从 id = ptr 开始的最长 id 连续递增序列，并按顺序返回与这些 id 关联的值的列表，然后 ptr 更新为 id + 1；
// 否则返回空列表
OrderedStream.prototype.insert = function (idKey, value) {
  this.stream[idKey] = value;
  let res = [];
  while (this.ptr < this.stream.length && this.stream[this.ptr] !== undefined) {
    res.push(this.stream[this.ptr]);
    this.ptr++;
  }
  return res;
};

/**
 * Your OrderedStream object will be instantiated and called as such:
 * var obj = new OrderedStream(n)
 * var param_1 = obj.insert(idKey,value)
 */
// 时间复杂度：OrderedStream 是 O(n)；insert 是 O(1)
// 空间复杂度：O(n)
