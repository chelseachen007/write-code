<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div>
      <router-link to="/Home">Home</router-link>|
      <router-link to="/about">About</router-link>|
    </div>
    <router-view />
    <div id="player" ref="player"></div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import { record, Replayer } from "rrweb";
import rrwebPlayer from "rrweb-player";
export default {
  name: "App",
  components: {
    // HelloWorld,
  },
  data() {
    return {};
  },
  methods: {},

  mounted() {
    // 制造一个错误
    // abc();
    // 每 10 秒调用一次 save 方法，避免请求过多

    setTimeout(this.saves, 10 * 1000);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#player {
  width: 100%;
  height: 100vh;
}
</style>
