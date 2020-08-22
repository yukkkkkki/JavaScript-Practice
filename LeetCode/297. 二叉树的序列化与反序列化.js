// 297. 二叉树的序列化与反序列化

// 序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。

// 请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。

// 示例:
// 你可以将以下二叉树：

//     1
//    / \
//   2   3
//      / \
//     4   5

// 序列化为 "[1,2,3,null,null,4,5]"

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
// 广度优先遍历
// 按层级从上往下将每层节点从左往右依次遍历，用队列来处理遍历，
// 先将根节点入队，然后根节点出队，再左子树和右子树入队，递归遍历即可

// 序列化：
// 1. 定义一个 result 数组存放序列化结果，定义一个 queue 数组，作为队列
// 2. 将根节点入队
// 3. 循环队列，队列中的第一个元素(节点)出队，将此节点值 push 进 result 数组。分别将此节点左右节点入队
// 4. 当队列为空时，跳出循环
// 5. 返回 result
var serialize = function (root) {
  if (!root) return [];
  let res = [];
  let queue = [root];
  while (queue.length > 0) {
    let node = queue.shift();
    if (node !== null) {
      res.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      res.push(null);
    }
  }
  return res;
};

// 反序列化：
// 1. 从 result 取出第一个节点值，生成根节点放到队列中
// 2. 循环队列，队列中第一个元素(节点)出队，从 result 取出下一个值还原左节点，将此左节点入队，从 result 取出下一个值还原
// 右节点，将此右节点入队
// 3. 当 result 或队列为空时，跳出循环
// 4. 返回反序列化好的节点(根节点)
var deserialize = function (data) {
  if (data.length === 0) return null;
  let root = new TreeNode(data[0]);
  let queue = [root];
  let i = 1;
  while (queue.length > 0) {
    let node = queue.shift();
    if (data[i] !== null) {
      // 先还原左节点
      node.left = new TreeNode(data[i]);
      // 将生成的左节点放入队列，下次循环会复原此左节点的子节点
      queue.push(node.left);
    }
    i++;
    if (data[i] !== null) {
      // 还原右节点
      node.right = new TreeNode(data[i]);
      // 将生成的右节点放入队列，下次循环会复原此左节点的子节点
      queue.push(node.right);
    }
    i++;
  }
  return root;
};
