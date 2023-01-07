<template>
  <div id="app">
    <!--    <PageHead/>-->
    <el-container v-if="$route.meta.keepalive">
      <el-container>
        <el-main>
          <keep-alive>
            <router-view/>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
<!--    <router-view v-if="!$route.meta.keepalive"></router-view>-->
  </div>
</template>

<script>
import PageHead from "@/components/PageHead.vue";

export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    PageHead
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
