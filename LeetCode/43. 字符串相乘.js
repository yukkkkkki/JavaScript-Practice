/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  const n1 = num1.length;
  const n2 = num2.length;
  const pos = new Array(n1 + n2).fill(0);

  for (let i = n1 - 1; i >= 0; i--) {
    const m1 = +num1[i];

    for (let j = n2 - 1; j >= 0; j--) {
      const m2 = +num2[j];

      const multi = m1 * m2;
      const sum = pos[i + j + 1] + multi;

      pos[i + j + 1] = sum % 10;
      pos[i + j] += (sum / 10) | 0;
    }
  }

  while (pos[0] === 0) pos.shift();

  return pos.length ? pos.join("") : "0";
};
