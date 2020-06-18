// 我们从二叉树的根节点 root 开始进行深度优先搜索。

// 在遍历中的每个节点处，我们输出 D 条短划线（其中 D 是该节点的深度），然后输出该节点的值。（如果节点的深度为 D，则其直接子节点的深度为 D + 1。根节点的深度为 0）。

// 如果节点只有一个子节点，那么保证该子节点为左子节点。

// 给出遍历输出 S，还原树并返回其根节点 root。

// 示例 1：
// 输入："1-2--3--4-5--6--7"
// 输出：[1,2,5,3,4,6,7]

// 示例 2：
// 输入："1-2--3---4-5--6---7"
// 输出：[1,2,5,3,null,6,null,4,null,7]

// 示例 3：
// 输入："1-401--349---90--88"
// 输出：[1,401,null,349,88,90]
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
/**
 * @param {string} S
 * @return {TreeNode}
 */
var recoverFromPreorder = function (S, mysplit = '-') {
  // console.log(Object.prototype.toString.call(S));
  if (S == '') return null;
  var arr = split(S, mysplit);
  var val = arr[0];
  var root = new TreeNode(val);
  root.left = arr[1] ? recoverFromPreorder(arr[1], mysplit + '-') : null;
  root.right = arr[2] ? recoverFromPreorder(arr[2], mysplit + '-') : null;
  return root;
};

function split(S, mysplit) {
  var arr = [];
  var splitLen = mysplit.length;
  var i = 0;
  while (S.length > 0) {
    if (S[i] == '-' && S[i + splitLen] != '-' && S[i - 1] != '-') {
      arr.push(S.slice(0, i))
      S = S.slice(i + splitLen);
      i = 0;
    }
    i++;
    if (i == S.length) {
      arr.push(S);
      break;
    }
  }
  return arr;
}

// 方法二
var recoverFromPreorder = function (S) {
  const stack = [];
  for (let i = 0; i < S.length;) {
    let curLevel = 0; //一个curNode对应一个curLevel
    while (i < S.length && S[i] == '-') { // 避免循环半途中出界
      i++;
      curLevel++; // 连字符个数代表level
    }
    const start = i; // 记录当前节点值的开始位置
    while (i < S.length && S[i] != '-') {
      i++; // 指针移到当前节点值的结束位置
    }

    // slice(start[, end]) -> [start,end)
    const curNode = new TreeNode(S.slice(start, i)); //创建当前节点
    if (stack.length == 0) { // ROOT入栈，不用找父亲，continue
      stack.push(curNode);
      continue;
    }
    while (stack.length > curLevel) { // 栈顶不是父亲，栈顶出栈
      stack.pop(); // 直到栈顶是父亲了
    }
    if (stack[stack.length - 1].left) {
      stack[stack.length - 1].right = curNode; // 安排为右儿子 
    } else {
      stack[stack.length - 1].left = curNode; // 安排为左儿子
    }
    stack.push(curNode); // 节点肯定要入栈一次
  }
  return stack[0]; // 栈底就是根节点
}

// 方法三
var recoverFromPreorder = function (S) {
  let list = [],
    deep = 0,
    val = ''; // 由于有多位的数字, 循环字符串把数字拼接起来
  for (let s of S) {
    if (s !== '-') {
      val += s;
    } else if (val) {
      insertNode(+val, deep, list);
      deep = 1;
      val = '';
    } else {
      deep++;
    }
  }
  insertNode(+val, deep, list);
  return list[0];
};

function insertNode(val, deep, list) {
  list[deep] = new TreeNode(val);
  if (deep === 0) return;
  if (!list[deep - 1].left) {
    list[deep - 1].left = list[deep];
  } else {
    list[deep - 1].right = list[deep];
  }
}