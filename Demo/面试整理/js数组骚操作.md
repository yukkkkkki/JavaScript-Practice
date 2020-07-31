# 随机排序

1. 生成随机数

   遍历数组，每次循环都随机一个在数组长度范围内的数，并交换本次循环的位置和随机数位置上的元素

   ```javascript
   function randomSort1(arr) {
     for (let i = 0, l = arr.length; i < l; i++) {
       let rc = parseInt(Math.random() * l)
       // 让当前循环的数组元素和随机出来的数组元素交换位置
       const empty = arr[i]
       arr[i] = arr[rc]
       arr[rc] = empty
     }
     return arr
   }
   ```

2. 生成新数组

   - 声明一个新的空数组,利用 while 循环，如果数组长度大于 0，就继续循环；

   - 每次循环都随机一个在数组长度范围内的数，将随机数位置上的元素 push 到新数组里，

   - 并利用 splice截取出随机数位置上的元素，同时也修改了原始数组的长度

   ```javascript
   function randomSort2(arr) {
       var mixedArr = [];
       while (arr.length > 0) {
           let rc = parseInt(Math.random() * arr.length);
           mixedArr.push(arr[rc]);
           arr.splice(rc, 1);
       }
       return mixedArr;
   }
   ```

3. arr.sort

   ```javascript
   function randomSort3(arr) {
       arr.sort(function (a, b) {
           return Math.random() - 0.5;
       });
       return arr;
   }
   ```

# 数组对象排序

1. 单个属性排序

   ```javascript
   function compare(property) {
       return (a, b) => {
           return a[property] - b[property]
       }
   }
   ```

2. 多个属性排序

   ```javascript
   function by(name, minor) {
     return function(o, p) {
       let a, b
       if (o && p && typeof o === 'object' && typeof p === 'object') {
         a = o[name]
         b = p[name]
         if (a === b) {
           return typeof minor === 'function' ? minor(o, p) : 0
         }
         if (typeof a === typeof b) {
           return a < b ? -1 : 1
         }
         return typeof a < typeof b ? -1 : 1
       } else {
         thro('error')
       }
     }
   }
   ```

# 数组扁平化

1. ES6 flat方法

   ```javascript
   ary = arr.flat(Infinity)
   ```

2. 普通递归

   ```javascript
   let result = []
   let flatten = function (arr) {
     for (let i = 0; i < arr.length; i++) {
       let item = arr[i]
       if (Array.isArray(arr[i])) {
         flatten(item)
       } else {
         result.push(item)
       }
     }
     return result
   }
   ```

3. 利用reduce函数迭代

   ```javascript
   function flatten(arr) {
     return arr.reduce((pre, cur) => {
       return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
     }, [])
   }
   ```

4. 扩展运算符

   ```JavaScript
   function flatten(arr) {
     while (arr.some((item) => Array.isArray(item))) {
       arr = [].concat(...arr)
     }
     return arr
   }
   ```

# 数组去重

1. 利用数组的 indexOf 下标属性来查询

   ```javascript
   function unique(arr) {
     var newArr = []
     for (var i = 0; i < arr.length; i++) {
       if (newArr.indexOf(arr[i]) === -1) {
         newArr.push(arr[i])
       }
     }
     return newArr
   }
   ```

2. 先将原数组排序，在与相邻的进行比较，如果不同则存入新数组。

   ```javascript
   function unique(arr) {
     var formArr = arr.sort()
     var newArr = [formArr[0]]
     for (let i = 1; i < formArr.length; i++) {
       if (formArr[i] !== formArr[i - 1]) {
         newArr.push(formArr[i])
       }
     }
     return newArr
   }
   ```

3. 利用对象属性存在的特性，如果没有该属性则存入新数组。

   ```javascript
   function unique(arr) {
     var obj = {}
     var newArr = []
     for (let i = 0; i < arr.length; i++) {
       if (!obj[arr[i]]) {
         obj[arr[i]] = 1
         newArr.push(arr[i])
       }
     }
     return newArr
   }
   ```

