// 101. 对称二叉树
// 给定一个二叉树，检查它是否是镜像对称的。

// 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3

// 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

//     1
//    / \
//   2   2
//    \   \
//    3    3

// 方法一：递归
// 思路
// 判断二叉树是不是对称的，主要是看二叉树左边和右边的节点是不是各自相等。
// 所以我们可以通过递归，去判断左树的左节点和右树的右节点是不是相同。
// 如果两个节点都为空，则表示递归到树的底部了；
// 如果有一边空了另外一半没空，说明有一边的节点没了，另外一半还在，肯定不是对称的树；
// 如果两边对称，继续递归节点的左右节点，直到递归完全或者发现不对称。
// 详解
// 1. 我们判断当前的树结构还是否为空，为空则该树是对称的，不为空则递归判断左子树的左子树和右子树的右子树是否相等
// 2. 如果左节点或右节点为空时，则判断对应的右节点或左节点是否为空，为空则返回 true ，不为空则返回 false
// 3. 如果左右节点都不为空时，则判断左节点的左节点和右节点的右节点是否相等
// 4. 如果相等，则继续传入该节点的子节点去判断；不相等则直接返回 false
var isSymmetric = function (root) {
  if (!root) return true;
  var help = function (left, right) {
    if (!left && !right) return true;
    if (!left || !right) return false;
    return (
      left.val === right.val &&
      help(left.left, right.right) &&
      help(left.right, right.left)
    );
  };
  return help(root.left, root.right);
};

// 方法二：BFS法
// 思路
// 迭代的思路就是不断的把待处理的节点入队，每次都将本级的节点进行判断是否对称
// 如果不对称则返回false，对称则将下一级的节点全部入栈，然后再依次出队判断处理，再获取新的待处理节点入队，直到结束。
// 详解
// 1. 最开始将根节点入列，然后新建一个出队的队列 level，我们对 level 进行判断处理。
// 2. 我们一次取出 level 队列中下标为 i 和下标为 (level.length - i - 1) 的两个元素进行比较；
// 3. 若不相等，则返回false；若相等，则将下下一级的节点全部入列，然后在将下一级的节点全部出列进行判断；
// 4. 重复第 3、4 步，当队列为空时，则方法停止。
var isSymmetric = function (root) {
  let queue = [root, root];
  // 队列为空代表没有可入列的节点，遍历结束
  while (queue.length) {
    // 获取当前层的节点数
    let len = queue.length;
    // 一次循环出列两个，所以每次+2
    for (let i = 0; i < len; i += 2) {
      // 左右子树分别出列
      let left = queue.shift();
      let right = queue.shift();
      // 不满足对称
      if ((left && !right) || (!left && right)) return false;
      if (left && right) {
        if (left.val !== right.val) return false;
        // 让左子树的left和右子树的right入列
        queue.push(left.left, right.right);
        // 让左子树的right和右子树的left入列
        queue.push(left.right, right.left);
      }
    }
  }
  return true;
};
