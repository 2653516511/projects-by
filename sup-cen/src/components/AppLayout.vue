<template>
  <div class="app-layout">
    <header class="header">
      <div><img class="img" src="../assets/logo.png"/></div>
      <div>
        hello world
      </div>
    </header>
    <NavMenu />

    <transition name="fade" mode="out-in">
      
      <!-- menvs -->
      <!-- router component will be rendered 
              in this special <router-view/> component -->
      <router-view />
    </transition>
  </div>
</template>

<script>
import NavMenu from './NavMenu.vue'

export default {
  components: {
    NavMenu,
  },
}
</script>


<!-- 使用lang属性，告诉我们正在使用stylus -->
<style lang="stylus">
@import '../style/main';
</style>


<!-- SFC可以有多个style标签 -->
<style lang="stylus" scoped>
.header {
  .img {
    width: 64px;
    height: 64px;
  }
}
</style>
