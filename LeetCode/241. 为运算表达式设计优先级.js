/**
 * @param {string} expression
 * @return {number[]}
 */
// 方法一：动态规划
var diffWaysToCompute = function (expression) {
  const ADDITION = -1;
  const SUBTRACTION = -2;
  const MULTIPLICATION = -3;
  const ops = [];

  for (let i = 0; i < expression.length; ) {
    if (!isDigit(expression[i])) {
      if (expression[i] === '+') {
        ops.push(ADDITION);
      } else if (expression[i] === '-') {
        ops.push(SUBTRACTION);
      } else {
        ops.push(MULTIPLICATION);
      }
      i++;
    } else {
      let t = 0;
      while (i < expression.length && isDigit(expression[i])) {
        t = t * 10 + expression[i].charCodeAt() - '0'.charCodeAt();
        i++;
      }
      ops.push(t);
    }
  }

  const dp = new Array(ops.length)
    .fill(0)
    .map(() => new Array(ops.length).fill(0));
  for (let i = 0; i < ops.length; i++) {
    for (let j = 0; j < ops.length; j++) {
      dp[i][j] = [];
    }
  }
  for (let i = 0; i < ops.length; i += 2) {
    dp[i][i].push(ops[i]);
  }

  for (let i = 3; i <= ops.length; i++) {
    for (let j = 0; j + i <= ops.length; j += 2) {
      let l = j;
      let r = j + i - 1;
      for (let k = j + 1; k < r; k += 2) {
        const left = dp[l][k - 1];
        const right = dp[k + 1][r];

        for (const num1 of left) {
          for (const num2 of right) {
            if (ops[k] === ADDITION) {
              dp[l][r].push(num1 + num2);
            } else if (ops[k] === SUBTRACTION) {
              dp[l][r].push(num1 - num2);
            } else if (ops[k] === MULTIPLICATION) {
              dp[l][r].push(num1 * num2);
            }
          }
        }
      }
    }
  }

  return dp[0][ops.length - 1];
};

const isDigit = (ch) => {
  return parseFloat(ch).toString() === 'NaN' ? false : true;
};
// 时间复杂度：O(2^n)
// 空间复杂度：O(2^n)
