/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
// 方法一：哈希表
// 使用一个哈希表记录 list1 中每个餐厅对应的索引下标，然后遍历 ist2
// 如果 list2 中的餐厅存在于哈希表中，那么说明该餐厅是两人共同喜爱的，计算它的索引和
// 如果该索引和比最小索引和小，则清空结果，将该餐厅加入结果中，该索引和作为最小索引和
// 如果该索引和等于最小索引和，则直接将该餐厅加入结果中
var findRestaurant = function (list1, list2) {
  const map = new Map();
  for (let i = 0; i < list1.length; i++) {
    map.set(list1[i], i);
  }

  const res = [];
  let indexSum = Number.MAX_VALUE;
  for (let i = 0; i < list2.length; i++) {
    if (map.has(list2[i])) {
      const j = map.get(list2[i]);
      if (i + j < indexSum) {
        res.length = 0;
        res.push(list2[i]);
        indexSum = i + j;
      } else if (i + j == indexSum) {
        res.push(list2[i]);
      }
    }
  }

  return res;
};
