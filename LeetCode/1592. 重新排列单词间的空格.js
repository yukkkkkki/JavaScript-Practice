/**
 * @param {string} text
 * @return {string}
 */
// 方法一：模拟
var reorderSpaces = function (text) {
  const length = text.length;
  const words = [];
  text.split(" ").forEach((e) => {
    if (e.length > 0) {
      words.push(e);
    }
  });

  let cntSpace = length;
  for (const word of words) {
    if (word.length) {
      cntSpace -= word.length;
    }
  }

  let sb = "";
  if (words.length === 1) {
    sb += words[0];
    for (let i = 0; i < cntSpace; i++) {
      sb += " ";
    }
    return sb;
  }

  const perSpace = Math.floor(cntSpace / (words.length - 1));
  const restSpace = cntSpace % (words.length - 1);
  for (let i = 0; i < words.length; i++) {
    if (i > 0) {
      for (let j = 0; j < perSpace; j++) {
        sb += " ";
      }
    }
    sb += words[i];
  }

  for (let i = 0; i < restSpace; i++) {
    sb += " ";
  }

  return sb;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
