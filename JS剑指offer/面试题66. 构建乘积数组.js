// 面试题66. 构建乘积数组
// 给定一个数组 A[0,1,…,n-1]，请构建一个数组 B[0,1,…,n-1]，其中 B 中的元素 B[i]=A[0]×A[1]×…×A[i-1]×A[i+1]×…×A[n-1]。不能使用除法。
var constructArr = function(a) {
    if(a.length === 0) return [];
    let arr = [];
    arr[0] = 1;
    for(let i = 1; i < a.length; i++) {
        arr[i] = arr[i - 1] * a[i - 1];
    }
    let temp = 1;
    for(let j = a.length - 2; j >= 0; j--) {
        temp *= a[j + 1];
        arr[j] *= temp;
    }
    return arr;
};



