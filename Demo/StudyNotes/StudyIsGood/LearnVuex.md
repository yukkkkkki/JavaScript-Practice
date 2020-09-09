# Vuex

1. **`Vuex`原理**
2. **`Vuex`是什么？怎么使用？哪种功能场景使用它**
   - `Vuex`：是一个状态管理模式。采用集中式存储管理应用的所有组件的状态， 并以相应的规则保证状态以一种可预测的方式发生变化。
   - 优点：
     - 解决了多层组件之间繁琐的事件传播。
     - 解决了多组件依赖统同一状态的问题。
     - 单向数据流
     - 为`Vue`量身定做，学习成本不高
   - 缺点：
     - 不能做数据持久化，刷新页面就要重制，要做数据持久化可以考虑使用`localstorage`
     - 增加额外的代码体积，简单的业务场景不建议使用
2. **`Vuex`有哪几种属性**
3. **Vue.js中ajax请求代码应该写在组件的methods中还是`Vuex`的actions中**
4. **为什么`vuex`数据更新后，插件中使用数据的地方没有更新？**
   - `Vuex`的数据写在store里，在组件中需要用到`this.$store.commit`() 来调用store中mutations 里面的一些数据处理方法来向后端请求数据。并在computed计算属性中通过this.$getters来获取`Vuex`的数据。数据获取完成并且被getters到组件中，但组件显示数据没有更新：
     - 因为没有监听到数据变化；`vue`对数组数据的变化只能监听到：push(), pop(), shift(), unshift(), splice(), sort(), reverse()
     - 页面加载前组件获取store里的值赋给自己，这样它的数据只有一个初始值，后续`Vuex`中状态发生变化，并不会再次赋值，除非页面刷新重新加载，组件生命周期重新开始，才能拿到最新的值



> 参考链接
>
> 1. https://juejin.im/post/6844903736356126734
> 2. https://www.cnblogs.com/The-master-of-time/p/10614750.html
> 3. https://blog.csdn.net/jack_bob/article/details/80537292
> 4. https://blog.csdn.net/weixin_42204698/article/details/89888635