/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
  // 队列
  let queue = [root];

  while (queue.length) {
    let size = queue.length;
    let pre;

    while (size) {
      let cur = queue.shift();

      // 链接当前层所有节点的 next 指针
      if (pre) pre.next = cur;
      pre = cur;

      // 将下一层节点装入队列
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);

      size--;
    }
  }

  return root;
};
