// 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。

// 说明: 叶子节点是指没有子节点的节点。

// 示例:
// 给定如下二叉树，以及目标和 sum = 22，

//               5
//              / \
//             4   8
//            /   / \
//           11  13  4
//          /  \    / \
//         7    2  5   1
// 返回:
// [
//    [5,4,11,2],
//    [5,8,4,5]
// ]

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
// 方法一：回溯法 DFS
var pathSum = function (root, sum) {
  const res = [];

  const backTrack = (root, tmpPath, total) => {
    if (!root) return;
    let val = root.val;
    let left = root.left;
    let right = root.right;
    tmpPath.push(val);
    total += val;
    if (total === sum && !left && !right) res.push(tmpPath.slice());

    backTrack(left, tmpPath, total);
    backTrack(right, tmpPath, total);
    tmpPath.pop();
    total -= val;
  };

  backTrack(root, [], 0);
  return res;
};

// 方法二：广度优先遍历 BFS
var pathSum = function (root, sum) {
  if (!root) return [];
  let res = [];
  let queue = [[root, [], 0]];
  while (queue.length) {
    let [node, tmpPath, total] = queue.shift() || [new TreeNode(), [], 0];
    let { val, left, right } = node;
    total += val;
    tmpPath.push(val);
    if (total === sum && !left && !right) res.push(tmpPath.slice());
    left && queue.push([left, tmpPath.slice(), total]);
    right && queue.push([right, tmpPath.slice(), total]);
  }
  return res;
};
