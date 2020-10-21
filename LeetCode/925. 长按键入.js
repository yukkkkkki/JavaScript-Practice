// 你的朋友正在使用键盘输入他的名字 name。偶尔，在键入字符 c 时，按键可能会被长按，而字符可能被输入 1 次或多次。

// 你将会检查键盘输入的字符 typed。如果它对应的可能是你的朋友的名字（其中一些字符可能被长按），那么就返回 True。

// 示例 1：
// 输入：name = "alex", typed = "aaleex"
// 输出：true
// 解释：'alex' 中的 'a' 和 'e' 被长按。

// 示例 2：
// 输入：name = "saeed", typed = "ssaaedd"
// 输出：false
// 解释：'e' 一定需要被键入两次，但在 typed 的输出中不是这样。

// 示例 3：
// 输入：name = "leelee", typed = "lleeelee"
// 输出：true

// 示例 4：
// 输入：name = "laiden", typed = "laiden"
// 输出：true
// 解释：长按名字中的字符并不是必要的。

/**
 * @param {string} name
 * @param {string} typed
 * @return {boolean}
 */
// 方法一：双指针
// 使用两个下标 i 和 j 追踪 name 和 typed 的位置
// 当 name[i] = typed[j]时，说明两个字符串存在一对匹配的字符，则 i++, j++
// 否则，若typed[j] = typed[j - 1]，说明存在一次长按键，此时 j++
// 最后如果 i = name.length，说明name的每个字符都被匹配了
var isLongPressedName = function (name, typed) {
  let i = 0,
    j = 0;
  while (j < typed.length) {
    if (i < name.length && name[i] == typed[j]) {
      i++;
      j++;
    } else if (j > 0 && typed[j] == name[i - 1]) {
      j++;
    } else {
      return false;
    }
  }
  return i == name.length;
};
