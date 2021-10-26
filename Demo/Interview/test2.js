// "ABDEGCF", "DBGEACF"
function createNode(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

function rebuildTree(a, b) {
  if (!a.length) return b;
  if (!b.length) return a;
  let node = new createNode(a[0]);

  let index = b.indexOf(a[0]);
  let bLeft = b.slice(0, index);
  let bRight = b.slice(index + 1);
  let aLeft = a.slice(1, 1 + bLeft.length);
  let aRight = a.slice(1 + bLeft.length);

  rebuildTree(aLeft, bLeft);
  rebuildTree(aRight, bRight);
}

function help(a, b) {
  if (!a.length) return new createNode(a[0]);
  if (!b.length) return new createNode(b[0]);
  
  let node = new createNode(a[0]);
}
