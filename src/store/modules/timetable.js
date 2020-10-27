const state = ()=>({
    timetable: [
/*
        Template of structure
        {date:30,time:[
                {time:6,lesson:undefined},
                {time:6.5,lesson:undefined},
                {time:7,lesson:undefined},
        ]}
*/
    ],
    // Список уроков, возможно полученный от api
    lessons:[
        {
            id:24589,
            date: "2020-10-30",
            start: 9.5,
            end: 10.5,
            group:{
                level:"B2",
                name:"Kolette",
                color:"#FFEECE",
                color2:"#FFBC42"
            }
        },
        {
            id:24589,
            date: "2020-10-30",
            start: 11,
            end: 12,
            group:{
                level:"A2",
                name:"Liberman",
                color:"#FFEECE",
                color2:"#FFBC42"
            }
        },
        {
            id:24589,
            date: "2020-11-3",
            start: 11,
            end: 12,
            group:{
                level:"A2",
                name:"Liberman",
                color:"#FFEECE",
                color2:"#FFBC42"
            }
        },

    ],
    dates:[],
    test:"test"
});

const mutations = {
    CREATE_TIMETABLE(state){
        // Получить полный список дат вместе с неиспользуемыми
        let dates = [];
        state.lessons.forEach(el=>{
            const day = new Date(el.date);

            // Первый день
            if(!dates[dates.length - 1]) {
                dates.push(day);
                return;
            }

            // сдедующий день без перерыва
            if(
                dates[dates.length - 1].getTime() < day.getTime() &&
                dates[dates.length - 1].getTime() + 86400000  > day.getTime() ){
                dates.push(day);
                return;
            }

            // Обработка разрыва
            while (dates[dates.length - 1].getTime() < day.getTime()){
                dates.push(new Date(dates[dates.length - 1].getTime() + 86400000));

            }
        });

        // диагностика дат - отладка
        state.dates = dates
    },
    // Это проверочная мутация для тестов - не запускать
    TEST_M(state){
        state.dates=[0,1]
    }
};

const actions = {
    prepare({ commit }){
        commit("CREATE_TIMETABLE")
    }
};

export default {
    state,
    mutations,
    actions
}