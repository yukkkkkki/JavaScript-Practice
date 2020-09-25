// 给定一个有相同值的二叉搜索树（BST），找出 BST 中的所有众数（出现频率最高的元素）。

// 假定 BST 有如下定义：
// 结点左子树中所含结点的值小于等于当前结点的值
// 结点右子树中所含结点的值大于等于当前结点的值
// 左子树和右子树都是二叉搜索树

// 例如：
// 给定 BST [1,null,2,2],
//    1
//     \
//      2
//     /
//    2
// 返回[2].

// 提示：如果众数超过1个，不需考虑输出顺序
// 进阶：你可以不使用额外的空间吗？（假设由递归产生的隐式调用栈的开销不被计算在内）

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

//  方法一：中序遍历
const findMode = (root) => {
  let modes = [];
  let freq = 0;
  let maxFreq = 0;
  let prev = 0;

  // 中序遍历
  const inOrder = (root) => {
    if (root == null) return;
    inOrder(root.left);
    handle(root.val);
    inOrder(root.right);
  };
  // 处理当前节点
  const handle = (rootVal) => {
    if (rootVal == prev) {
      freq++;
    } else {
      freq = 1;
      prev = rootVal;
    }
    if (freq > maxFreq) {
      maxFreq = freq;
      modes = [rootVal];
    } else if (freq == maxFreq) {
      modes.push(rootVal);
    }
  };

  inOrder(root);
  return modes;
};
