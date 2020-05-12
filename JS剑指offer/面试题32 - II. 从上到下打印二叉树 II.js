// 从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

// 例如:
// 给定二叉树: [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7

// 返回其层次遍历结果：
// [
//   [3],
//   [9,20],
//   [15,7]
// ]

// 思路:
//     初始化 queue，用于存储当前层的节点
//     检查 queue 是否为空:
//     如果不为空：依次遍历当前 queue 内的所有节点，检查每个节点的左右子节点，将不为空的子节点放queue, 继续循环
//     如果为空：跳出循环
var levelOrder = function(root) {
    if(!root) return [];

    let res = [];
    let height = 0;
    let nowLayer = [root]; // 当前层

    while(true){
        res[height] = [];
        let auxiliaryLayer = []; // 辅助层

        while(nowLayer.length) {
            let temnode = nowLayer.shift();
            res[height].push(temnode.val);
            temnode.left && auxiliaryLayer.push(temnode.left);
            temnode.right && auxiliaryLayer.push(temnode.right);
        }
        height++;

        if(auxiliaryLayer.length){
            nowLayer = auxiliaryLayer;
        } else {
            return res;
        }
    }
};