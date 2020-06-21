// 1.二分查找
// 递归(分左右, 传递start,end参数)和非递归(使用while(l < h))


// 2.各种排序
// (1)冒泡排序：两个for循环 比较相邻记录
function bubleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 相邻元素两两对比
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

function bubleSort2(arr) {
    var len = arr.length;
    for (let outer = len; outer >= 2; outer--) {
        for (let inner = 0; inner <= outer - 1; inner++) {
            if (arr[inner] > arr[inner + 1]) {
                [arr[inner], arr[inner + 1]] = [arr[inner + 1], arr[inner]]
            }
        }
    }
    return arr;
}

// (2)选择排序
// 遍历自身以后的元素，最小的元素跟自己调换位置
function selectSort(arr) {
    var len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = i; j < len; j++) {
            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
    }
    return arr;
}

// (3)插入排序
// 即将元素插入到已排序好的数组中，具体算法描述如下：
// <1>.从第一个元素开始，该元素可以认为已经被排序；
// <2>.取出下一个元素，在已经排序的元素序列中从后向前扫描；
// <3>.如果该元素（已排序）大于新元素，将该元素移到下一位置；
// <4>.重复步骤 3，直到找到已排序的元素小于或者等于新元素的位置；
// <5>.将新元素插入到该位置后；
// <6>.重复步骤 2~5。
function insertSort(arr) {
    //外循环从1开始，默认arr[0]是有序段
    for (let i = 1; i < arr.length; i++) {
        // j = i,将arr[j]依次插入有序段中
        for (let j = i; j > 0; j--) {
            if (arr[j] < arr[j - 1]) {
                [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
            } else {
                break;
            }
        }
    }
    return arr;
}
var A = [3, 4, 77, 1, 2, 89, 21]
console.log(insertSort(A));

// (4).快速排序
// 选择基准值(base)，原数组长度减一(基准值)，使用 splice
// 循环原数组，小的放左边(left数组)，大的放右边(right数组);
// concat(left, base, right)
// 递归继续排序 left 与 right，最后再concat一下
function quickSort(arr) {
    if (arr.length <= 1) return arr;

    var left = [],
        right = [],
        current = arr.splice(0, 1);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < current) {
            left.push(arr[i]) // 小的放在左边
        } else {
            right.push(arr[i]) // 大的放在右边
        }
    }
    return quickSort(left).concat(current, quickSort(right));
}
// console.log(quickSort([4,2,5,66,7,1,2,33]));

