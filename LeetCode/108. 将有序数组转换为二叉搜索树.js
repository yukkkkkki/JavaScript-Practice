/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
// 方法一：二分递归
var sortedArrayToBST = function (nums) {
  if (nums.length == 0) return null;

  // 找出数组的中间坐标（mid）对应元素，作为当前二叉树节点（root）的 value
  let mid = Math.floor(nums.length / 2);
  let node = new TreeNode(nums[mid]);

  node.left = sortedArrayToBST(nums.slice(0, mid));
  node.right = sortedArrayToBST(nums.slice(mid + 1));

  return node;
};

// 方法二：数组模拟队列
// 思路
// 可以先将提示数组按照二分法的查找顺数，一次推入数组中。
// 然后，按照数组顺序通过生成二叉树的一般算法生成目标树。
// 由于在题目的二叉树中，节点的左子节点的值要小于节点的值，节点的右子节点的值要大于节点的值。
// 因此，数组从中点按照 [root, 左, 右, 左, 右...] 接收节点的值，并按照生成二叉树的一般算法，即可生成目标树。
// 详解
// 1. 首先，使用二分法，先找到数组中间位置（mid）元素，将该元素 push 进目标数组 queue（模拟队列）
// 2. 将数组分成两部分 0 -> mid, (mid + 1) -> arr.length
// 3. 将获得两个新数组，按照 1、2 步骤重复，直到数组元素全部遍历完成
// 4. 然后，按顺序遍历数组，arr[0]为 根节点值
// 5. 当 queue[i] 小于 arr[0] 时会被分配到左子节点，大于 arr[0] 时会被分配到右子节点
// 6. 当左子节点已经有值时，会比较左子节点的值与 queue[i]，按照值的大小 分配到 左子节点的左子节点或者 右子节点
// 7. 当右子节点已经有值时，会比较右子节点的值与 queue[i]，按照值的大小 分配到 左子节点的左子节点或者 右子节点
// 8. 遍历 queue， 重复执行 6、7 步骤， 直到 queue 被全部遍历
var sortedArrayToBST = function (nums) {
  if (!arr.length) return null;
  const queue = [];
  // 二分法重新排列数组 queue
  initNodeValueArr(arr, 0, arr.length, queue);
  const root = new TreeNode(queue[0]);
  for (let i = 1; i < queue.length; i += 1) {
    // 插入节点数据
    insertNode(root, queue[i]);
  }
  return root;
};

const insertNode = (node, value) => {
  // 生成左子节点
  if (value < node.val) {
    if (!node.left) {
      node.left = new TreeNode(value);
    } else {
      insertNode(node.left, value);
    }
    // 生成右子节点
  } else if (!node.right) {
    node.right = new TreeNode(value);
  } else {
    insertNode(node.right, value);
  }
};

const initNodeValueArr = (arr, start, end, queue) => {
  const mid = start + parseInt((end - start) / 2, 10);
  queue.push(arr[mid]);
  if (start < mid) {
    initNodeValueArr(arr, start, mid, queue);
  }

  if (mid + 1 < end) {
    initNodeValueArr(arr, mid + 1, end, queue);
  }
};
