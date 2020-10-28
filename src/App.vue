<template>
  <div id="app">

    <Calendar/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Calendar from "./components/Calendar";
export default {
  name: 'App',
  components: {
    Calendar
  },
  // Инициализация подготовки данных в store.
  // Должна происходить на ранней стадии загрузки, но не в корне, а в компоненте
  mounted(){
    this.$store.dispatch("prepare")
  },
  computed:{
    ...mapState({test:state=>state.timetable.lessons[0]})
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
  margin: 0;
  padding: 1em;
}
</style>