// (5)归并排序
// 归并排序是建立在归并操作上的一种有效的排序算法。
// 该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。
// 归并排序是一种稳定的排序方法。
// 将已有序的子序列合并，得到完全有序的序列；
// 即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为 2-路归并。
// <1>.把长度为 n 的输入序列分成两个长度为 n/2 的子序列；
// <2>.对这两个子序列分别采用归并排序；
// <3>.将两个排序好的子序列合并成一个最终的排序序列。
function mergeSort(arr) {
    //采用自上而下的递归方法
    var len = arr.length;
    if (len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var result = [];
    console.time("归并排序耗时");
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length) result.push(left.shift());
    while (right.length) result.push(right.shift());
    // console.timeEnd("归并排序耗时");
    return result;
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(mergeSort(arr));

// (6)希尔排序
// 先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，具体算法描述：
// <1>. 选择一个增量序列 t1，t2，…，tk，其中 ti>tj，tk=1；
// <2>.按增量序列个数 k，对序列进行 k 趟排序；
// <3>.每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。
function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    console.time("希尔排序耗时:");
    while (gap < len / 5) {
        //动态定义间隔序列
        gap = gap * 5 + 1;
    }
    for (gap; gap > 0; gap = Math.floor(gap / 5)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    console.timeEnd("希尔排序耗时:");
    return arr;
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(shellSort(arr)); //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]


// 3.最长公共子串
function findSubStr(str1, str2) {
    if (str1.length > str2.length) {
        [str1, str2] = [str2, str1];
    }
    var res = '';
    var len = str1.length;
    for (var j = len; j > 0; j--) {
        for (var i = 0; i < len - j; i++) {
            res = str1.substr(i, j);
            if (str2.includes(res)) return res;
        }
    }
}
// console.log(findSubStr('aabbcc11', 'ppooiiuubcc123'))

// 4.最长公共子序列
// dp[i][j] 计算去最大长度，记住口诀：相等左上角加一，不等取上或左最大值
function LCS(str1, str2) {
    var rows = str1.split("");
    rows.unshift("");
    var cols = str2.split("");
    cols.unshift("");
    var m = rows.length,
        n = cols.length,
        dp = [];

    for (var i = 0; i < m; i++) {
        dp[i] = []
        for (var j = 0; j < n; j++) {
            if (i === 0 || j === 0) {
                dp[i][j] = 0
                continue
            }

            if (rows[i] === cols[j]) {
                dp[i][j] = dp[i - 1][j - 1] + 1 //对角＋1
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) //对左边，上边取最大
            }
        }
        console.log(dp[i].join("")) //调试
    }
    return dp[i - 1][j - 1]
}
//!!!如果它来自左上角加一，则是子序列，否则向左或上回退。
//findValue过程，其实就是和 就是把T[i][j]的计算反过来。
// 求最长子序列
function findValue(input1, input2, n1, n2, T) {
    var i = n1 - 1,
        j = n2 - 1;
    var result = []; //结果保存在数组中
    console.log(i);
    console.log(j);
    while (i > 0 && j > 0) {
        if (input1[i] == input2[j]) {
            result.unshift(input1[i]);
            i--;
            j--;
        } else {
            //向左或向上回退
            if (T[i - 1][j] > T[i][j - 1]) {
                //向上回退
                i--;
            } else {
                //向左回退
                j--;
            }
        }
    }
    console.log(result);
}

// 5.数组去重，多种方法
// 双for循环, splice剔除并i--回退
// indexOf等于index
// filter indexOf === index
// 新数组indexOf === index
// 使用空对象等

// 6.实现一个函数功能：
// sum(1,2,3,4..n)转化为 sum(1)(2)(3)(4)…(n)
// 使用柯里化 + 递归
function curry(fn) {
    var c = (...arg) => (fn.length === arg.length) ? fn(...arg) : (...arg1) => c(...arg, ...arg1);
    return c;
}

// 7.反转二叉树
var invertTree = function (root) {
    if (root !== null) {
        [root.left, root.right] = [root.right, root.left];
        invertTree(root.left);
        invertTree(root.right);
    }
    return root;
}

// 8.贪心算法解决背包问题
var items = ['A', 'B', 'C', 'D'];
var values = [50, 220, 60, 60];
var weights = [5, 20, 10, 12];
var capacity = 32; //背包容积

greedy(values, weights, capacity); // 320

function greedy(values, weights, capacity) {
    var result = 0;
    var rest = capacity;
    var sortArray = [];
    var num = 0;
    values.forEach((v, i) => {
        sortArray.push({
            value: v,
            weight: weights[i],
            ratio: v / weights[i]
        });
    });
    sortArray.sort((a, b) => b.ratio - a.ratio)
    sortArray.forEach((v, i) => {
        num = parseInt(rest / v.weight);
        rest -= num * v.weight;
        result += num * v.value;
    });
    return result;
}
// 9.输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，如果有多对数字的和等于S，输出两个数的乘积最小的。
function FindNumbersWithSum(array, sum) {
    var index = 0
    for (var i = 0; i < array.length - 1 && array[i] < sum / 2; i++) {
        for (var j = i + 1; j < array.length; j++) {
            if (array[i] + array[j] === sum) return [array[i], array[j]]
        }
    }
    return [];
}

// 10.二叉树各种(层序)遍历
// 深度广度遍历:
// (1)根据前序和中序重建二叉树
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
var buildTree = function (preorder, inorder) {
    if (!preorder.length || !inorder.length) return null;

    // 前序遍历的第一个元素为根节点
    const rootVal = preorder[0];
    const node = new TreeNode(rootVal);

    let i = 0;
    // i有两个含义，一个是根节点在中序遍历结果中的下标，
    // 另一个是当前左子树的节点个数
    for (; i < inorder.length; ++i) {
        if (inorder[i] === rootVal) {
            break;
        }
    }
    // 递归处理左右子树
    node.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));
    node.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));
    return node;
};

