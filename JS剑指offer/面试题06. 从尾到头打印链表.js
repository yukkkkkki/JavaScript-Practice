// 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

// 示例 1：

// 输入：head = [1,3,2]
// 输出：[2,3,1]

// reverse()输出
var reversePrint = function (head) {
    if (head === null) return []
    const res = []
    while (head) {
      res.push(head.val)
      head = head.next
    }
    return res.reverse()
}

// 递归
var reversePrint = function(head) {
    if(head == null) return [];
    let res = reversePrint(head.next);
    res.push(head.val);
    return res;
};

// 栈
var reversePrint = function(head) {
    const stack = [];
    let node = head;
    while(node) {
        stack.push(node.val);
        node = node.next;
    }

    const reverse = [];
    while(stack.length) {
        reverse.push(stack.pop());
    }
    return reverse;
};
