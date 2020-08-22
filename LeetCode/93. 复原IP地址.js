// 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。

// 有效的 IP 地址正好由四个整数（每个整数位于 0 到 255 之间组成），整数之间用 '.' 分隔。

// 示例:
// 输入: "25525511135"
// 输出: ["255.255.11.135", "255.255.111.35"]

// 方法一：递归
// 设题目中给出的字符串为 s。我们用递归函数 dfs(segId,segStart) 表示我们正在从 s[segStart] 的位置开始，搜索 IP 地址中的第 segId 段，其中 segId∈{0,1,2,3} 。
// 由于 IP 地址的每一段必须是 [0,255] 中的整数，因此我们从 segStart 开始，从小到大依次枚举当前这一段 IP 地址的结束位置 segEnd。
// 如果满足要求，就递归地进行下一段搜索，调用递归函数 dfs(segId+1,segEnd+1) 。

// 特别地，由于 IP 地址的每一段不能有前导零，因此如果 s[segStart] 等于字符 0，那么 IP 地址的第 segId 段只能为 0，需要作为特殊情况进行考虑。

// 在递归搜索的过程中，如果我们已经得到了全部的 4 段 IP 地址（即 segId=4），并且遍历完了整个字符串（即 segStart=∣s∣，其中 ∣s| 表示字符串 s 的长度），那么就复原出了一种满足题目要求的 IP 地址，我们将其加入答案。
// 在其它的时刻，如果提前遍历完了整个字符串，那么我们需要结束搜索，回溯到上一步。
var restoreIpAddresses = function (s) {
  const SEG_COUNT = 4;
  const segments = new Array(SEG_COUNT);
  const ans = [];

  const dfs = (s, segId, segStart) => {
    // 如果找到了 4 段 IP 地址并且遍历完了字符串，那么就是一种答案
    if (segId === SEG_COUNT) {
      if (segStart === s.length) {
        ans.push(segments.join("."));
      }
      return;
    }

    // 如果还没有找到 4 段 IP 地址就已经遍历完了字符串，那么提前回溯
    if (segStart === s.length) return;

    // 由于不能有前导零，如果当前数字为 0，那么这一段 IP 地址只能为 0
    if (s.charAt(segStart) === "0") {
      segments[segId] = 0;
      dfs(s, segId + 1, segStart + 1);
    }

    // 一般情况，枚举每一种可能性并递归
    let addr = 0;
    for (let segEnd = segStart; segEnd < s.length; ++segEnd) {
      addr = addr * 10 + (s.charAt(segEnd) - "0");
      if (addr > 0 && addr <= 0xff) {
        segments[segId] = addr;
        dfs(s, segId + 1, segEnd + 1);
      } else {
        break;
      }
    }
  };
  dfs(s, 0, 0);
  return ans;
};
// 时间复杂度：O(3^SEG_COUNT∗∣s∣); 空间复杂度为 O(SEG_COUNT)

// 方法二：DFS 回溯
var restoreIpAddresses = function (s) {
  const res = [];
  const dfs = (subRes, start) => {
    // 满4段，且用光所有字符
    if (subRes.length == 4 && start == s.length) {
      res.push(subRes.join("."));
    }
    // 满4段，但还没用光字符，直接返回
    if (subRes.length == 4 && start < s.length) return;
    for (let len = 1; len <= 3; len++) {
      // 字符不存在，超出边界了
      if (s[start + len - 1] == undefined) return;
      // 不能是0x、0xx
      if (len !== 1 && s[start] == "0") return;
      const str = s.substring(start, start + len); // 当前选择切出的片段
      if (len == 3 && +str > 255) return; // 不能超过255
      subRes.push(str);
      dfs(subRes, start + len);
      subRes.pop(); // 撤销最后的选择，回到之前的状态
    }
  };
  dfs([], 0); // dfs入口
  return res;
};
