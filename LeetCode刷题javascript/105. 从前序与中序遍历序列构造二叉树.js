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
var buildTree = function(preorder, inorder) {
    if(!preorder.length || !inorder.length) return null;

    // 前序遍历的第一个元素为根节点
    const node = new TreeNode(preorder[0]);

    let i = 0;
    for(; i < inorder.length; i++) {
        if(inorder[i] === node.val){
            break;
        }
    }
    node.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));
    node.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));
    return node;
};