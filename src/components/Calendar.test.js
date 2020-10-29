/* eslint-disable no-undef */
import {createLocalVue, shallowMount} from '@vue/test-utils'
import vuex from 'vuex'
import Calendar from './Calendar'

const localVue = createLocalVue();
localVue.use(vuex);

const store = new vuex.Store({
    modules: {
        timetable: {
            state:{
                lessons:[
                    {id:24589,date:2020-10-20,start:9.5,end:10.5, group:{level:"B2",name:"Kolette",  color:"#FFEECE",color2:"#FFBC42"},koordinates:{"x":2,"y":10,"yEnd":12}},
                    {id:24575,date:2020-10-20,start:11, end:12,   group:{level:"A2",name:"Liberman", color:"#CCC6FF",color2:"#A499FF"},koordinates:{"x":2,"y":13,"yEnd":15}},
                    {id:24554,date:2020-10-21,start:11, end:12.5, group:{level:"A2",name:"Liberman", color:"#CCC6FF",color2:"#A499FF"},koordinates:{"x":3,"y":13,"yEnd":16}}
                    ],
                dates:["Mon, 19","Tue, 20","Wed, 21","Thu, 22","Fri, 23","Sat, 24","Sun, 25"]
            }
        }
    }
});



test("mount Calendar", ()=>{
    const wrapper = shallowMount(Calendar,{localVue,store});
    expect(wrapper).not.toBe(0)
});

test("time",()=>{
    const wrapper = shallowMount(Calendar,{localVue,store});
    expect(wrapper.vm.time.length).toBe(11);
    expect(wrapper.vm.time[0]).toBe("6:00");
    expect(wrapper.text()).toContain("16:00")
});

// getZeroKoordinats - метод не подлежащий тестированию - повод для рефакторинга. Пока только вручную
