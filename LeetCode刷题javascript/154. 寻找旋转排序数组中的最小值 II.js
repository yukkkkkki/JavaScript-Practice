// 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。  

// 示例 1：
// 输入：[3,4,5,1,2]
// 输出：1

// 示例 2：
// 输入：[2,2,2,0,1]
// 输出：0

// 二分查找解决法， 使 O(n) 变为 O(logn)
// 思路：
// 用三个指针，i指向数组的第一个数字，j指向数组的最后一个数字，mid指向中间数字
// 若mid指向数字大于i指向的数字，故mid指向的数字在第一个数组之中，下一步把i指向mid指向的数字
// 此时i和j之间的数字（mid指向的数字）若小于j指向的数字，中间数字则在第二个数组之中，下一步把j指向中间的数字
// 最后i和j指向相邻的两个数字，则j指向的是数组中的最小数字
var minArray = function(numbers) {
    let i = 0, j = numbers.length - 1, mid;
    while(i <= j) {
        mid = (i + j) >> 1;
        if(numbers[mid] > numbers[j]) {
            i = mid + 1;
        } else if (numbers[mid] < numbers[j]) {
            j = mid;
        } else {
            j--;
        }
    }
    return numbers[i];
};

// 直接用Math.min()
var minArray = function(numbers) {
    return Math.min(...numbers);
};