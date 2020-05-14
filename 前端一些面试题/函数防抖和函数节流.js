// 防抖和节流

// 相同: 在不影响客户体验的前提下, 将频繁的回调函数, 进行次数缩减.避免大量计算导致的页面卡顿
// 不同: 防抖是将多次执行变为最后一次执行， 节流是将多次执行变为在规定时间内只执行一次

// 防抖
// 定义:
// 指触发事件后在规定时间内回调函数只能执行一次，如果在规定时间内又触发了该事件，则会重新开始算规定时间。
// 网上有这个比喻: 函数防抖就是法师发技能的时候要读条，技能读条没完再按技能就会刷新技能,重新进行读条。
// 四个字总结就是 延时执行

// 应用场景:
// 两个条件:
// (1)如果客户连续的操作会导致频繁的事件回调(可能引起页面卡顿).
// (2)客户只关心"最后一次"操作(也可以理解为停止连续操作后)所返回的结果.
// 例如:
// <1>输入搜索联想，用户在不断输入值时，用防抖来节约请求资源。
// <2>按钮点击：收藏 点赞 心标等

// 原理:
// 通过定时器将回调函数进行延时.
// 如果在规定时间内继续回调, 发现存在之前的定时器, 则将该定时器清除, 并重新设置定时器.
// 这里有个细节, 就是后面所有的回调函数都要能访问到之前设置的定时器, 这时就需要用到闭包(详见后面提到的)

// 防抖分为两种:
// 1) 非立即执行版: 事件触发 - > 延时 - > 执行回调函数;
// 如果在延时中, 继续触发事件, 则会重新进行延时.在延时结束后执行回调函数.
// 常见例子: 就是input搜索框, 客户输完过一会就会自动搜索
// 2) 立即执行版: 事件触发 - > 执行回调函数 - > 延时;
// 如果在延时中, 继续触发事件, 则会重新进行延时.在延时结束后, 并不会执行回调函数.
// 常见例子: 就是对于按钮防点击.例如点赞, 心标, 收藏等有立即反馈的按钮.

// 非立即执行版:
// 首先准备我们要使用的回调函数
function shotCat(content) {
    console.log('test')
}
// 然后准备包装函数:
// 1.保存定时器标识 
// 2.返回闭包函数: 
// (1)对定时器的判断清除
// (2)一般还需要保存函数的参数(一般就是事件返回的对象)和上下文(定时器存在this隐式丢失)
// 这里不建议通过定义一个全局变量来替代闭包保存定时器标识.
function debounce(fun, delay = 500) {
    // let timer = null 保存定时器
    return function (args) {
        let that = this;
        let _args = args;
        //这里对定时器的设置有两种方法
        // (1)将定时器保存在函数(函数也是对象)的属性上
        //这种写法 很简便 但不是很常用
        clearTimeout(fun.timer);
        fun.timer = setTimeout(function () {
            fun.call(that, _args);
        }, delay);
        // (2)常见写法 
        // 相比上面的方法 这里多一个判断
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
            fun.call(that, _args);
        }, delay)
    }
}
// 接着用变量保存保存 debounce 返回的带有延时功能的函数
let debounceShotCat = debounce(shotCat, 500)
// 最后添加事件监听 回调debounceShotCat 并传入事件返回的对象
let input = document.getElementById('debounce');
input.addEventListener('keyup', function (e) {
    debounceShotCat(e.target.value);
});

// 带有立即执行选项的防抖函数:
// 思路和上面的大致相同
// 如果是立即执行,则定时器中不再包含回调函数,而是在回调函数执行后,仅起到延时和重置定时器标识的作用
function debounce(fun, delay = 500, immediate = true) {
    let timer = null; // 保存定时器
    return function (args) {
        let that = this;
        let _args = args;
        // 不管是否立即执行都需要首先清空定时器
        if (timer) clearTimeout(timer);
        if (immediate) {
            // 如果定时器不存在 则说明延时已过 可以立即执行函数
            if (!timer) fun.apply(that, _args);
            // 不管上一个延时是否完成,都需要重置定时器
            timer = setTimeout(function () {
                timer = null;
            }, delay)
        } else {
            timer = setTimeout(function () {
                fun.call(that, _args);
            }, delay)
        }
    }
}



