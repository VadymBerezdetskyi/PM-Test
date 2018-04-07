<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Authorization from "./components/Authorization.vue";
import List from "./components/List.vue";

export default {
  components: {
    "authorization": Authorization,
    "list": List
  },
  data () {
    return {
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

#app {
  height: 100vh;
  background-color: rgb(247, 247, 247);
}
</style>
