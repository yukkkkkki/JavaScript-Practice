// 给定一个链表，判断链表中是否有环。

// 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

// 示例 1：
// 输入：head = [3,2,0,-4], pos = 1
// 输出：true
// 解释：链表中有一个环，其尾部连接到第二个节点。

// 示例 2：
// 输入：head = [1,2], pos = 0
// 输出：true
// 解释：链表中有一个环，其尾部连接到第一个节点。

// 示例 3：
// 输入：head = [1], pos = -1
// 输出：false
// 解释：链表中没有环。

// 方法一：双指针（快慢指针）
// 定义两个指针，初始位置都是在链表的头部，两个指针同时出发，快指针一次可以前进两步，而慢指针一次只能前进一步。
// 会出现以下几种情况：
// 1. 链表为空，肯定不是环形链表
// 2. 链表不为空，快指针走到了链表的结尾，也可以判断不是环形链表
// 3. 链表不为空，快指针和慢指针相遇，则证明此链表是环形链表
// 类比
// 就像 A 和 B 两个人跑步，A 跑步速度是 B 跑步速度的两倍。
// 两人同时从同一起点开始跑，排除跑道长度为 0 的情况：
// 1. A 跑到了跑道的尽头，此时 B 在跑道的中间，那么这个跑道肯定不是一个环形跑道。
// 2. A 和 B 相遇。在 A、B 速度不同的情况下，如果除起点外还可以再次相遇，那么这个跑道，不管是圆形还是6字型，肯定是环形跑道。
var hasCycle = function (head) {
  if (!head) return false;
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) return true;
  }
  return false;
};
// 时间复杂度：O(n); 空间复杂度：O(1)

// 方法二：哈希表
// 创建一个空 Map 对象并遍历链表中的所有节点，每遍历一个节点，就像空对象里插入一条组键值对为 { 当前节点: 1 }。
// 1. 如果遍历完成，该 Map 对象中不存在相同节点，那么不是环形链表。
// 2.遍历中，发现该 Map 对象中存在相同节点且值为 1，即该节点已经遍历过了，那么链表是环形链表
var hasCycle = function (head) {
  if (!head) return false;
  const newData = new Map();
  while (head) {
    if (newData.has(head)) return true;
    newData.set(head, 1);
    head = head.next;
  }
  return false;
};
// 时间复杂度：O(n); 空间复杂度：O(n)

// 方法三：Symbol
// Symbol，表示独一无二的值
// 将当前节点的 val 值改为用 Symbol 创建的一个独一无二的值，
// 若链表循环过程中存在节点的 val 全等于这个值，那么证明当前不是第一次循环到该节点，即链表为环形链表，反之不是。
var hasCycle = function (head) {
  if (!head) return false;
  const newData = Symbol("");
  while (head) {
    if (head.val === newData) return true;
    head.val = newData;
    head = head.next;
  }
  return false;
};
// 时间复杂度：O(n); 空间复杂度：O(1)
