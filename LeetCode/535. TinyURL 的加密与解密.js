/**
 * Encodes a URL to a shortened URL.
 *
 * @param {string} longUrl
 * @return {string}
 */
// 方法一：随机生成
var encode = function (longUrl) {
  this.dataBase = new Map();
  let key;
  while (true) {
    key = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    if (!this.dataBase.has(key)) {
      break;
    }
  }
  this.dataBase.set(key, longUrl);
  return 'http://tinyurl.com/' + key;
};

/**
 * Decodes a shortened URL to its original URL.
 *
 * @param {string} shortUrl
 * @return {string}
 */
var decode = function (shortUrl) {
  const p = shortUrl.lastIndexOf('/') + 1;
  const key = parseInt(shortUrl.substring(p));
  return this.dataBase.get(key);
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
/**
 * Your functions will be called as such:
 * decode(encode(url));
 */
