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
 * @param {number} target
 * @return {number[][]}
 */
// 方法一：先序遍历 + 回溯
// 每次来到新节点，将节点放入当前保存的路径
// 检查节点是否是叶节点：
//    是：将路径放入结果中
//    不是：继续遍历左子树和右子树
var pathSum = function (root, sum) {
  if (!root) return [];

  const backTrack = (root, sum, paths, path) => {
    if (!root) return;

    path = [...path, root.val]; // 深拷贝
    if (!root.left && !root.right && root.val === sum) {
      paths.push(path);
      return;
    }

    backTrack(root.left, sum - root.val, paths, path);
    backTrack(root.right, sum - root.val, paths, path);
  };

  const paths = [];
  backTrack(root, sum, paths, []);
  return paths;
};

// 方法二：广度优先搜索
// 整体的处理流程是：
//   取出栈顶的元祖：节点、剩余路径和、路径
//   如果当前节点是叶节点，且剩余路径和等于节点的 val，那么将路径放入结果中
//   如果右节点不为空，将（右节点，剩余路径和 - 右节点值，路径+右节点）放入栈中
//   如果做节点不为空，处理过程和右节点一样
var pathSum = function (root, sum) {
  if (!root) return [];

  const stack = [[root, sum, [root.val]]];
  const res = [];

  while (stack.length) {
    const [node, sum, path] = stack.pop();
    if (!node.left && !node.right && node.val === sum) {
      res.push(path);
    }

    if (node.right) {
      stack.push([node.right, sum - node.val, [...path, node.right.val]]);
    }

    if (node.left) {
      stack.push([node.left, sum - node.val, [...path, node.left.val]]);
    }
  }
  return res;
};
