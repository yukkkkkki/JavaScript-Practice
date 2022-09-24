/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minReorder = function (n, connections) {
  const connectIdx = new Array(n).fill(0).map(() => new Array());
  for (let connection of connections) {
    connectIdx[connection[0]].push([connection[1], 1]);
    connectIdx[connection[1]].push([connection[0], 0]);
  }

  let res = 0;
  const visited = new Array(n).fill(false);
  let queue = [0];
  visited[0] = true;

  while (queue.length) {
    let q = queue.shift();

    for (let city of connectIdx[q]) {
      if (!visited[city[0]]) {
        visited[city[0]] = true;
        res += city[1];
        queue.push(city[0]);
      }
    }
  }

  return res;
};
