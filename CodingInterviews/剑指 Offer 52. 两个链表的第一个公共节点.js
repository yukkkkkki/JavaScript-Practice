// 方法一：遍历 + 哈希表记录
// 思路
// 开辟哈希表 map。key 是节点，value 是 boolean，代表节点是否出现过
// 对 list1 进行遍历，设置 map[节点]=true
// 对 list2 进行遍历，如果节点在 map 中出现过，那么说明这是两个链表的公共节点，返回
var getIntersectionNode = function (headA, headB) {
  const map = new Map();
  let node = headA;
  while (node) {
    map.set(node, true);
    node = node.next;
  }

  node = headB;
  while (node) {
    if (map.has(node)) return node;
    node = node.next;
  }
  return null;
};
// 时间复杂度是O(N)，空间复杂度是O(N)。

// 方法二：双指针
// 思路：如果 A、B 两链表相交，则 A 、B 自相交点往后的链表是一致的。
// 同步遍历 A、B 链表 pA 、 pB ，直到遍历完其中一个链表（短链表），假设A为长链表
// 那么此时 A、B 两链表的长度差就为 pA 到链尾的长度，此时可以把 pB 指向长链表的表头 headA ，
// 继续同步遍历，直到遍历完长链表
// 此时，headA 到 pB 的长度就为两链表的长度差，pB 到链表的长度与 headB 到链尾的长度一致
// 此时，可将 pA 指向 headB ，然后同步遍历 pB 及 pA ，直到有相交节点，返回相交节点，否则返回 null
var getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) return null;

  let pa = headA;
  let pb = headB;

  while (pa || pb) {
    while (pa === pb) return pa;
    pa = pa ? pa.next : headB;
    pb = pb ? pb.next : headA;
  }

  return null;
};
// 时间复杂度：O(n); 空间复杂度：O(1)
// 这方法好美妙，牛逼