4. 利用数组原型对象上的 includes 方法

   ```javascript
   function unique(arr) {
     var newArr = []
     for (var i = 0; i < arr.length; i++) {
       if (!newArr.includes(arr[i])) {
         newArr.push(arr[i])
       }
     }
     return newArr
   }
   ```

5. 利用数组原型对象上的 filter 和 includes 方法

   ```javascript
   function unique(arr) {
       let newArr = [];
       newArr = arr.filter(item => {
           return newArr.includes(item) ? '' : newArr.push(item);
       });
       return newArr;
   }
   ```

6. 利用 ES6 的 set 方法

   ```javascript
   function unique(arr) {
     return Array.from(new Set(arr)) // 利用Array.from将Set结构转换成数组
   }
   ```

# 根据属性去重

1. 方法一

   ```javascript
   function unique(arr) {
       const res = new Map();
       return arr.filter(item => !res.has(item.productName) && res.set(item.productName, 1));
   }
   ```

2. 方法二：

   ```javascript
   function unique(arr) {
       let result = {};
       let obj = {};
       for(let i = 0; i < arr.length; i++) {
           if(!obj[arr[i].key]) {
               result.push(arr[i]);
               obj[arr[i].key] = true;
           }
       }
   }
   ```

# 交集/并集/差集

1. includes方法结合filter方法

   ```javascript
   let a = [1, 2, 3]
   let b = [2, 4, 5]
   // 并集
   let union = a.concat(b.filter((v) => !a.includes(v)))
   // [1,2,3,4,5]
   
   // 交集
   let intersection = a.filter((v) => b.includes(v))
   // [2]
   
   // 差集
   let difference = a.concat(b).filter((v) => !a.includes(v) || !b.includes(v))
   // [1,3,4,5]
   ```

2. ES6 的 Set 数据结构

   ```javascript
   let a = new Set([1, 2, 3])
   let b = new Set([2, 4, 5])
   
   // 并集
   let union = new Set([...a, ...b])
   // Set {1, 2, 3, 4,5}
   
   // 交集
   let intersect = new Set([...a].filter((x) => b.has(x)))
   // set {2}
   
   // a 相对于 b 的）差集
   let difference = new Set([...a].filter((x) => !b.has(x)))
   // Set {1, 3}
   ```

# 数组求和

1. 暴力for循环

   ```javascript
   function sum(arr) {
     var s = 0
     for (var i = arr.length - 1; i >= 0; i--) {
       s += arr[i]
     }
     return s
   }
   ```

2. 递归

   ```javascript
   function sum(arr) {
     var len = arr.length
     if (len == 0) {
       return 0
     } else if (len == 1) {
       return arr[0]
     } else {
       return arr[0] + sum(arr.slice(1))
     }
   }
   ```

3. ES6 的 reduce 方法

   ```javascript
   function sum(arr) {
     return arr.reduce(function (prev, curr) {
       return prev + curr
     }, 0)
   }
   ```

# 类数组转化

1. Array slice方法

   `let arr = Array.prototype.slice.call(arguments)`

2. ES6 的 Array.from()

   `let arr = Array.from(arguments)`

3. 扩展运算符

   `let arr = [...arguments]`

# 数组上下移动

- ```javascript
  function swapItems(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0]
    return arr
  }
  
  function up(arr, index) {
    if (index === 0) {
      return
    }
    this.swapItems(arr, index, index - 1)
  }
  
  function down(arr, index) {
    if (index === this.list.length - 1) {
      return
    }
    this.swapItems(arr, index, index + 1)
  }
  ```

# 数组转化为树形结构

```javascript
function toTree(data, parentId = 0) {
  var itemArr = []
  for (var i = 0; i < data.length; i++) {
    var node = data[i]
    if (node.pid === parentId) {
      var newNode = {
        ...node,
        name: node.name,
        id: node.id,
        children: toTree(data, node.id),
      }
      itemArr.push(newNode)
    }
  }
  return itemArr
}
```



























> 参考链接
>
> https://juejin.im/post/6854818587820736526#heading-2