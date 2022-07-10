/**
 * @param {number} k
 * @param {number[]} nums
 */
// 方法一：双指针
var KthLargest = function (k, nums) {
  this.k = k;
  this.nums = nums.sort((a, b) => a - b);
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  let index = this.findIndex(val);
  this.nums.splice(index, 0, val);
  return this.nums[this.nums.length - this.k];
};
KthLargest.prototype.findIndex = function (val) {
  let left = 0;
  let right = this.nums.length - 1;

  while (left <= right) {
    if (this.nums[left] < val) {
      left++;
    } else if (this.nums[left] > val) {
      right--;
    } else {
      break;
    }
  }

  return left;
};
/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
// 时间复杂度：O(logn)
// 空间复杂度：O(n)
