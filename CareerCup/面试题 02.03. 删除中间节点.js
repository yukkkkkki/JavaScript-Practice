// 实现一种算法，删除单向链表中间的某个节点（即不是第一个或最后一个节点），假定你只能访问该节点。

// 示例：
// 输入：单向链表a->b->c->d->e->f中的节点c
// 结果：不返回任何数据，但该链表变为a->b->d->e->f

// 删除元素 = 元素替换
var deleteNode = function (node) {
  let current = node;
  node.val = current.next.val;
  node.next = current.next.next;
};