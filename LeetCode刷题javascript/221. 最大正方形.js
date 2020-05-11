// 在一个由 0 和 1 组成的二维矩阵内，找到只包含 1 的最大正方形，并返回其面积。

// 示例:

// 输入: 

// 1 0 1 0 0
// 1 0 1 1 1
// 1 1 1 1 1
// 1 0 0 1 0

// 输出: 4
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
    // 动态规划
    if(matrix.length === 0 || matrix[0].length === 0) return 0;
    let rowLimit = matrix.length,
        colLimit = matrix[0].length,
        dp = [],
        max = 0;
    for(let i = 0; i < rowLimit; i++) dp[i] = [];
    for(let row = 0; row < rowLimit; row++) {
        for(let col = 0; col < colLimit; col++) {
            if(matrix[row][col] == 0) {
                dp[row][col] = 0;
            } else {
                let topLeft = ((row - 1 < 0) || (col - 1 < 0)) ? 0 : dp[row - 1][col - 1],
                    top = (row - 1 < 0) ? 0 : dp[row - 1][col],
                    left = (col - 1 < 0) ? 0 : dp[row][col - 1];
                dp[row][col] = Math.min(topLeft, left, top) + 1;
            }
            max = Math.max(max, dp[row][col]);
        }
    }
    return max * max;
};