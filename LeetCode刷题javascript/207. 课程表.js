// 你这个学期必须选修 numCourse 门课程，记为 0 到 numCourse-1 。

// 在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们：[0,1]

// 给定课程总量以及它们的先决条件，请你判断是否可能完成所有课程的学习？

// 示例 1:
// 输入: 2, [[1,0]]
// 输出: true
// 解释: 总共有 2 门课程。学习课程 1 之前，你需要完成课程 0。所以这是可能的。

// 示例 2:
// 输入: 2, [[1,0],[0,1]]
// 输出: false
// 解释: 总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0；并且学习课程 0 之前，你还应先完成课程 1。这是不可能的。

// 方法一：BFS
var canFinish = function (numCourses, prerequisites) {
  //inDegree[i]表示第i门课还有inDegree[i]门先修课程没有上
  const inDegree = new Array(numCourses).fill(0);
  const graph = {}; // 图
  const queue = []; // 课程队列
  // 将课程的后续课程存起来
  prerequisites.forEach(([cur, pre]) => {
    inDegree[cur]++;
    graph[pre] ? graph[pre].push(cur) : (graph[pre] = [cur]);
  });

  // 将没有先修课程的课程添加到课程队列里
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  while (queue.length) {
    // 从队列中取出一门课程
    const temp = queue.shift();
    if (graph[temp]) {
      for (let course of graph[temp]) {
        inDegree[course]--;
        if (inDegree[course] == 0) {
          queue.push(course);
        }
      }
    }
  }
  // 判断是不是所有课程都能上了
  return inDegree.every((v) => v == 0);
};
