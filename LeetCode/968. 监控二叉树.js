// 给定一个二叉树，我们在树的节点上安装摄像头。

// 节点上的每个摄影头都可以监视其父对象、自身及其直接子对象。

// 计算监控树的所有节点所需的最小摄像头数量。

// 示例 1：
// 输入：[0,0,null,0,0]
// 输出：1
// 解释：如图所示，一台摄像头足以监控所有节点。

// 示例 2：
// 输入：[0,0,null,0,null,0,null,null,0]
// 输出：2
// 解释：需要至少两个摄像头来监视树的所有节点。 上图显示了摄像头放置的有效位置之一。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 方法一：递归
// 思路：
// 安装摄像头（X），且可被该摄像头监控到的节点标记（Y）,未受该节点和其他监控节点监控的节点标记（Z）
// 递归时从叶子节点开始标记节点被监控的状态，那么在遍历过程中遇到的二叉子树都可以看成有一个'根节点'和左右子树组成：
//     3         X       Y       X
//    / \  ->   / \     / \     / \
//   9  20     Y   Y   Y   X   Y   Z
// 三种情况：
// 1.左右子节点没有 X，但是是 Y，根节点只能放置 X
// 2.左右子节点中有(一个或者两个)X，则根节点自动变为 Y
// 3.根节点为 X，则左右子节点自动变为 Y
var minCameraCover = function (root) {
  let res = 0;
  const dfs = (node) => {
    if (node == null) return 'Y';
    let left = dfs(node.left);
    let right = dfs(node.right);
    // 如果左右节点都是Y，则根节点只能放置X
    if (left == 'Y' && right == 'Y') return 'Z';
    // 如果左右节点中有1个或者2个X，那么根节点自动变成Y（注意此时左右节点不能有未受其他节点影响的子节点）
    if (left !== 'Z' && right !== 'Z' && (left === 'X' || right === 'X')) {
      return 'Y';
    }
    // 如果左右节点均为查询到安装X和被监控Y，则在根节点放置X
    res++;
    return 'X';
  };
  if (dfs(root) === 'Z') res += 1;
  return res;
};
