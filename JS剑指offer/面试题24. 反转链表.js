// 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。


// 示例:
// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL


// 双指针 原地反转 
var reverseList = function(head) {
    var prev = null, cur = head, temp;
    while(cur) {
        // 修改前先记住下一个节点
        temp = cur.next;
        // 改变指向，第一个节点prev是null
        cur.next = prev;
        // 记录前一个节点，供下次循环使用
        prev = cur;
        // cur通过temp指向下一节点
        cur = temp;
    }
    // cur会多循环直到null
    return prev;
};