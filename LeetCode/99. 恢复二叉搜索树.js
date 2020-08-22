// 二叉搜索树中的两个节点被错误地交换。
// 请在不改变其结构的情况下，恢复这棵树。

// 示例 1:
// 输入: [1,3,null,null,2]
//    1
//   /
//  3
//   \
//    2
// 输出: [3,1,null,null,2]
//    3
//   /
//  1
//   \
//    2

// 示例 2:
// 输入: [3,1,4,null,null,2]
//   3
//  / \
// 1   4
//    /
//   2
// 输出: [2,1,4,null,null,3]
//   2
//  / \
// 1   4
//    /
//   3

// 方法一：显式中序遍历
// 思路：
// 找到二叉搜索树中序遍历得到值序列的不满足条件的位置
// 如果有两个，我们记为 i 和 j（i<j 且 ai>ai+1 && aj>aj+1)，那么对应被错误交换的节点即为 ai​ 对应的节点和 aj+1​ 对应的节点，我们分别记为 x 和 y。
// 如果有一个，我们记为 i，那么对应被错误交换的节点即为 ai​ 对应的节点和 ai+1​ 对应的节点，我们分别记为 x 和 y。
// 交换 x 和 y 两个节点即可。
// 开辟一个新数组 nums\textit{nums}nums 来记录中序遍历得到的值序列，然后线性遍历找到两个位置 iii 和 jjj，并重新遍历原二叉搜索树修改对应节点的值完成修复
const inorder = (root, nums) => {
  if (!root) return;
  inorder(root.left, nums);
  nums.push(root.val);
  inorder(root.right, nums);
};

const findTwoSwapped = (nums) => {
  const n = nums.length;
  let x = -1,
    y = -1;
  for (let i = 0; i < n - 1; i++) {
    if (nums[i + 1] < nums[i]) {
      y = nums[i + 1];
      if (x === -1) {
        x = nums[i];
      } else break;
    }
  }
  return [x, y];
};

const recover = (r, count, x, y) => {
  if (r !== null) {
    if (r.val === x || r.val === y) {
      r.val = r.val === x ? y : x;
      if (--count === 0) return;
    }
    recover(r.left, count, x, y);
    recover(r.right, count, x, y);
  }
};

var recoverTree = function (root) {
  const nums = [];
  inorder(root, nums);
  const [first, second] = findTwoSwapped(nums);
  recover(root, 2, first, second);
};
// 时间复杂度：O(N); 空间复杂度：O(1)

// 方法二：隐式中序遍历
// 在中序遍历的过程就找到被错误交换的节点 x 和 y
// 由于我们只关心中序遍历的值序列中每个相邻的位置的大小关系是否满足条件，且错误交换后最多两个位置不满足条件，
// 因此在中序遍历的过程我们只需要维护当前中序遍历到的最后一个节点 pred，然后在遍历到下一个节点的时候，看两个节点的值是否满足前者小于后者即可，
// 如果不满足说明找到了一个交换的节点，且在找到两次以后就可以终止遍历。

// 这样我们就可以在中序遍历中直接找到被错误交换的两个节点 x 和 y，不用显式建立 nums 数组。
const swap = (x, y) => {
  const temp = x.val;
  x.val = y.val;
  y.val = temp;
};
var recoverTree = function (root) {
  const stack = [];
  let x = null,
    y = null,
    pred = null;

  while (stack.length || root !== null) {
    while (root !== null) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    if (pred !== null && root.val < pred.val) {
      y = root;
      if (x == null) x = pred;
      else break;
    }

    pred = root;
    root = root.right;
  }
  swap(x, y);
};
// 时间复杂度：O(N); 空间复杂度：O(H) H为二叉搜索树高度

// 方法三：Morris 中序遍历
// Morris 遍历算法整体步骤如下（假设当前遍历到的节点为 xxx）：
//     如果 x 无左孩子，则访问 x 的右孩子，即 x=x.right。
//     如果 x 有左孩子，则找到 x 左子树上最右的节点（即左子树中序遍历的最后一个节点，x 在中序遍历中的前驱节点），我们记为 predecessor。根据 predecessor 的右孩子是否为空，进行如下操作
//         如果 predecessor 的右孩子为空，则将其右孩子指向 x，然后访问 x 的左孩子，即 x=x.left。
//         如果 predecessor 的右孩子不为空，则此时其右孩子指向 x，说明我们已经遍历完 x 的左子树，我们将 predecessor 的右孩子置空，然后访问 x 的右孩子，即 x=x.right
//     重复上述操作，直至访问完整棵树。
const swap = (x, y) => {
  const temp = x.val;
  x.val = y.val;
  y.val = temp;
};

var recoverTree = function (root) {
  let x = null,
    y = null,
    pred = null,
    predecessor = null;

  while (root !== null) {
    if (root.left !== null) {
      // predecessor 节点就是当前 root 节点向左走一步，然后一直向右走至无法走为止
      predecessor = root.left;
      while (predecessor.right !== null && predecessor.right !== root)
        predecessor = predecessor.right;

      // 让 predecessor 的右指针指向 root，继续遍历左子树
      if (predecessor.right === null) {
        predecessor.right = root;
        root = root.left;
      }
      // 说明左子树已经访问完了，我们需要断开链接
      else {
        if (pred !== null && root.val < pred.val) {
          y = root;
          if (x === null) x = pred;
        }
        pred = root;

        predecessor.right = null;
        root = root.right;
      }
    }
    // 如果没有左孩子，则直接访问右孩子
    else {
      if (pred !== null && root.val < pred.val) {
        y = root;
        if (x === null) x = pred;
      }
      pred = root;
      root = root.right;
    }
  }
  swap(x, y);
};
