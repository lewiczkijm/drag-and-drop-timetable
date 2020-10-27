<template>
  <div id="app">

    <Calendar/>
    <Lesson/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Lesson from "./components/Lesson";
import Calendar from "./components/Calendar";
export default {
  name: 'App',
  components: {
    Calendar,
    Lesson
  },
  // Инициализация подготовки данных в store.
  // Должна происходить на ранней стадии загрузки, но не в корне, а в компоненте
  mounted(){
    this.$store.dispatch("prepare")
  },
  computed:{
    ...mapState({test:state=>state.timetable.test})
  }
}
</script>

<style>
#app {
  font-family: 'Rubik', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #E5E5E5;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
