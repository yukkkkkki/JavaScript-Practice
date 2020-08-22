// 给定一个二叉搜索树和一个目标结果，如果 BST 中存在两个元素且它们的和等于给定的目标结果，则返回 true。

// 案例 1:
// 输入:
//     5
//    / \
//   3   6
//  / \   \
// 2   4   7

// Target = 9
// 输出: True

// 案例 2:
// 输入:
//     5
//    / \
//   3   6
//  / \   \
// 2   4   7

// Target = 28
// 输出: False

// 方法一：中序遍历 + 二分法
var findTarget = function (root, k) {
  let res = [],
    stack = [];
  while (root || stack.length) {
    while (root) {
      // 左子节点们入栈
      stack.push(root);
      root = root.left;
    }

    root = stack.pop(); // 直到左子节点没有左子节点，出栈
    res.push(root.val); // push进res
    root = root.right; // 看右子节点
  }

  const n = res.length;
  for (let i = 0; i < n; i++) {
    const aim = k - res[i];
    let start = i + 1,
      end = n - 1;
    while (start <= end) {
      let mid = Math.round((start + end) / 2);
      if (res[mid] === aim) return true;
      else if (res[mid] < aim) start = mid + 1;
      else end = mid - 1;
    }
  }
  return false;
};

// 方法一：中序遍历 + 双指针
var findTarget = function (root, k) {
  let res = [],
    stack = [];
  while (root || stack.length) {
    while (root) {
      // 左子节点们入栈
      stack.push(root);
      root = root.left;
    }

    root = stack.pop(); // 直到左子节点没有左子节点，出栈
    res.push(root.val); // push进res
    root = root.right; // 看右子节点
  }

  const n = res.length;
  let left = 0,
    right = n - 1;
  while (left < right) {
    let sum = res[left] + res[right];
    if (sum < k) left++;
    else if (sum > k) right--;
    else return true;
  }
  return false;
};

// 方法一：中序遍历 + hash map
var findTarget = function (root, k) {
  let res = [],
    stack = [];
  while (root || stack.length) {
    while (root) {
      // 左子节点们入栈
      stack.push(root);
      root = root.left;
    }

    root = stack.pop(); // 直到左子节点没有左子节点，出栈
    res.push(root.val); // push进res
    root = root.right; // 看右子节点
  }

  const n = res.length;
  const map = new Map();

  for (let i = 0; i < n; i++) {
    const aim = k - res[i];
    if (map.has(aim)) return true;
    map.set(res[i], i);
  }
  return false;
};
