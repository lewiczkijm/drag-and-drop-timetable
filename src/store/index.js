import Vue from 'vue'
import Vuex from 'vuex'
import timetable from "./modules/timetable"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        timetable
    }
})
