<template>
  <div>
    <h1>{{ msg }}</h1>

    <router-link to="/">
      <button>back to index</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "item_a",
  data() {
    return {
      msg: "aaaaaa",
    };
  },
  // 进入某路由的时候
  beforeRouteEnter(to, from, next) {
    // next(true);
    // next 为具体路径
    next("/item_b");
    // next((vm) => {
    //   // 通过 `vm` 访问组件实例
    // });
  },
  // 离开某路由的时候
  beforeRouteLeave(to, from, next) {
    next(true);
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 this
  },
};
</script>

<style scoped>
</style>

