let entries = window.performance.getEntries();

let r1 = null;
let r2 = null;
let r3 = null;

for (let i = 0; i < entries.length; i++) {
  let cur = entries[i];
  if (cur.transferSize) r1 += cur.transferSize;
  if (cur.encodedBodySize) r2 += cur.encodedBodySize;
  if (cur.decodedBodySize) r3 += cur.decodedBodySize;
}

console.log('transferSize: ', r1);
console.log('encodedBodySize: ', r2);
console.log('decodedBodySize: ', r3);
