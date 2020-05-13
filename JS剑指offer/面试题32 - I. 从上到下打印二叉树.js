// 从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。


// 例如:
// 给定二叉树: [3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7

// 返回：

// [3,9,20,15,7]
// 借助队列进行遍历
var levelOrder = function(root) {
    if(!root) return [];
    const data = [];
    const queue = [root];
    while(queue.length) {
        const first = queue.shift();
        data.push(first.val);
        first.left && queue.push(first.left);
        first.right && queue.push(first.right);
    }
    return data;
    
};

// 广度优先遍历
var levelOrder = function(root) {
    if(!root) return [];
    const res = [];
    const list = [root];
    while(list.length) {
        // shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
        let node = list.shift();
        node.left && list.push(node.left);
        node.right && list.push(node.right);
        res.push(node.val);
    }
    return res;
};