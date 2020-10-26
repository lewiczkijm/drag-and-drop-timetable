<template>
  <div id="app">
    <Lesson/>
  </div>
</template>

<script>

import Lesson from "./components/Lesson";
export default {
  name: 'App',
  components: {
    Lesson
  }
}
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
</style>
