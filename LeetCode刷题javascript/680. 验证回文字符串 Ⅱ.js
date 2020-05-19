// 给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。

// 示例 1:
// 输入: "aba"
// 输出: True

// 示例 2:
// 输入: "abca"
// 输出: True
// 解释: 你可以删除c字符。

// 注意:字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。

// 方法一
var validPalindrome = function (s) {
    return helper(s, true) || helper(s, false);
};

function helper(s, left) {
    // 标记是否进行了删除修改
    let update = false;
    for (let i = 0, j = s.length - 1; i <= j;) {
        // 左右不相等
        if (s[i] !== s[j]) {
            if (update) return false;
            // 移动指针，相当于删除一个字符，两种 case，移动左边字符或右边字符
            left ? i++ : j--;
            update = true;
        } else {
            i++, j--;
        }
    }
    return true;
}

// 方法二
// 用两个指针，分别指向字符串的头尾节点
// 如果头尾相等则 l++, r--，执行完后如果 r <= l, 则说明 s 是回文字符串，返回 true
// 否则说明 s 不是回文字符串，此时我可以删除一个头节点的字符，或者尾节点的字符，再对其进行检测是否是回文字符串
// 因为只能删一个字符，所以我们只能删一次，可以使用一个 flag 进行过滤
var validPalindrome = function (s, flag = true) {
    let l = 0,
        r = s.length - 1;
    while (l < r && s[l] === s[r]) l++, r--;
    if (r <= l) return true;
    if (flag == true) {
        return validPalindrome(s.slice(l, r), false) || validPalindrome(s.slice(l + 1, r + 1), false);
    }
    return false;
};