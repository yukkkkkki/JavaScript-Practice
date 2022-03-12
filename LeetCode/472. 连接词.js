/**
 * @param {string[]} words
 * @return {string[]}
 */
var findAllConcatenatedWordsInADict = function (words) {
  words.sort((a, b) => a.length - b.length);
  const set = new Set(words);
  if (set.has('')) set.delete('');

  function dfs(word, start) {
    let s = '';
    for (let i = start; i < word.length; i++) {
      s += word[i];
      if (set.has(s) && dfs(word, i + 1)) return true;
    }
    return set.has(s) && start;
  }

  const headSet = new Set(),
    tailSet = new Set(),
    compSet = new Set();
  function preCheck(word) {
    let found = true,
      comps = [];
    for (let i = 0; i < word.length - 1; i++) {
      const s = word[i] + word[i + 1];
      if (!compSet.has(s) && !(tailSet.has(s[0]) && headSet.has(s[1])))
        found = false;
      comps.push(s);
    }
    headSet.add(word[0]), tailSet.add(word[word.length - 1]);
    for (const c of comps) compSet.add(c);
    return found;
  }

  return words.reduce((acc, cur) => {
    if (!preCheck(cur)) return acc;
    if (dfs(cur, 0)) acc.push(cur);
    return acc;
  }, []);
};

// 作者：jie-ma
// 链接：https://leetcode-cn.com/problems/concatenated-words/solution/fei-chang-gui-jie-fa-ha-xi-biao-di-gui-b-jl1p/
