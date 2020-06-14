// 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

// 例如，给出
// 前序遍历 preorder = [3,9,20,15,7]
// 中序遍历 inorder = [9,3,15,20,7]

// 返回如下的二叉树：
//     3
//    / \
//   9  20
//     /  \
//    15   7

// 递归
var buildTree = function (preorder, inorder) {
    if (!preorder.length || !inorder.length) return null;

    // 前序遍历的第一个元素为根节点
    const node = new TreeNode(preorder[0]);

    let i = 0;
    for (; i < inorder.length; i++) {
        if (inorder[i] === node.val) {
            break;
        }
    }
    node.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));
    node.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));
    return node;
};

// 方法二
// 字符串截取 slice 性能消耗比较大
// preorder 和 inorder 分别用两个指针指向头尾位置即可
// 转为执行 helper 函数，接收 2对 指针
var buildTree = function (preorder, inorder) {
    let map = new Map();
    for (let i = 0; i < inorder.length; i++) {
        map.set(inorder[i], i); // 用一个map来存储inorder里面的元素对应位置
    }
    return helper(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1, map);
};

var helper = function (preorder, p_start, p_end, inorder, i_start, i_end, map) {
    if (p_start > p_end) return null;
    let rootval = preorder[p_start]; // 根节点的值
    let root = new TreeNode(rootval); // 根节点
    let mid = map.get(rootval); // 根节点在inorder里的位置
    let leftNum = mid - i_start; // 左子树的节点数
    root.left = helper(preorder, p_start + 1, p_start + leftNum, inorder, i_start, mid - 1, map);
    root.right = helper(preorder, p_start + leftNum + 1, p_end, inorder, mid + 1, i_end, map);
    return root;
}