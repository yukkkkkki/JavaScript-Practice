class Graph {
  constructor() {
    this.vertexes = []; // 顶点
    this.edges = new Map(); // 存储边
  }

  // 添加顶点
  addVertex(v) {
    this.vertexes.push(v);
    this.edges.set(v, []);
  }

  addEdge(v1, v2) {
    this.edges.get(v1).push(v2);
    this.edges.get(v2).push(v1);
  }

  // 打印图
  toString() {
    let res = ''; // 保存最终结果
    for (const vertex of this.vertexes) {
      res += vertex + ' -> ';
      for (const edeg of this.edges.get(vertex)) {
        res += edeg + ' ';
      }
      res += '\n';
    }
    return res;
  }

  // 初始化状态颜色
  initializerColor() {
    let colors = [];
    for (let i = 0; i < this.vertexes.length; i++) {
      colors[this.vertexes[i]] = 'white';
    }
    return colors;
  }

  // 广度优先搜索
  bfs(initV, handler) {
    // 初始化颜色
    let colors = this.initializerColor();
    // 创建队列
    let queue = [];
    // 将顶点入队列
    queue.push(initV);
    // 循环从队列中取出元素
    while (queue.length) {
      let v = queue.shift();
      // 获取和顶点相连的其他顶点
      let vList = this.edges.get(v);
      // 将v的颜色设置成灰色
      colors[v] = 'grey';
      // 遍历所有顶点，并且加入队列中
      for (let i = 0; i < vList.length; i++) {
        let e = vList[i];
        if (colors[e] == 'white') {
          colors[e] = 'grey';
          queue.push(e);
        }
      }
      // 访问顶点
      handler(v);
      // 将顶点设置为黑色
      colors[v] = 'black';
    }
  }

  // 深度优先遍历
  dfs(initV, handler) {
    let colors = this.initializerColor();
    this.dfsVisit(initV, colors, handler);
    // 从某个顶点开始依次递归访问
  }

  dfsVisit(v, colors, handler) {
    colors[v] = 'grey';
    handler(v);
    // 访问v相邻的其他顶点
    colors[v] = 'black';
    let vList = this.edges.get(v);
    for (let i = 0; i < vList.length; i++) {
      var e = vList[i];
      if (colors[e] == 'white') {
        this.dfsVisit(e, colors, handler);
      }
    }
    colors[v] = 'black';
  }
}

let graph = new Graph();

// 添加顶点
let myVertexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
for (const vertexe of myVertexes) {
  graph.addVertex(vertexe);
}

// 添加边
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

console.log(graph.toString());

console.log('--------------------------');
// 测试bfs
let res = '';
graph.bfs(graph.vertexes[0], function (v) {
  res += v + ' ';
});
console.log(res);
console.log('--------------------------');

// 测试dfs
var res2 = '';
graph.dfs(graph.vertexes[0], function (v) {
  res2 += v + ' ';
});
console.log(res2);
