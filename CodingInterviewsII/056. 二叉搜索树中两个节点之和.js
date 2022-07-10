/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
// 方法一：深度优先搜索 + 哈希表
var findTarget = function (root, k) {
  const set = new Set();

  const dfs = (root, k) => {
    if (!root) return false;

    if (set.has(k - root.val)) {
      return true;
    }
    set.add(root.val);
    return dfs(root.left, k) || dfs(root.right, k);
  };

  return dfs(root, k);
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法二：广度优先搜索 + 哈希表
var findTarget = function (root, k) {
  const set = new Set();
  const queue = [root];

  while (queue.length) {
    const node = queue.shift();

    if (set.has(k - node.val)) return true;
    set.add(node.val);

    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }

  return false;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法三：深度优先搜索 + 中序遍历 + 双指针
var findTarget = function (root, k) {
  const list = [];
  const inorderTraversal = (node) => {
    if (!node) return;
    inorderTraversal(node.left);
    list.push(node.val);
    inorderTraversal(node.right);
  };

  inorderTraversal(root);

  let left = 0;
  let right = list.length - 1;
  while (left < right) {
    if (list[left] + list[right] === k) {
      return true;
    }

    if (list[left] + list[right] < k) {
      left++;
    } else {
      right--;
    }
  }

  return false;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
