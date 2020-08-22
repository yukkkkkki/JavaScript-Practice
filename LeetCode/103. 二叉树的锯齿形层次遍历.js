// 给定一个二叉树，返回其节点值的锯齿形层次遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

// 例如：
// 给定二叉树 [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7

// 返回锯齿形层次遍历如下：
// [
//   [3],
//   [20,9],
//   [15,7]
// ]

// 方法一：双栈法
// 1. 定义两个数组，一个接收奇数层元素，另一个接收偶数层元素。
// 2. 奇数层遍历完成之后，将下一层元素由左向右插入偶数层数组。
// 3. 先进后出原则，偶数列遍历时，取值顺序就变成了由右向左取值。
// 4. 偶数层遍历完成之后，将下一层元素由右向左插入奇数层数组。
// 5. 先进后出原则，奇数列遍历时，取值顺序就变成了由左向右取值。
// 6. 循环往复，形成锯齿形层次遍历
var zigzagLevelOrder = function (root) {
  if (!root) return [];
  const res = [];
  const l2r = [];
  const r2l = [];
  l2r.push(root);
  while (l2r.length || r2l.length) {
    const temp = [];
    if (l2r.length) {
      while (l2r.length) {
        const cur = l2r.pop();
        temp.push(cur.val);
        if (cur.left) r2l.push(cur.left);
        if (cur.right) r2l.push(cur.right);
      }
    } else if (r2l.length) {
      while (r2l.length) {
        const cur = r2l.pop();
        temp.push(cur.val);
        if (cur.right) l2r.push(cur.right);
        if (cur.left) l2r.push(cur.left);
      }
    }
    res.push(temp);
  }
  return res;
};
// 时间复杂度：O(n); 空间复杂度：O(n)

// 方法二：递归
// 采用递归，一层层遍历。
// 每一层创建一个数组，奇数层元素从左向右插入数组，偶数层元素从右向左插入数组。
// & 与操作符 判断奇偶
var zigzagLevelOrder = function (root) {
  const res = [];
  dfs(0, root);
  return res;
  function dfs(i, current) {
    if (!current) return;
    if (!Array.isArray(res[i])) res[i] = [];
    if (i & 1) res[i].unshift(current.val);
    else res[i].push(current.val);
    dfs(i + 1, current.left);
    dfs(i + 1, current.right);
  }
};
