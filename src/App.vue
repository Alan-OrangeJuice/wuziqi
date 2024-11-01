<!--<script setup lang="ts">-->
<!--import HelloWorld from './components/HelloWorld.vue'-->
<!--import TheWelcome from './components/TheWelcome.vue'-->
<!--</script>-->

<!--<template>-->
<!--  <header>-->
<!--    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />-->

<!--    <div class="wrapper">-->
<!--      <HelloWorld msg="You did it!" />-->
<!--    </div>-->
<!--  </header>-->

<!--  <main>-->
<!--    <TheWelcome />-->
<!--  </main>-->
<!--</template>-->

<!--<style scoped>-->
<!--header {-->
<!--  line-height: 1.5;-->
<!--}-->

<!--.logo {-->
<!--  display: block;-->
<!--  margin: 0 auto 2rem;-->
<!--}-->

<!--@media (min-width: 1024px) {-->
<!--  header {-->
<!--    display: flex;-->
<!--    place-items: center;-->
<!--    padding-right: calc(var(&#45;&#45;section-gap) / 2);-->
<!--  }-->

<!--  .logo {-->
<!--    margin: 0 2rem 0 0;-->
<!--  }-->

<!--  header .wrapper {-->
<!--    display: flex;-->
<!--    place-items: flex-start;-->
<!--    flex-wrap: wrap;-->
<!--  }-->
<!--}-->
<!--</style>-->
<template>
  <div id="app">
<!--    &lt;!&ndash; 渲染棋盘组件 &ndash;&gt;-->
<!--    <Board />-->
    <router-view /> <!-- 用于显示当前路由对应的组件 -->
  </div>
</template>

<script setup lang="ts">
import Board from './components/ChessBoard.vue';
</script>

<style>
/* 可以在这里写全局样式 */
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
