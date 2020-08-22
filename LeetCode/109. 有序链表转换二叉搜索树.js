// 给定一个单链表，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。

// 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

// 示例:
// 给定的有序链表： [-10, -3, 0, 5, 9],
// 一个可能的答案是：[0, -3, 9, -10, null, 5], 它可以表示下面这个高度平衡二叉搜索树：

//       0
//      / \
//    -3   9
//    /   /
//  -10  5

// 方法一：将有序链表转成有序数组
// 先将有序链表转为有序数组，然后构建二叉搜索树
var sortedListToBST = function (head) {
  let arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }

  const builBST = (start, end) => {
    if (start > end) return null;
    const mid = (start + end) >>> 1;
    const root = new TreeNode(arr[mid]);
    root.left = builBST(start, mid - 1);
    root.right = builBST(mid + 1, end);
    return root;
  };

  return builBST(0, arr.length - 1);
};
// 时间复杂度：O(n)；空间复杂度：O(n)

// 方法二：快慢指针
// 快、慢指针指向头结点，快指针一次走两步，慢指针一次走一步，当快指针走到尾节点时，慢指针正好走到链表的中间。然后断开成两个链表，分而治之
var sortedListToBST = function (head) {
  if (head == null) return null;
  let slow = head;
  let fast = head;
  let preSlow; // 保存slow的前一个节点

  while (fast && fast.next) {
    preSlow = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  const root = new TreeNode(slow.val);
  if (preSlow) {
    // 中点slow不是head，需要构建左子树
    preSlow.next = null; // 切断preSlow和中点slow
    root.left = sortedListToBST(head);
  }
  root.right = sortedListToBST(slow.next);
  return root;
};
// 时间复杂度：O(nlogn)；空间复杂度：O(logn)

// 方法三：分治 + 中序遍历优化
// 求出中间节点，分成两部分，先根据左边部分递归构建左右子树，直到构建完整个 BST
var sortedListToBST = function (head) {
  if (!head) return null;
  let len = 0,
    h = head;
  while (head) {
    len++;
    head = head.next;
  }
  const buildBST = (start, end) => {
    if (start > end) return null; // 递归的出口，返回null节点
    const mid = (start + end) >>> 1; // 求mid，不是为了构建它，是为了分治
    const left = buildBST(start, mid - 1);
    const root = new TreeNode(h.val); // 按 h.val 构建节点

    h = h.next; // h指针步进
    root.left = left; // root构建出来了，接上左子树

    root.right = buildBST(mid + 1, end); // 构建当前root的右子树
    return root;
  };
  return buildBST(0, len - 1);
};
// 时间复杂度：O(n)；空间复杂度：O(logn)
