// 请编写一个函数，使其可以删除某个链表中给定的（非末尾）节点，你将只被给定要求被删除的节点。

// 现有一个链表 -- head = [4,5,1,9]，它可以表示为:

// 示例 1:
// 输入: head = [4,5,1,9], node = 5
// 输出: [4,1,9]
// 解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.

// 示例 2:
// 输入: head = [4,5,1,9], node = 1
// 输出: [4,5,9]
// 解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.

// 说明:
// 链表至少包含两个节点。
// 链表中所有节点的值都是唯一的。
// 给定的节点为非末尾节点并且一定是链表中的一个有效节点。
// 不要从你的函数中返回任何结果。

var deleteNode = function (node) {
  node.val = node.next.val;
  node.next = node.next.next;
};

// 额额我一开始还纳闷怎么head没穿进来额，神经病


// JS中基本类型按值引用， 对象类型按地址引用

// let a = {};
// let b = a;
// a.val = 1; // 此时 a → { val: 1 }, b → { val, 1 }
// a = {}; // 此时 a → {}, b → { val, 1 }

// 在JS中， 以上代码段中的a其实只是保存了一个内存中的地址， 每次使用a的时候其实是通过地址去找到真正的 {}
// 而将a赋值给b， 其实就是将a保存的地址复制给b一份， 然后调用b也会去找到和a相同地址的 {}
// a.val = 1 就是将a地址指向的对象 {}
// 增加一个值为1的属性val
// 因为b保存的地址也指向同一个对象， 所以看起来就像是b也在同步变化。 其实b保存的地址并没有变化。
// a = {}
// 则将一个新的 {}
// 的地址赋值给了a， 此时覆盖掉了原来保存的 {val: 1}
// 对象的地址， 然而b所保存的地址仍然指向原来的 {val: 1}

// 作者： chitanda - eru
// 链接： https: //leetcode-cn.com/problems/delete-node-in-a-linked-list/solution/jsxiao-keng-by-chitanda-eru/
//   来源： 力扣（ LeetCode）
// 著作权归作者所有。 商业转载请联系作者获得授权， 非商业转载请注明出处。