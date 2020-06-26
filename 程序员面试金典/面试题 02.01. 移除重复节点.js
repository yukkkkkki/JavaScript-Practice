// 编写代码，移除未排序链表中的重复节点。保留最开始出现的节点。

// 示例1:
//  输入：[1, 2, 3, 3, 2, 1]
//  输出：[1, 2, 3]

// 示例2:
//  输入：[1, 1, 1, 1, 2]
//  输出：[1, 2]

// 方法一：哈希 o(n)
// 哈希表存储出现过的元素，如果当前节点出现过，就删掉
var removeDuplicateNodes = function (head) {
  if (head == null) return head;
  const map = {};
  map[head.val] = true;
  let node = head.next;
  let prev = head;
  while (node) {
    if (map[node.val]) {
      prev.next = node.next;
    } else {
      map[node.val] = true;
      prev = prev.next;
    }
    node = node.next;
  }
  return head;
};

// 方法二：双指针 o(n^2)
// 固定p指针，右侧q指针扫描，然后移动p，指针q再次扫描
var removeDuplicateNodes = function (head) {
  let p = head;
  while (p) {
    let q = p;
    while (q.next) {
      if (q.next.val == p.val) {
        q.next = q.next.next;
      } else {
        q = q.next;
      }
    }
    p = p.next;
  }
  return head;
};

// 方法三 Set()
var removeDuplicateNodes = function (head) {
  if (head == null) return head;
  let set = new Set();
  set.add(head.val);
  let node = head.next;
  let pre = head;
  while (node) {
    if (set.has(node.val)) {
      prev.next = node.next;
    } else {
      set.add(node.val);
      prev = prev.next;
    }
    node = node.next;
  }
  return head;
};