// 节流
// 定义:
// 当持续触发事件时,在规定时间段内只能调用一次回调函数。 
// 如果在规定时间内又触发了该事件,则什么也不做, 也不会重置定时器.

// 与防抖比较:
//  防抖是将多次执行变为最后一次执行,节流是将多次执行变为在规定时间内只执行一次.
// 一般不会重置定时器.即不会if(timer) clearTimeout(timer);
// (时间戳 + 定时器版除外)

// 应用场景:
// 两个条件:
// (1)客户连续频繁地触发事件
// (2)客户不再只关心 "最后一次"
// 操作后的结果反馈.而是在操作过程中持续的反馈.
// 例如:
// (1)鼠标不断点击触发,点击事件在规定时间内只触发一次(单位时间内只触发一次)
// (2)监听滚动事件,比如是否滑到底部自动加载更多,用throttle来判断

// 注意:连续频繁地触发事件,就是事件触发的时间间隔至少是要比规定的时间要短
// 原理:节流有两种实现方式
// (1)时间戳方式: 
// 通过闭包保存上一次的时间戳, 然后与事件触发的时间戳比较
// 如果大于规定时间, 则执行回调,否则就什么都不处理
// 特点: 一般第一次会立即执行,之后连续频繁地触发事件,也是超过了规定时间才会执行一次.
//       最后一次触发事件,也不会执行(说明: 如果你最后一次触发时间大于规定时间, 这样就算不上连续频繁触发了)

// (2)定时器方式: 原理与防抖类似.
// 通过闭包保存上一次定时器状态,然后事件触发时,如果定时器为null(即代表此时间隔已经大于规定时间),则设置新的定时器.到时间后执行回调函数,并将定时器置为null.
// 特点: 
// 当第一次触发事件时,不会立即执行函数,到了规定时间后才会执行。 
// 之后连续频繁地触发事件,也是到了规定时间才会执行一次(因为定时器).
// 当最后一次停止触发后,由于定时器的延时,还会执行一次回调函数 (那也是上一次成功成功触发执行的回调, 而不是你最后一次触发产生的) 
// 一句话总结就是【延时回调】 
// 你能看到的回调都是上次成功触发产生的, 而不是你此刻触发产生的.

// 这两者最大的区别: 
// 是时间戳版的函数触发是在规定时间开始的时候
// 而定时器版的函数触发是在规定时间结束的时候。

//时间戳版：
function throttle(fun, delay = 500) {
    // 记录上一次触发的时间戳,初始设为0，为了确保第一次触发产生回调
    let previous = 0;
    return function (args) {
        // 记录此刻触发时的时间戳
        let now = Date.now();
        let that = this;
        let _args = args;
        //如果时间差大于规定时间,则触发
        if (now - previous > delay) {
            fun.apply(that, _args);
            previous = now;
        }
    }
}
//定时器版:
function throttle(fun, delay = 500) {
    let timer;
    return function (args) {
        let that = this;
        let _args = args;
        // 如果定时器不存在,则设置新的定时器,到时后才执行回调
        // 并将定时器设为null
        if (!timer) {
            timer = setTimeout(function () {
                timer = null;
                fun.apply(that, _args);

            }, delay)
        }
    }
}
// 时间戳 + 定时器版: 
// 实现第一次触发可以立即响应,结束触发后也能有响应 (该版才是最符合实际工作需求)
// 主体思路还是时间戳版,定时器的作用仅仅是执行最后一次回调
function throttle(fun, delay = 500) {
    let timer = null;
    let previous = 0;
    return function (args) {
        let now = Date.now();
        //距离规定时间,还剩多少时间
        let remaining = delay - (now - previous);
        let that = this;
        let _args = args;
        //清除之前设置的定时器
        clearTimeout(timer);
        if (remaining <= 0) {
            fun.apply(that, _args);
            previous = Date.now();
        } else {
            timer = setTimeout(function () {
                timer = setTimeout(function () {
                    fun.apply(that, args)
                }, remaining); //因为上面添加的clearTimeout.实际这个定时器只有最后一次才会执行
            });
        }
    }
}


// 作者： shotCat
// 链接： https: //juejin.im/post/5c6bab91f265da2dd94c9f9e
//     来源： 掘金
// 著作权归作者所有。 商业转载请联系作者获得授权， 非商业转载请注明出处。