// (2)递归
// 前序遍历
function preTraverse(node) {
    if (node === null) return;

    console.log(node.data);
    preTraverse(node.left);
    preTraverse(node.right);
}
// 中序遍历
function middleTraverse(node) {
    if (node === null) return;

    middleTraverse(node.left);
    console.log(node.data);
    middleTraverse(node.right);
}
// 后序遍历
function lastTraverse(node) {
    if (node === null) return;

    lastTraverse(node.left);
    lastTraverse(node.right);
    console.log(node.data);
}

// (3)非递归
// 前序遍历
function preTraverse(tree) {
    var arr = [],
        node = null;
    arr.unshift(tree)
    while (arr.length) {
        node = arr.shift()
        console.log(node.root)
        if (node.right) arr.unshift(node.right)
        if (node.left) arr.unshift(node.left)
    }
}
// 中序遍历
// shift() 弹出第一个元素
// unshift() 往数组里加入第一个元素 
function middleTraverseUnRecursion(root) {
    let arr = [],
        node = root;

    while (arr.length !== 0 || node !== null) {
        if (node === null) {
            node = arr.shift();
            console.log(node.data);
            node = node.right;
        } else {
            arr.unshift(node);
            node = node.left;
        }
    }
}

// (4)广度优先-层序遍历
// 递归
var result = [];
var stack = [tree];
var count = 0;
var bfs = function () {
    var node = stack[count];
    if (node) {
        result.push(node.value);
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
        count++;
        bfs();
    }
}
// bfs()
// console.log(result);
// 非递归
function bfs(node) {
    var result = [];
    var queue = [];
    queue.push(node);
    while (queue.length) {
        node = queue.shift();
        result.push(node.value);
        node.left && queue.push(node.left);
        node.right && queue.push(node.right);
    }
    return result;
}

// 11.使用尾递归对斐波那契优化
// 传统递归斐波那契, 会造成超时或溢出
function Fibonacci(n) {
    if (n <= 1) return 1;
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}
// console.log(Fibonacci(10));
// console.log(Fibonacci(100)); //超时
// 使用尾递归优化, 可规避风险
function Fibonacci2(n, ac1 = 1, ac2 = 1) {
    if (n <= 1) {
        return ac2
    };
    return Fibonacci2(n - 1, ac2, ac1 + ac2);
}

// 12.递归运用(斐波那契数列)：爬楼梯问题
function cStairs(n) {
    if (n === 1 || n === 2) {
        return 1;
    } else {
        return cStairs(n - 1) + cStairs(n - 2);
    }
}
// console.log(cStairs(4)); // 3

// 13.两个升序数组合并为一个升序数组
function sort(A, B) {
    var i = 0,
        j = 0,
        p = 0,
        m = A.length,
        n = B.length,
        C = [];
    while (i < m || j < n) {
        if (i < m && j < n) {
            // 关键
            C[p++] = A[i] < B[j] ? A[i++] : B[j++];
        } else if (i > m) {
            C[p++] = A[i++];
        } else {
            C[p++] = B[j++];
        }
    }
    return C;
}
// var A = [1,2,3,4,5], 
//     B = [3,4,5,6,7];
// console.log(sort(A, B));