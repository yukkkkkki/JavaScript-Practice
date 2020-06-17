// 根据一棵树的中序遍历与后序遍历构造二叉树。

// 注意:
// 你可以假设树中没有重复的元素。

// 例如，给出

// 中序遍历 inorder = [9,3,15,20,7]
// 后序遍历 postorder = [9,15,7,20,3]

// 返回如下的二叉树：

//     3
//    / \
//   9  20
//     /  \
//    15   7

// 方法一：递归
var buildTree = function (inorder, postorder) {
  if (!postorder.length || !inorder.length) return null;

  let n = postorder.length;
  let temp = postorder[n - 1],
    mid = inorder.indexOf(temp);

  let root = new TreeNode(temp);
  root.left = buildTree(inorder.slice(0, mid), postorder.slice(0, mid));
  root.right = buildTree(inorder.slice(mid + 1), postorder.slice(mid, n - 1));
  return root;
};

// 方法二：指针
var buildTree = function (inorder, postorder) {
  let map = new Map();
  let idx = inorder.length - 1;
  for (let i = 0; i < inorder.length; i++) {
    map.set(inorder[i], i);
  }

  function helper(left, right) {
    if (left === right) return null;
    let val = postorder[idx];
    let root = new TreeNode(val);
    let index = map.get(val);
    idx--;
    root.right = helper(index + 1, right);
    root.left = helper(left, index);
    return root;
  }

  return helper(0, inorder.length)
}