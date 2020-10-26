<template>
  <div id="app">
    {{test}}
    <Lesson/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Lesson from "./components/Lesson";
export default {
  name: 'App',
  components: {
    Lesson
  },
  computed:{
    ...mapState({test:state=>state.timetable.test})
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
